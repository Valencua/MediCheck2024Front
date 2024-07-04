import React from 'react';
import styles from './HabitosSaludablesNavBar.module.css';

const HabitosSaludablesNavBar = ({showDormirPopUp, showAlimentarPopUp, showEjercicioPopUp, showAlcoholPopUp, showFumarPopUp}) => {
    return (
        <div className={styles.navbar}>
            <div className={styles.navItem}  onClick={showDormirPopUp}>
                <img src="/icons/ic_dormir.svg" alt="Home" className={styles.icon} />
            </div>
            <div className={styles.navItem} onClick={showAlimentarPopUp}>
                <img src="/icons/ic_alimento.svg" alt="HabitosSaludables" className={styles.icon} />
            </div>
            <div className={styles.navItem} onClick={showEjercicioPopUp}>
                <img src="/icons/ic_ejercicio.svg" alt="Add" className={styles.icon} />
            </div>
            <div className={styles.navItem} onClick={showAlcoholPopUp}>
                <img src="/icons/ic_alcohol.svg" alt="Add" className={styles.icon} />
            </div>
            <div className={styles.navItem} onClick={showFumarPopUp}>
                <img src="/icons/ic_fumar.svg" alt="Add" className={styles.icon} />
            </div>
        </div>
    );
};

export default HabitosSaludablesNavBar;