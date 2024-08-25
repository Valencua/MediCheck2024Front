// src/components/Calendar.js
import React, { useState, useEffect } from 'react';
import styles from './Calendar.module.css';
import { useRouter } from 'next/router';
import {useEvents} from '../../utils/EventsProvider';

const Calendar = () => {
    const [date, setDate] = useState(new Date()); // Start with the current month
    const today = new Date(); // Get the current date
    const router = useRouter();
    const [eventos, setEventos] = useState(null);
    const {events, setEvents} = useEvents()

    const hayEventoEsteDia = (day, month, year, timestamp) => {
        const date = new Date(timestamp._seconds * 1000);
        return date.getDate() === day &&
               date.getMonth() === month &&
               date.getFullYear() === year;
    }

    const goToEventsListPage = (day, monthName, monthNumber, year) => {
        const filteredEvent = eventos.filter(item => {
            return item["vacunacion_medicacion.medicacion"]?.some(med => {
                return hayEventoEsteDia(day, monthNumber, year, med.TimestampMedicacion)
            }) || item["vacunacion_medicacion.vacunacion"]?.some(med => {
                return hayEventoEsteDia(day, monthNumber, year, med.TimestampVacunacion)
            }) || (item["habitos_nosaludables_saludables.no_saludables"] && hayEventoEsteDia(day, monthNumber, year, item["habitos_nosaludables_saludables.no_saludables"].TimestampHabitosNoSaludables))
            || item["habitos_nosaludables_saludables.saludables"] && hayEventoEsteDia(day, monthNumber, year, item["habitos_nosaludables_saludables.saludables"].TimestampHabitosSaludables)
        });

        router.push({
            pathname: '/event-list',
            query: { day: day, month: monthName, year:year, event:JSON.stringify(filteredEvent) },
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
            //setEvents(result)
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
                <div key={i} className={`${styles.calendarDate} ${isToday ? styles.today : ''}`} onClick={() => goToEventsListPage(i, months[date.getMonth()], date.getMonth(), date.getFullYear())}>
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
