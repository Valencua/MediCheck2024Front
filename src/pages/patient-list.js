// EventListPage.js
import Head from 'next/head';
import '../styles/globals.css';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PatientList from "../components/PatientList/PatientList.js";
import DoctorBottomNavBar from "../components/DoctorBottomNavBar/DoctorBottomNavBar.js";

export default function PatientListPage() {
    const [pacientes, setPacientes] = useState(null);
    const router = useRouter();

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('https://medicheckapi.vercel.app/patients', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            setPacientes(result);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
        const handleRouteChange = (url) => {
            if (url === '/patient-list') fetchData();
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router]);

    if (!pacientes) return <p>Cargando pacientes...</p>;

    return (
        <div>
            <Head>
                <title>Pacientes</title>
                <meta name="description" content="Pacientes page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>

            </main>
            <PatientList pacientes={pacientes}/>
            <DoctorBottomNavBar/>
        </div>
        
    );
}
