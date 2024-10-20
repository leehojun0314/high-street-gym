import Select from '@/components/molecules/Select';
import useMyBooking from '@/hooks/useMyBooking';
import ResponsiveTable from '@/components/molecules/ResponsiveTable';
import ResponsiveRow from '@/components/atoms/table/ResponsiveRow';
import ResponseiveData from '@/components/atoms/table/ResponsiveData';
import { capitalize, getDayOfWeek } from '@/utils';
import { TExtendedBooking } from '@/types';
// import { formatDate } from '@fullcalendar/core/index.js';
import SecondaryBtn from '@/components/atoms/SecondaryBtn';
import Modal from '@/components/organisms/Modal';
export default function MyBooking() {
  const {
    currentLocation,
    locations,
    handleLocationChange,
    bookings,
    handleClickCancel,
    cancelModalProps,
    cancelId,
  } = useMyBooking();
  return (
    <main className='p-4'>
      <section className='flex flex-col justify-between items-center gap-2 pt-4 pb-2'>
        <h1 className='text-2xl'>My Bookings</h1>
        <div className='flex flex-row items-center gap-2'>
          <span>Location:</span>
          <Select value={currentLocation} onChange={handleLocationChange}>
            {locations.map((locationEl) => {
              return (
                <option
                  key={locationEl.location_id}
                  value={locationEl.location_id}
                >
                  {locationEl.location_name}
                </option>
              );
            })}
          </Select>
        </div>
      </section>
      <Modal {...cancelModalProps}>
        <h2>
          Confirm cancel booking for{' '}
          {bookings.find((b) => b.booking_id === cancelId)?.Class.class_name}?
          <input
            className='hidden'
            type='hidden'
            value={cancelId}
            name='booking_id'
          />
        </h2>
      </Modal>
      <ResponsiveTable>
        {bookings.map((booking) => {
          const keys = Object.keys(booking) as (keyof TExtendedBooking)[];
          return (
            <ResponsiveRow key={booking.booking_id}>
              {keys.map((key) => {
                if (
                  key === 'Class' ||
                  key === 'booking_user_id' ||
                  key === 'booking_id' ||
                  key === 'booking_created_datetime'
                ) {
                  return <></>;
                }
                return (
                  <ResponseiveData key={key}>
                    <span className='text-gray-400 break-all '>
                      {key === 'booking_class_id' ? 'Class' : capitalize(key)}
                    </span>
                    <span className='font-semibold'>
                      {key === 'booking_class_id'
                        ? booking.Class.class_name
                        : booking[key]}
                    </span>
                  </ResponseiveData>
                );
              })}
              {booking.Class.is_recurring ? (
                <ResponseiveData>
                  <span className='text-gray-400 break-all'>Time</span>
                  <span className='font-semibold'>
                    Every {getDayOfWeek(new Date(booking.Class.class_date))}{' '}
                    {booking.Class.class_time}
                  </span>
                </ResponseiveData>
              ) : (
                <ResponseiveData>
                  <span className='text-gray-400 break-all'>Time</span>
                  <span className='font-semibold'>
                    {booking.Class.class_date + ' ' + booking.Class.class_time}
                  </span>
                </ResponseiveData>
              )}

              <ResponseiveData>
                <span className='text-gray-400 break-all'>Trainer</span>
                <span className='font-semibold'>
                  {booking.Class.User.user_firstname}
                </span>
              </ResponseiveData>
              <ResponseiveData>
                <span className='text-gray-400 break-all'>Location</span>
                <span className='font-semibold'>
                  {booking.Class.Location.location_name}
                </span>
              </ResponseiveData>
              <ResponseiveData style={{ gridArea: '3 / 1 / 3 / 4' }}>
                <SecondaryBtn onClick={handleClickCancel(booking.booking_id)}>
                  Cancel
                </SecondaryBtn>
              </ResponseiveData>
            </ResponsiveRow>
          );
        })}
      </ResponsiveTable>
    </main>
  );
}
