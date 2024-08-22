import React from 'react';
import styles from './HabitosSaludablesNavBar.module.css';

const HabitosSaludablesNavBar = ({showHabitosNoSaludablesPopUp, showHabitosSaludablesPopUp, GoBack}) => {
    return (
        <div className={styles.navbar}>
            <div className={styles.navItem}  onClick={showHabitosSaludablesPopUp}>
                <img src="/icons/Habitos_saludables.svg" alt="habitossaludables" className={styles.icon} />
            </div>
            <div className={styles.navItem} onClick={showHabitosNoSaludablesPopUp}>
                <img src="/icons/Habitos_nosaludables.svg" alt="habitosnosaludables" className={styles.icon} />
            </div>
            <div className={styles.navItem} onClick={GoBack}>
                <img src="/icons/volver_medicacionesyvac.svg" alt="volver" className={styles.icon} />
            </div>
        </div>
    );
};

export default HabitosSaludablesNavBar;