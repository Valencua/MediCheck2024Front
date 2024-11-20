import BottomNavBar from "../components/BottomNavBar/BottomNavBar";
import Calendar from "../components/Calendar/Calendar";
import { EventsProvider } from '../utils/EventsProvider';
import DoctorBottomNavBar from "../components/DoctorBottomNavBar/DoctorBottomNavBar.js";
import { useEffect, useState } from "react";

export default function CalendarPage() {
    const [parsedUser, setParsedUser] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setParsedUser(JSON.parse(user));
        }
    }, []);

    return (
        <EventsProvider>
            <Calendar />
            {parsedUser && parsedUser.rol === "patient" ? <BottomNavBar /> : <DoctorBottomNavBar />}
        </EventsProvider>
    );
}
