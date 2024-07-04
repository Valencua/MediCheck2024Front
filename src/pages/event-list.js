// EventListPage.js
import Head from 'next/head';
import '../styles/globals.css';
import EventListBottomNavBar from "../components/EventListBottomNavBar/EventListBottomNavBar";
import { useRouter } from "next/router";
import { useState } from "react";
import MedicationModal from "../components/MedicationModal/MedicationModal";
import VacunacionModal from "../components/VacunacionModal/VacunacionModal";
import EventList from "../components/EventList/EventList";

export default function EventListPage() {
    const router = useRouter();
    const { day, month, year } = router.query;
    const [isMedicacionModalOpen, setIsMedicacionModalOpen] = useState(false);
    const [isVacunacionModalOpen, setIsVacunacionModalOpen] = useState(false);

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
                <EventList day={day} month={month} year={year} />
            </main>
            <EventListBottomNavBar showMedicamentosPopUp={handleMedicacionModalOpen} showVacunacionPopUp={handleVacunacionModalOpen}  day={day} month={month} year={year}/>

            <MedicationModal isOpen={isMedicacionModalOpen} handleClose={handleCloseMedicacionModal} />
            <VacunacionModal isOpen={isVacunacionModalOpen} handleClose={handleCloseVacunacionModal} />
        </div>
    );
}
