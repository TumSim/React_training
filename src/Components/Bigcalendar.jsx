import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import { fetchTrainings } from '../trainingsapi';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect, useState } from 'react'
import { Padding } from '@mui/icons-material';



function BigCalendar() {
    const [events, setEvents] = useState([]);
    const localizer = momentLocalizer(moment);

    useEffect(() =>{
        fetchTrainings()
        .then(data => {
            const allEvents = data.map(event =>({
                title: `${event.activity} - ${event.customer.firstname} ${event.customer.lastname}`,
                start: new Date(event.date),
                end: moment(event.date).add(event.duration, "minutes").toDate()
            }));
            setEvents(allEvents)
        })
        .catch(err => console.error(err))
    }, [])

    return (
        <div style={{padding: "10px"}}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                drilldownView="agenda"
                formats={{
                    timeGutterFormat: 'HH:mm',
                    eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
                        `${localizer.format(start, 'HH:mm', culture)} - ${localizer.format(end, 'HH:mm', culture)}`
                }}
            />
        </div>
    )
}

export default BigCalendar;