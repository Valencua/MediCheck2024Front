import React from 'react';
import styles from './EventListBottomNavBar.module.css';
import {useRouter} from "next/router";

const EventListBottomNavBar = ({showMedicamentosPopUp, showVacunacionPopUp, day, month, year, event}) => {
    const router = useRouter();
    const goToHabitosSaludablesPage = () => {
        router.push({
            pathname: '/habitos-saludables',
            query: { day: day, month: month, year:year, event:JSON.stringify(event)},
        });
    };
    return (
        <div className={styles.navbar}>
            <div className={styles.navItem} onClick={showMedicamentosPopUp}>
                <img src="/icons/ic_medicamentos.svg" alt="Medicamentos" className={styles.icon} />
            </div>
            <div className={styles.navItem} onClick={showVacunacionPopUp}>
                <img src="/icons/ic_vacunas.svg" alt="Vacunas" className={styles.icon} />
            </div>
            <div className={styles.navItem} onClick={goToHabitosSaludablesPage}>
                <img src="/icons/ic_habitos_saludables.svg" alt="Habitos Saludables" className={styles.icon} />
            </div>
        </div>
    );
};

export default EventListBottomNavBar;