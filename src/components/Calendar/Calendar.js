// src/components/Calendar.js
import React, { useState, useEffect } from 'react';
import styles from './Calendar.module.css';
import { useRouter } from 'next/router';

const Calendar = () => {
    const [date, setDate] = useState(new Date()); // Start with the current month
    const today = new Date(); // Get the current date
    const router = useRouter();
    const [eventos, setEventos] = useState(null);
    const goToEventsListPage = (day, month, year) => {
        router.push({
            pathname: '/event-list',
            query: { day: day, month: month, year:year },
        });
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:3000/eventos', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setEventos(result);
          } catch (error) {
            console.log(error)
          }
        };
    
        fetchData();
      }, []); 

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
        const previousMonthDays = getDaysInMonth(date.getFullYear(), date.getMonth() - 1);
        const dates = [];
        const dayOffset = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); // Adjust for Monday start

        // Fill the empty cells at the beginning with the last days of the previous month
        for (let i = dayOffset - 1; i >= 0; i--) {
            dates.push(
                <div key={`prev-empty-${i}`} className={styles.calendarDateEmpty}>
                    <div className={styles.dateEmptyNumber}>{previousMonthDays - i}</div>
                    <div className={styles.dateContent}></div>
                </div>
            );
        }

        // Fill the cells with the days of the current month
        for (let i = 1; i <= daysInMonth; i++) {
            const isToday = (
                i === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()
            );

            dates.push(
                <div key={i} className={`${styles.calendarDate} ${isToday ? styles.today : ''}`} onClick={() => goToEventsListPage(i, months[date.getMonth()], date.getFullYear())}>
                    <div className={styles.dateNumber}>
                        <div className={styles.dateMark}>
                            {i}
                        </div>
                    </div>
                    <div className={styles.dateContent}></div>
                </div>
            );
        }

        const remainingDays = 42 - dates.length;
        for (let i = 1; i <= remainingDays; i++) {
            dates.push(
                <div key={`next-empty-${i}`} className={styles.calendarDateEmpty}>
                    <div className={styles.dateEmptyNumber}>{i}</div>
                    <div className={styles.dateContent}></div>
                </div>
            );
        }
        
        return dates;
    };

    const isCurrentMonth = date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();

    return (
        <div className={styles.calendar}>
            <header className={styles.calendarHeader}>
                <h1 className={styles.yearText}>{date.getFullYear()}</h1>
                <div className={styles.contenedor}>
                    <button onClick={handlePrevMonth} className={styles.navButtonLeft}></button>
                    <h1 className={styles.dateText}>{months[date.getMonth()]}</h1>
                    <button onClick={handleNextMonth} className={styles.navButtonRight}></button>
                </div>
            </header>
            <div className={styles.calendarGrid}>
                {daysOfWeek.map((day, index) => {
                    const isCurrentDay = isCurrentMonth && index === (today.getDay() === 0 ? 6 : today.getDay() - 1); // Adjust for Monday start
                    return (
                        <div key={day} className={`${styles.calendarDay} ${isCurrentDay ? styles.currentDay : ''}`}>
                            {day}
                        </div>
                    );
                })}
                {renderCalendarDates()}
            </div>
        </div>
    );
};

export default Calendar;
