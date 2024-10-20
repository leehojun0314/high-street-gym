import { axiosAPI } from '@/libs/axiosAPI';

import useModal from '@/hooks/useModal';
import { TBooking, TExtendedClass, TLocation } from '@/types';
import { useCallback, useContext, useEffect, useState } from 'react';
import { DateClickArg } from '@fullcalendar/interaction/index.js';
import { EventClickArg } from '@fullcalendar/core/index.js';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { AppContext } from '@/contexts/AppContext';
export default function useBooking() {
  // const { user } = useAuthenticate();
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [myBookings, setMyBookings] = useState<TBooking[]>([]);
  const [selectedDateClasses, setSelectedDateClasses] = useState<
    TExtendedClass[]
  >([]);
  const [clickedDate, setClickedDate] = useState<string>();
  const [classes, setClasses] = useState<TExtendedClass[]>([]);
  const [location, setLocation] = useState<string>('');
  const [locations, setLocations] = useState<TLocation[]>([]);
  const [selectedClass, setSelectedClass] = useState<{
    id: string;
    title: string;
    // datetime: DateInput;
    date: string;
    time: string;
  }>({
    id: '',
    title: '',
    // datetime: '',
    date: '',
    time: '',
  });
  const {
    modalProps: selectBookingModalProps,
    toggleModal: toggleSelectBookingModal,
  } = useModal({
    title: 'Choose a class for booking',
    clickOutside: true,
    cancelBtn: true,
    closeBtn: true,
  });
  const {
    modalProps: confirmBookingModalProps,
    toggleModal: toggleConfirmBookingModal,
  } = useModal({
    title: 'Confirm booking',
    clickOutside: true,
    cancelBtn: true,
    submitBtn: true,
    onSubmit: (event) => {
      event.preventDefault();

      const form = new FormData(event.currentTarget);
      const data = Object.fromEntries(form.entries());
      console.log('data: ', data);
      submitNewBooking(data as { class_id: string });
    },
  });
  function handleBookingClick(class_id: number) {
    return () => {
      // submitNewBooking({ class_id });
      toggleConfirmBookingModal();
      const c = classes.find((c) => c.class_id === class_id)!;
      setSelectedClass({
        id: c.class_id.toString(),
        title: c.class_name,
        date: c.class_date,
        time: c.class_time,
      });
    };
  }
  function submitNewBooking({ class_id }: { class_id: string }) {
    return axiosAPI
      .post('/booking/new', { class_id })
      .then((res) => {
        console.log('booking res: ', res);
        //reset booking status
        return getMyBookings();
      })
      .then((myBookingsRes) => {
        setMyBookings(myBookingsRes.data);
        alert('Booking success!');
        toggleConfirmBookingModal(false);
        toggleSelectBookingModal(false);
      })
      .catch((err: AxiosError) => {
        console.error('booking err: ', err);
        if (err.response?.status === 401) {
          alert('You must be logged in to book a class');
          navigate('/login');
          return;
        }
        alert(err.response?.data ?? 'Booking failed.');
      });
  }
  function handleDateClick(arg: DateClickArg) {
    if (!user) {
      alert('You must be logged in to book a class');
      navigate('/login');
    }
    const dateStr = arg.dateStr;
    console.log('date str: ', dateStr);
    const filteredClasses = classes.filter((c: TExtendedClass) => {
      if (c.is_recurring) {
        return new Date(c.class_date).getDay() === new Date(dateStr).getDay();
      } else {
        return c.class_date.split('T')[0] === dateStr;
      }
    });
    const mappedClasses = filteredClasses.map((c: TExtendedClass) => {
      if (c.is_recurring) {
        return { ...c, class_date: dateStr };
      } else {
        return c;
      }
    });
    setClickedDate(dateStr);
    setSelectedDateClasses(mappedClasses);
    toggleSelectBookingModal();
  }
  function handleEventClick(arg: EventClickArg) {
    console.log('handle Event click id: ', arg.event.id);
    console.log('user:', user);
    console.log('startstr: ', arg.event.startStr);
    console.log('start: ', arg.event.start);
    console.log('time: ', arg.event.extendedProps.time);

    if (!user) {
      alert('You must be logged in to book a class');
      navigate('/login');
      return;
    }
    if (myBookings.some((b) => b.booking_class_id === parseInt(arg.event.id))) {
      alert('You have already booked this class.');
      return;
    }
    setSelectedClass({
      id: arg.event.id,
      title: arg.event.title,
      // datetime: arg.event.startStr,
      date: arg.event.startStr,
      time: arg.event.extendedProps.time,
    });
    toggleConfirmBookingModal();
  }

  const getMyBookings = useCallback(() => {
    return axiosAPI.get(`/booking/my`);
  }, []);
  const getClasses = useCallback((locationId: string) => {
    return axiosAPI.get(`/class?location=${locationId}`).then((res) => {
      console.log('get classes res:', res.data);
      setClasses(res.data);
    });
  }, []);
  const getLocations = useCallback(() => {
    return axiosAPI.get('/location/all');
  }, []);
  const handleLocationChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      const value = e.target.value;
      console.log('value: ', value);
      setLocation(value);
      getClasses(value)
        .catch((err) => {
          console.log('get class err:', err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [getClasses, isLoading],
  );
  const init = useCallback(async () => {
    try {
      let myBookingsRes = null;
      let locationRes;
      if (user) {
        [myBookingsRes, locationRes] = await Promise.all([
          getMyBookings(),
          getLocations(),
        ]);
        setMyBookings(myBookingsRes.data);
      } else {
        locationRes = await getLocations();
      }
      await getClasses(locationRes.data[0].location_id);

      setLocation(locationRes.data[0].location_name);
      setLocations(locationRes.data);
    } catch (error) {
      console.log('err: ', error);
    } finally {
      setIsLoading(false);
    }
  }, [user, getMyBookings, getLocations, getClasses]);
  useEffect(() => {
    init();
  }, [init]);
  return {
    classes,
    location,
    locations,
    clickedDate,
    handleDateClick,
    selectBookingModalProps,
    handleLocationChange,
    selectedDateClasses,
    handleEventClick,
    confirmBookingModalProps,
    selectedClass,
    myBookings,
    handleBookingClick,
  };
}
