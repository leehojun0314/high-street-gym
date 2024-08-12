import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import Modal from '@/components/organisms/Modal';

import Select from '@/components/molecules/Select';
import useBooking from '@/hooks/useBooking';
import { getDateByDate } from '@/utils';
import ResponsiveTable from '@/components/molecules/ResponsiveTable';
import { formatDate } from '@fullcalendar/core/index.js';
export default function Booking() {
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [selectedDateClasses, setSelectedDateClasses] = useState([]);
  const {
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
  } = useBooking();
  return (
    <main className='p-4'>
      <header className='flex flex-col justify-between items-center mb-4'>
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

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        // initialView='dayGridMonth'
        events={classes.map((c) => ({
          id: c.class_id.toString(),
          title: c.Activity.activity_name,
          start: c.class_datetime,
        }))}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        height={'500px'}
        headerToolbar={{
          left: 'title',
          center: '',
          right: 'prev,next today',
        }}
        titleFormat={{ month: 'short', year: 'numeric' }}
        dayMaxEventRows={2}
        // eventInteractive={false}
        // eventOverlap={false}
      />
      <Modal {...selectBookingModalProps}>
        <div>
          <h2>Available Classes on {getDateByDate(currentDate)}</h2>
          {/* <button onClick={closeModal}>Close</button> */}
          <ResponsiveTable
            classes={selectedDateClasses}
            onSubmit={(classId: number) => {
              return () => {
                console.log('class id: ', classId);
              };
            }}
          />
        </div>
      </Modal>
      <Modal {...confirmBookingModalProps}>
        <div>
          <h2>
            Confirm booking for <strong>{selectedClass?.title}</strong> on{' '}
            <time dateTime={selectedClass.datetime as string}>
              {formatDate(selectedClass?.datetime, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </time>
            ?
          </h2>

          <input
            type='text'
            name='class_id'
            value={selectedClass?.id}
            className='hidden'
          />
        </div>
      </Modal>
    </main>
  );
}
