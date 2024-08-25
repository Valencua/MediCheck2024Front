import BottomNavBar from "../components/BottomNavBar/BottomNavBar";
import Calendar from "../components/Calendar/Calendar";
import { EventsProvider } from '../utils/EventsProvider';

export default function CalendarPage() {

    return (
        <EventsProvider>
            <Calendar></Calendar>
            <BottomNavBar></BottomNavBar>
        </EventsProvider>
    );
}
