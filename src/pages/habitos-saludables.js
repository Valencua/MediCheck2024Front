import Head from "next/head";
import HabitosSaludablesNavBar from "../components/HabitosSaludablesNavBar/HabitosSaludablesNavBar";
import HabitosSaludables from "../components/HabitosSaludables/HabitosSaludables";
import {useRouter} from "next/router";
import {useState} from "react";
import HabitosNoSaludablesModal from "../components/HabitosNoSaludablesModal/HabitosNoSaludablesModal";
import HabitosSaludablesModal from "../components/HabitosSaludablesModal/HabitosSaludablesModal";


export default function HabitosSaludablesPage() {


    const [habitosSaludables, setHabitosSaludables] = useState([
        {type: 'dormir', texto: 'Este día dormiste 8 horas'},
        {type: 'alimento', texto: 'Este día comiste saludable'},
        {type: 'ejercicio', texto: 'Este día hiciste ejercicio'},
    ]);
    const [habitosNoSaludables, setHabitosNoSaludables] = useState([
        {type: 'alcohol', texto: 'Este día ingeriste alcohol'},
        {type: 'fumar', texto: 'Este día fumaste'},
    ]);


    const [isHabitosNoSaludablesModalOpen, setIsHabitosNoSaludablesModalOpen] = useState(false);
    const [isHabitosSaludablesModalOpen, setIsHabitosSaludablesModalOpen] = useState(false);

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


    const router = useRouter();
    const { day, month, year, event } = router.query;
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
                    event={JSON.parse(event)}
                    habitosSaludables={habitosSaludables}
                    habitosNoSaludables={habitosNoSaludables}
                    
                />
            </main>
            <HabitosSaludablesNavBar
                showHabitosNoSaludablesPopUp={handleHabitosNoSaludablesModalOpen}
                showHabitosSaludablesPopUp={handleHabitosSaludablesModalOpen}
            />

            <HabitosNoSaludablesModal isOpen={isHabitosNoSaludablesModalOpen} handleClose={handleCloseHabitosNoSaludablesModal}  />
            <HabitosSaludablesModal isOpen={isHabitosSaludablesModalOpen} handleClose={handleCloseHabitosSaludablesModal} />
        </div>
    );
}
