import Head from 'next/head';
import '../styles/globals.css';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PatientProfile from "../components/PatientProfile/PatientProfile.js";
import DoctorBottomNavBar from "../components/DoctorBottomNavBar/DoctorBottomNavBar.js";
import BottomNavBar from "../components/BottomNavBar/BottomNavBar.js";

export default function PatientProfilePage() {
    const router = useRouter();
    const { paciente } = router.query;
    const [parsedPaciente, setParsedPaciente] = useState(null);
    const [parsedUser, setParsedUser] = useState(null);
    
    useEffect(() => {
        if (paciente) {
            setParsedPaciente(JSON.parse(paciente));
        }
        const user = localStorage.getItem('user');
        if (user) {
            setParsedUser(JSON.parse(user));
        }
    }, [paciente]);

    if (!parsedUser || !parsedPaciente) {
        return <div>Loading...</div>; // Muestra un indicador de carga mientras se obtienen los datos
    }

    return (
        <div>
            <Head>
                <title>Perfil</title>
                <meta name="description" content="Pacientes perfil" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <PatientProfile paciente={parsedPaciente} />
            </main>

            {parsedUser && parsedUser.rol === "patient" ? (
                <BottomNavBar />
            ) : (
                <DoctorBottomNavBar />
            )}
        </div>
    );
}
