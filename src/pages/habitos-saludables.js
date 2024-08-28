import Head from "next/head";
import HabitosSaludablesNavBar from "../components/HabitosSaludablesNavBar/HabitosSaludablesNavBar";
import HabitosSaludables from "../components/HabitosSaludables/HabitosSaludables";
import {useState, useEffect} from "react";
import HabitosNoSaludablesModal from "../components/HabitosNoSaludablesModal/HabitosNoSaludablesModal";
import HabitosSaludablesModal from "../components/HabitosSaludablesModal/HabitosSaludablesModal";

export default function HabitosSaludablesPage({ day, month, year, event }) {
    const [isHabitosNoSaludablesModalOpen, setIsHabitosNoSaludablesModalOpen] = useState(false);
    const [isHabitosSaludablesModalOpen, setIsHabitosSaludablesModalOpen] = useState(false);
    const [jsonEvent, setJsonEvent] = useState(null);

    useEffect(() => {
        if (event) {
            try {
                console.log("Event received:", event);
                setJsonEvent(JSON.parse(event));
            } catch (error) {
                console.error("Failed to parse event JSON:", error);
            }
        }
    }, [event]);

    const handleHabitosNoSaludablesModalOpen = () => {
        setIsHabitosNoSaludablesModalOpen(true);
    };

    const handleCloseHabitosNoSaludablesModal = () => {
        setIsHabitosNoSaludablesModalOpen(false);
    };

    const handleHabitosSaludablesModalOpen = () => {
        setIsHabitosSaludablesModalOpen(true);
    };

    const handleCloseHabitosSaludablesModal = () => {
        setIsHabitosSaludablesModalOpen(false);
    };

    return (
        <div>
            <Head>
                <title>Habitos Saludables</title>
                <meta name="description" content="Habitos Saludables" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <HabitosSaludables
                    day={day}
                    month={month}
                    year={year}
                    event={jsonEvent}
                />
            </main>
            <HabitosSaludablesNavBar
                showHabitosNoSaludablesPopUp={handleHabitosNoSaludablesModalOpen}
                showHabitosSaludablesPopUp={handleHabitosSaludablesModalOpen}
            />

            <HabitosNoSaludablesModal 
                isOpen={isHabitosNoSaludablesModalOpen} 
                handleClose={handleCloseHabitosNoSaludablesModal} 
            />
            <HabitosSaludablesModal 
                isOpen={isHabitosSaludablesModalOpen} 
                handleClose={handleCloseHabitosSaludablesModal} 
            />
        </div>
    );
}

export async function getServerSideProps(context) {
    const { day, month, year, event } = context.query;

    let eventData = null;
    if (event) {
        try {
            eventData = JSON.parse(event);
        } catch (error) {
            console.error("Failed to parse event JSON in getServerSideProps:", error);
        }
    }

    return {
        props: {
            day: day || null,
            month: month || null,
            year: year || null,
            event: eventData,
        },
    };
}