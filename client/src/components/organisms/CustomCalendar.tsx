import { EventClickArg, EventSourceInput } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';
import FullCalendar from '@fullcalendar/react';
export default function CustomCalendar({
  events,
  dateClick,
  eventClick,
}: {
  events: EventSourceInput;
  dateClick?: ((arg: DateClickArg) => void) | undefined;
  eventClick?: ((arg: EventClickArg) => void) | undefined;
}) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin, rrulePlugin]}
      events={events}
      dateClick={dateClick}
      eventClick={eventClick}
      height={'500px'}
      headerToolbar={{
        left: 'title',
        center: '',
        right: 'prev,next today',
      }}
      titleFormat={{ month: 'short', year: 'numeric' }}
      dayMaxEventRows={2}
      showNonCurrentDates={true}
      validRange={{ start: new Date() }}
    />
  );
}
