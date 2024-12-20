import React from 'react';
import styles from './BottomNavBar.module.css';
import { useRouter } from 'next/router';

const BottomNavBar = () => {
    const router = useRouter(); 
    const currentPath = router.pathname;

    const goToProfile = () => {
        const user = localStorage.getItem('user');
        router.push({
            pathname: '/patient-profile',
            query: { paciente: user },
        });
    };

    const goToCalendar = () => {
        router.push('/calendar');
    };

    const goToLobby = () => {
        router.push('/lobby');
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.navItem} onClick={goToLobby}>
                <img 
                    src={currentPath === '/lobby' ? "/icons/lobby-iluminado.svg" : "/icons/lobby.svg"} 
                    alt="Home" 
                    className={styles.icon} 
                />
            </div>
            <div className={styles.navItem} onClick={goToCalendar}>
                <img 
                    src={currentPath === '/calendar' ? "/icons/calendar-iluminado.svg" : "/icons/calendar.svg"} 
                    alt="Calendario" 
                    className={styles.icon} 
                />
            </div>
            <div className={styles.navItem} onClick={goToProfile}>
                <img 
                    src={currentPath === '/patient-profile' ? "/icons/Profile-iluminado.svg" : "/icons/Profile.svg"} 
                    alt="Profile" 
                    className={styles.icon} 
                />
            </div>
        </div>
    );
};

export default BottomNavBar;