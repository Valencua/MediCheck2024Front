import React from 'react';
import styles from './DoctorBottomNavBar.module.css';
import { useRouter } from 'next/router';

const DoctorBottomNavBar = () => {
    const router = useRouter(); 
    const currentPath = router.pathname;
    
    const goToPatientList = () => {
        router.push('/patient-list');}
    
    const goToProfile = () => {
        const user = localStorage.getItem('user');
        router.push({   
            pathname: '/patient-profile',
            query: { paciente: user },
    });}
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
            <div className={styles.navItem} onClick={goToPatientList}>
                <img src={currentPath === '/patient-list' ? "/icons/patient-list-iluminado.svg" : "/icons/patient_list.svg"} alt="PatientsList" className={styles.icon} />
            </div>
            <div className={styles.navItem} onClick={goToProfile}>
                <img src={currentPath === '/patient-profile' ? "/icons/Profile-iluminado.svg" : "/icons/Profile.svg"} alt="Add" className={styles.icon} />
            </div>
        </div>
    );
};

export default DoctorBottomNavBar;