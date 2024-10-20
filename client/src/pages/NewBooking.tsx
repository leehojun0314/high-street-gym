import Modal from '@/components/organisms/Modal';
// import rrulePlugin from '@fullcalendar/rrule';
import Select from '@/components/molecules/Select';
import useBooking from '@/hooks/useBooking';
// import { getDateBySting } from '@/utils';
import ResponsiveTable from '@/components/molecules/ResponsiveTable';
import CustomCalendar from '@/components/organisms/CustomCalendar';
import ResponsiveRow from '@/components/atoms/table/ResponsiveRow';
import ResponseiveData from '@/components/atoms/table/ResponsiveData';
import { capitalize } from '@/utils';
import PrimaryBtn from '@/components/atoms/PrimaryBtn';
// import { formatDate } from '@fullcalendar/core/index.js';
// import { getWeekday } from 'rrule/dist/esm/dateutil';

export default function NewBooking() {
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [selectedDateClasses, setSelectedDateClasses] = useState([]);
  const {
    classes,
    location,
    locations,
    handleDateClick,
    selectBookingModalProps,
    handleLocationChange,
    selectedDateClasses,
    handleEventClick,
    confirmBookingModalProps,
    selectedClass,
    myBookings,
    clickedDate,
    handleBookingClick,
  } = useBooking();
  return (
    <>
      <header className='flex flex-col justify-between items-center pt-4'>
        <h1 className='text-2xl'>New Booking</h1>
        <div className='flex flex-row items-center gap-2'>
          <span>Location:</span>
          <Select value={location} onChange={handleLocationChange}>
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
      </header>
      <main className='p-4'>
        <CustomCalendar
          events={classes.map((c) => ({
            id: c.class_id.toString(),
            title: c.Activity.activity_name,
            start: c.is_recurring
              ? c.class_date
              : c.class_date + 'T' + c.class_time,
            extendedProps: {
              time: c.class_time,
            },
            startRecur: c.is_recurring ? new Date() : '',
            daysOfWeek: c.is_recurring
              ? [new Date(c.class_date).getDay()]
              : undefined,
            backgroundColor: myBookings.some((myBooking) => {
              return myBooking.booking_class_id === c.class_id;
            })
              ? 'green'
              : 'blue',
            // borderColor: 'black',
          }))}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
        />
        <Modal {...selectBookingModalProps}>
          <div>
            <h2 className='mb-4'>
              {/* Available Classes on {getDateBySting(new Date().toISOString())} */}
              Available Classes on {clickedDate}
            </h2>
            {selectedDateClasses.length === 0 ? (
              <p className='text-center'>No class available on this date</p>
            ) : (
              <ResponsiveTable>
                {selectedDateClasses.map((classEl, index) => {
                  const keys = Object.keys(classEl) as (keyof typeof classEl)[];
                  return (
                    <ResponsiveRow key={index}>
                      {keys.map((key, index2) => {
                        if (key.endsWith('id')) {
                          return null;
                        } else {
                          return (
                            <ResponseiveData key={index2}>
                              <span className='text-gray-400 '>
                                {key === 'User' ? 'Trainer' : capitalize(key)}
                              </span>
                              <span className='font-semibold'>
                                {key === 'Location'
                                  ? classEl[key].location_name
                                  : key === 'Activity'
                                  ? classEl[key].activity_name
                                  : key === 'User'
                                  ? classEl[key].user_firstname
                                  : String(classEl[key])}
                              </span>
                            </ResponseiveData>
                          );
                        }
                      })}
                      <ResponseiveData className='grid-area'>
                        {myBookings?.some(
                          (booking) =>
                            booking.booking_class_id === classEl.class_id,
                        ) ? (
                          <button
                            className='btn btn-disabled w-full grid-area'
                            tabIndex={-1}
                            role='button'
                            aria-disabled='true'
                          >
                            Booked
                          </button>
                        ) : (
                          <PrimaryBtn
                            className='w-full grid-area'
                            onClick={handleBookingClick(classEl.class_id)}
                          >
                            Book
                          </PrimaryBtn>
                        )}
                      </ResponseiveData>
                    </ResponsiveRow>
                  );
                })}
              </ResponsiveTable>
            )}
          </div>
        </Modal>
        <Modal {...confirmBookingModalProps}>
          <div>
            <h2>
              Confirm booking for <strong>{selectedClass?.title}</strong> on{' '}
              <time dateTime={selectedClass.date + 'T' + selectedClass.time}>
                {selectedClass.date} at {selectedClass.time}
              </time>
              ?
            </h2>

            <input
              type='text'
              name='class_id'
              defaultValue={selectedClass?.id}
              className='hidden'
            />
          </div>
        </Modal>
      </main>
    </>
  );
}
