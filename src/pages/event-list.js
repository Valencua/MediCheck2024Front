// EventListPage.js
import Head from 'next/head';
import '../styles/globals.css';
import EventListBottomNavBar from "../components/EventListBottomNavBar/EventListBottomNavBar";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import MedicationModal from "../components/MedicationModal/MedicationModal";
import VacunacionModal from "../components/VacunacionModal/VacunacionModal";
import EventList from "../components/EventList/EventList";

export default function EventListPage() {
    const [isMedicacionModalOpen, setIsMedicacionModalOpen] = useState(false);
    const [isVacunacionModalOpen, setIsVacunacionModalOpen] = useState(false);
    const [jsonEvent, setJsonEvent] = useState(null);
    const router = useRouter();
    const { day, month, year, event } = router.query;
    useEffect(() => {
        if (event) {
            try {
                setJsonEvent(JSON.parse(event));
            } catch (error) {
                console.error("Failed to parse event JSON:", error);
            }
        }
    }, [event]);

    const handleMedicacionModalOpen = () => {
        setIsMedicacionModalOpen(true);
    };

    const handleCloseMedicacionModal = () => {
        setIsMedicacionModalOpen(false);
    };

    const handleVacunacionModalOpen = () => {
        setIsVacunacionModalOpen(true);
    };

    const handleCloseVacunacionModal = () => {
        setIsVacunacionModalOpen(false);
    };


    return (
        <div>
            <Head>
                <title>HabitosSaludables</title>
                <meta name="description" content="HabitosSaludables page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <EventList day={day} month={month} year={year} event={jsonEvent}/>
            </main>
            <EventListBottomNavBar showMedicamentosPopUp={handleMedicacionModalOpen} showVacunacionPopUp={handleVacunacionModalOpen}  day={day} month={month} year={year} event={event}/>

            <MedicationModal isOpen={isMedicacionModalOpen} handleClose={handleCloseMedicacionModal} />
            <VacunacionModal isOpen={isVacunacionModalOpen} handleClose={handleCloseVacunacionModal} />
        </div>
    );
}

export async function getServerSideProps(context) {
    const { event } = context.query;

    // If the event is present, parse it; otherwise, set it as null
    const eventData = event ? JSON.parse(event) : null;

    return {
        props: {
            event: eventData,
        },
    };
}
