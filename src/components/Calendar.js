// src/components/Calendar.js
import React, { useState } from 'react';
import styles from './Calendar.module.css';

const Calendar = () => {
    const [date, setDate] = useState(new Date(2024, 0)); // Start with January 2024

    const daysOfWeek = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const handlePrevMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1));
    };

    const renderCalendarDates = () => {
        const daysInMonth = getDaysInMonth(date.getFullYear(), date.getMonth());
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        const dates = [];
        let dayOffset = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); // Adjust for Monday start

        for (let i = 0; i < dayOffset; i++) {
            dates.push(<div key={`empty-${i}`} className={styles.calendarDateEmpty}><div className={styles.dateEmptyNumber}>{i}</div><div className={styles.dateContent}></div></div>);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            dates.push(<div key={i} className={styles.calendarDate}><div className={styles.dateNumber}>{i}</div><div className={styles.dateContent}></div> </div>);
        }

        return dates;
    };

    return (
        <div className={styles.calendar}>
            <header className={styles.calendarHeader}>
                <button onClick={handlePrevMonth} className={styles.navButtonLeft}></button>
                <h1 className={styles.dateText}>{months[date.getMonth()]} {date.getFullYear()}</h1>
                <button onClick={handleNextMonth} className={styles.navButtonRight}></button>
                <div className={styles.reminderSection}>
                    {/*<div className={styles.reminderIcon}>⏲️</div>*/}
                    {/*<div className={styles.reminderText}>*/}
                    {/*    <div>Tomar medicamento de presion: <span>Hoy</span></div>*/}
                    {/*    <div>Ir al centro de vacunacion: <span>Mañana</span></div>*/}
                    {/*</div>*/}
                </div>
            </header>
            <div className={styles.calendarGrid}>
                {daysOfWeek.map(day => (
                    <div key={day} className={styles.calendarDay}>{day}</div>
                ))}
                {renderCalendarDates()}
            </div>
        </div>
    );
};

export default Calendar;
