import { axiosAPI } from '@/libs/axiosAPI';

import useModal from '@/hooks/useModal';
import { TClass, TExtendedClass, TLocation } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { DateClickArg } from '@fullcalendar/interaction/index.js';
import { DateInput, EventClickArg } from '@fullcalendar/core/index.js';
import useAuthenticate from './useAuthenticate';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
export default function useBooking() {
  const { user } = useAuthenticate();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDateClasses, setSelectedDateClasses] = useState<
    TExtendedClass[]
  >([]);
  const [currentDate] = useState(new Date());
  const [classes, setClasses] = useState<TExtendedClass[]>([]);
  const [location, setLocation] = useState<string>('');
  const [locations, setLocations] = useState<TLocation[]>([]);
  const [selectedClass, setSelectedClass] = useState<{
    id: string;
    title: string;
    datetime: DateInput;
  }>({
    id: '',
    title: '',
    datetime: '',
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
      axiosAPI
        .post('/booking/new', data)
        .then((res) => {
          console.log('booking res: ', res);
          alert('Booking success!');
          toggleConfirmBookingModal();
          // setSelectedClass();
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
    },
  });

  function handleDateClick(arg: DateClickArg) {
    console.log('user:', user);
    if (!user) {
      alert('You must be logged in to book a class');
      navigate('/login');
    }
    console.log('handleDateClick', arg);
    const dateStr = arg.dateStr;
    console.log('date str: ', dateStr);
    const filteredClasses = classes.filter((c: TClass) => {
      return c.class_datetime.split('T')[0] === dateStr;
    });
    setSelectedDateClasses(filteredClasses);
    toggleSelectBookingModal();
  }
  function handleEventClick(arg: EventClickArg) {
    console.log('handle Event click id: ', arg.event.id);
    console.log('user:', user);
    if (!user) {
      alert('You must be logged in to book a class');
      navigate('/login');
      return;
    }
    setSelectedClass({
      id: arg.event.id,
      title: arg.event.title,
      datetime: arg.event.startStr,
    });
    toggleConfirmBookingModal();
  }
  // const handleDateClick = (arg: any) => {
  //   const selectedDate = new Date(arg.dateStr);
  //   const filteredClasses = classes.filter(
  //     (c) => c.class_date.toDateString() === selectedDate.toDateString(),
  //   );
  //   setSelectedDateClasses(filteredClasses);
  //   setModalIsOpen(true);
  // };

  // const closeModal = () => {
  //   setModalIsOpen(false);
  // };

  const getClasses = useCallback(
    (locationId: string) => {
      return axiosAPI
        .get(`/class?location=${locationId}&date=${currentDate.toISOString()}`)
        .then((res) => {
          console.log('get classes res:', res.data);
          setClasses(res.data);
        });
    },
    [currentDate],
  );
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
  useEffect(() => {
    getLocations()
      .then((locationRes) => {
        console.log('location res:', locationRes);
        setLocation(locationRes.data[0].location_name);
        setLocations(locationRes.data);
        return getClasses(locationRes.data[0].location_id);
      })

      .catch((err) => {
        console.log('err: ', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [getLocations, getClasses]);
  return {
    classes,
    location,
    locations,
    currentDate,
    handleDateClick,
    selectBookingModalProps,
    handleLocationChange,
    selectedDateClasses,
    handleEventClick,
    confirmBookingModalProps,
    selectedClass,
  };
}
