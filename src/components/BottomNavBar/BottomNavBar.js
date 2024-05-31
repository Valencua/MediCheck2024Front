import React from 'react';
import styles from './BottomNavBar.module.css';

const BottomNavBar = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.navItem}>
                <img src="/icons/home.png" alt="Home" className={styles.icon} />
            </div>
            <div className={styles.navItem}>
                <img src="/icons/add.png" alt="Calendar" className={styles.icon} />
            </div>
            <div className={styles.navItem}>
                <img src="/icons/add.png" alt="Add" className={styles.icon} />
            </div>
            <div className={styles.navItem}>
                <img src="/icons/user.png" alt="User" className={styles.icon} />
            </div>
        </div>
    );
};

export default BottomNavBar;