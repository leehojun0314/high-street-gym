import { axiosAPI } from '@/libs/axiosAPI';
import { TExtendedBooking, TLocation } from '@/types';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AppContext } from '@/contexts/AppContext';
import useModal from './useModal';

export default function useMyBooking() {
  const { user, isLoading: isLoadingContext } = useContext(AppContext);
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const [locations, setLocations] = useState<TLocation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bookings, setBookings] = useState<TExtendedBooking[]>([]);
  const [cancelId, setCancelId] = useState<number>();
  const { toggleModal: toggleCancelModal, modalProps: cancelModalProps } =
    useModal({
      title: 'Confirm Cancel',
      submitBtn: true,
      cancelBtn: true,
      closeBtn: true,

      onSubmit: (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const form = new FormData(evt.currentTarget);
        const data = Object.fromEntries(form.entries());

        handleCancelBooking(data.booking_id as string).then(() => {
          alert('Booking cancelled successfully');
          toggleCancelModal();
        });
      },
    });
  const getMyBookings = useCallback((locationId: string) => {
    console.log('get my bookings location id: ', locationId);
    return axiosAPI.get(`/booking/my?location=${locationId}`).then((res) => {
      console.log('get bookings res:', res.data);
      setBookings(
        res.data.filter((booking: TExtendedBooking) =>
          booking.Class.is_recurring
            ? true
            : booking.Class.class_date + 'T' + booking.Class.class_time >
              new Date().toISOString(),
        ),
      );
    });
  }, []);
  const handleLocationChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (isLoading) {
        return;
      }

      setIsLoading(true);
      const value = e.target.value;
      console.log('handle location change : ', value);
      setCurrentLocation(value);
      getMyBookings(value).finally(() => {
        setIsLoading(false);
      });
    },
    [isLoading, getMyBookings],
  );
  console.log('current location: ', currentLocation);
  const handleClickCancel = useCallback(
    (id: number) => {
      return () => {
        setCancelId(id);
        toggleCancelModal();
      };
    },
    [toggleCancelModal],
  );
  const handleCancelBooking = useCallback(
    (booking_id: string | number) => {
      return axiosAPI
        .delete(`/booking/${booking_id}`)
        .then((deleteRes) => {
          console.log('delete res:', deleteRes);
          return getMyBookings(currentLocation);
        })
        .catch((err) => {
          console.log('delete err:', err);
          window.alert('There was an error while deleting the booking');
        });
    },
    [getMyBookings, currentLocation],
  );
  useEffect(() => {
    if (isLoadingContext) {
      return;
    }
    if (user) {
      axiosAPI
        .get('/location/all')
        .then((res) => {
          console.log('location res: ', res);
          setLocations(res.data);
          setCurrentLocation(res.data[0].location_name);
          return getMyBookings(res.data[0].location_id);
        })
        .catch((err) => {
          console.error('get my bookings error: ', err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      alert('You must be logged in to view this page');
      window.location.href = '/login';
    }
  }, [getMyBookings, user, isLoadingContext]);
  return {
    currentLocation,
    locations,
    handleLocationChange,
    isLoading,
    bookings,
    handleCancelBooking,
    cancelModalProps,
    handleClickCancel,
    cancelId,
  };
}
