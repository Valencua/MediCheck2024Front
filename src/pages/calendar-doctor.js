import CalendarDoctor from "../components/CalendarDoctor/CalendarDoctor";
import DoctorBottomNavBar from "../components/DoctorBottomNavBar/DoctorBottomNavBar.js";
import { EventsProvider } from '../utils/EventsProvider';
import { useRouter } from 'next/router';

export default function CalendarDoctorPage() {
    const router = useRouter();
    const { paciente } = router.query;
    return (
        <EventsProvider>
            <CalendarDoctor patientID={paciente ? JSON.parse(paciente).id : null }></CalendarDoctor>
            <DoctorBottomNavBar></DoctorBottomNavBar>
        </EventsProvider>
    );
}
