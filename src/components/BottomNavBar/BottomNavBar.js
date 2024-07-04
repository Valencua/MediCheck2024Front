import React from 'react';
import styles from './BottomNavBar.module.css';

const BottomNavBar = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.navItem}>
                <img src="/icons/lobby.svg" alt="Home" className={styles.icon} />
            </div>
            <div className={styles.navItem}>
                <img src="/icons/calendar.svg" alt="HabitosSaludables" className={styles.icon} />
            </div>
            <div className={styles.navItem}>
                <img src="/icons/Profile.svg" alt="Add" className={styles.icon} />
            </div>
        </div>
    );
};

export default BottomNavBar;