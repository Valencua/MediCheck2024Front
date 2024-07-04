import Head from "next/head";
import HabitosSaludablesNavBar from "../components/HabitosSaludablesNavBar/HabitosSaludablesNavBar";
import HabitosSaludables from "../components/HabitosSaludables/HabitosSaludables";
import {useRouter} from "next/router";
import {useState} from "react";
import MedicationModal from "../components/MedicationModal/MedicationModal";
import DormirModal from "../components/DormirModal/DormirModal";
import AlimentoModal from "../components/AlimentoModal/AlimentoModal";
import EjercicioModal from "../components/EjercicioModal/EjercicioModal";
import AlcoholModal from "../components/AlcoholModal/AlcoholModal";
import FumarModal from "../components/FumarModal/FumarModal";

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

    const [isDormirModalOpen, setIsDormirModalOpen] = useState(false);
    const [isAlimentarModalOpen, setIsAlimentarModalOpen] = useState(false);
    const [isEjercicioModalOpen, setIsEjercicioModalOpen] = useState(false);
    const [isAlcoholModalOpen, setIsAlcoholModalOpen] = useState(false);
    const [isFumarModalOpen, setIsFumarModalOpen] = useState(false);

    const handleDormirModalOpen = () => {
        setIsDormirModalOpen(true);
    };

    const handleCloseDormirModal = () => {
        setIsDormirModalOpen(false);
    };
    const handleAlimentarModalOpen = () => {
        setIsAlimentarModalOpen(true);
    };

    const handleCloseAlimentarModal = () => {
        setIsAlimentarModalOpen(false);
    };

    const handleEjercicioModalOpen = () => {
        setIsEjercicioModalOpen(true);
    };

    const handleCloseEjercicioModal = () => {
        setIsEjercicioModalOpen(false);
    };

    const handleAlcoholModalOpen = () => {
        setIsAlcoholModalOpen(true);
    };

    const handleCloseAlcoholModal = () => {
        setIsAlcoholModalOpen(false);
    };

    const handleFumarModalOpen = () => {
        setIsFumarModalOpen(true);
    };

    const handleCloseFumarModal = () => {
        setIsFumarModalOpen(false);
    };

    const removeHabitoSaludable = (indexToFilter) => {
        setHabitosSaludables(prevHabitos => prevHabitos.filter((_, index) => index !== indexToFilter));
    }

    const removeHabitoNoSaludable = (indexToFilter) => {
        setHabitosNoSaludables(prevHabitos => prevHabitos.filter((_, index) => index !== indexToFilter));
    }

    const agregarDormir = () => {
        if(habitosSaludables.findIndex((habito)=> habito.type === 'dormir') !== -1)
            return
        setHabitosSaludables(prevHabitos => [...prevHabitos,{type: 'dormir', texto: 'Este día dormiste 8 horas'}]);
    }

    const agregarAlimentar = () => {
        if(habitosSaludables.findIndex((habito)=> habito.type === 'alimento') !== -1)
            return
        setHabitosSaludables(prevHabitos => [...prevHabitos,{type: 'alimento', texto: 'Este día comiste saludable'}]);
    }

    const agregarEjercicio = () => {
        if(habitosSaludables.findIndex((habito)=> habito.type === 'ejercicio') !== -1)
            return
        setHabitosSaludables(prevHabitos => [...prevHabitos,{type: 'ejercicio', texto: 'Este día hiciste ejercicio'}]);
    }

    const agregarAlcohol = () => {
        if(habitosNoSaludables.findIndex((habito)=> habito.type === 'alcohol') !== -1)
            return
        setHabitosNoSaludables(prevHabitos => [...prevHabitos,{type: 'alcohol', texto: 'Este día ingeriste alcohol'}]);
    }

    const agregarFumar = () => {
        if(habitosNoSaludables.findIndex((habito)=> habito.type === 'fumar') !== -1)
            return
        setHabitosNoSaludables(prevHabitos => [...prevHabitos,{type: 'fumar', texto: 'Este día fumaste'}]);
    }

    const router = useRouter();
    const { day, month, year } = router.query;
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
                    habitosSaludables={habitosSaludables}
                    habitosNoSaludables={habitosNoSaludables}
                    removeHabitoSaludable={removeHabitoSaludable}
                    removeHabitoNoSaludable={removeHabitoNoSaludable}
                />
            </main>
            <HabitosSaludablesNavBar
                showDormirPopUp={handleDormirModalOpen}
                showAlimentarPopUp={handleAlimentarModalOpen}
                showEjercicioPopUp={handleEjercicioModalOpen}
                showAlcoholPopUp={handleAlcoholModalOpen}
                showFumarPopUp={handleFumarModalOpen}
            />

            <DormirModal isOpen={isDormirModalOpen} handleClose={handleCloseDormirModal} agregarDormir={agregarDormir} />
            <AlimentoModal isOpen={isAlimentarModalOpen} handleClose={handleCloseAlimentarModal} agregarAlimentar={agregarAlimentar} />
            <EjercicioModal isOpen={isEjercicioModalOpen} handleClose={handleCloseEjercicioModal} agregarEjercicio={agregarEjercicio}/>
            <AlcoholModal isOpen={isAlcoholModalOpen} handleClose={handleCloseAlcoholModal} agregarAlcohol={agregarAlcohol} />
            <FumarModal isOpen={isFumarModalOpen} handleClose={handleCloseFumarModal} agregarFumar={agregarFumar}/>
        </div>
    );
}
