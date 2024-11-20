import Head from 'next/head';
import '../styles/globals.css';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Lobby from "../components/Lobby/Lobby.js";
import DoctorBottomNavBar from "../components/DoctorBottomNavBar/DoctorBottomNavBar.js";
import BottomNavBar from "../components/BottomNavBar/BottomNavBar.js";

export default function LobbyPage() {
    const router = useRouter();
    const { paciente } = router.query;
    const [parsedUser, setParsedUser] = useState(null);
    
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setParsedUser(JSON.parse(user));
        }
    }, []);

    if (!parsedUser) {
        return <div>Loading...</div>; 
    }

    return (
        <div>
            <Head>
                <title>Lobby</title>
                <meta name="description" content="Lobby" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Lobby/>
            </main>

            {parsedUser && parsedUser.rol === "patient" ? (
                <BottomNavBar />
            ) : (
                <DoctorBottomNavBar />
            )}
        </div>
    );
}
