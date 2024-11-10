// src/HabitosSaludables.js
import React, { useState, useEffect } from 'react';
import styles from './HabitosSaludables.module.css';
import './HabitosSaludables.css';
import { useRouter } from 'next/router';

const toCamelCase = str => str.charAt(0).toLowerCase() + str.slice(1);

const keysToCamelCase = obj => {
    if (Array.isArray(obj)) return obj.map(keysToCamelCase);
    if (obj && typeof obj === 'object') {
        return Object.keys(obj).reduce((result, key) => {
            const camelCaseKey = toCamelCase(key);
            result[camelCaseKey] = keysToCamelCase(obj[key]);
            return result;
        }, {});
    }
    return obj;
};

const removeTimestamp = obj => {
    const newObj = { ...obj };
    if (newObj.hasOwnProperty('TimestampHabitosSaludables')){
        delete newObj.TimestampHabitosSaludables;
    } else if (newObj.hasOwnProperty('TimestampHabitosNoSaludables')){
        delete newObj.TimestampHabitosNoSaludables;
    }
    
    return newObj;
};

const HabitosSaludables = ({ day, month, year, event }) => {
    const router = useRouter();
    const [habitosSaludables, setHabitosSaludables] = useState({});
    const [habitosNoSaludables, setHabitosNoSaludables] = useState({});
    const [isEditionActive, setIsEditionActive] = useState(false);

    useEffect(() => {
        const habitosSaludablesData = event && Array.isArray(event) && event[0] ? event[0]['habitos_saludables'] : {};
        const habitosNoSaludablesData = event && Array.isArray(event) && event[0] ? event[0]['habitos_no_saludables'] : {};
        
        setHabitosSaludables(removeTimestamp(habitosSaludablesData));
        setHabitosNoSaludables(removeTimestamp(habitosNoSaludablesData));
    }, [event]);

    const toggleEdition = () => setIsEditionActive(!isEditionActive);
    const goBack = () => router.back();

    const removeItem = async (item) => {
        if (!isEditionActive) return;

        const deleteRequest = {
            ...item.type === "habitos_saludables" ? habitosSaludables : habitosNoSaludables,
            [item.habito]: false,
            diaDeEvento: new Date(item.date._seconds * 1000).toISOString()
        };

        const path = item.type === "habitos_saludables"
            ? 'http://localhost:3000/habitos-saludables'
            : 'http://localhost:3000/habitos-no-saludables';
        
        const authToken = localStorage.getItem('token');

        const res = await fetch(path, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(keysToCamelCase(deleteRequest))
        });

        const data = await res.json();

        if (res.ok) {
            if (item.type === "habitos_saludables") {
                delete data.habitosSaludables.TimestampHabitosSaludables;
                setHabitosSaludables(data.habitosSaludables);
            } else {
                delete data.habitosNoSaludables.TimestampHabitosNoSaludables;
                setHabitosNoSaludables(data.habitosNoSaludables);
            }
        } else {
            console.error(data.message);
        }
    };

    const renderHabitos = (habitos, type) => (
        Object.keys(habitos).map((key, index) => {
            if (!habitos[key]) return null;

            const iconoEvento = type === "habitos_saludables"
                ? key === 'MinSueño' ? styles.habitoDormir
                : key === 'AlimentacionSaludable' ? styles.habitoAlimento
                : styles.habitoEjercicio
                : key === 'ConsumoDeAlcohol' ? styles.habitoAlcohol
                : styles.habitoFumar;

            const handleClick = () => removeItem({ habito: key, type, date: type === "habitos_saludables" ? event[0]['habitos_saludables']?.TimestampHabitosSaludables : event[0]['habitos_no_saludables']?.TimestampHabitosNoSaludables });

            return (
                <div className={styles.habitoContainer} key={index}>
                    <div className={isEditionActive ? styles.iconoEliminar : iconoEvento} onClick={handleClick}></div>
                    <div className={styles.habitoSaludableText}>
                        {type === "habitos_saludables"
                            ? key === 'MinSueño' ? "Este día dormiste 8 horas"
                            : key === 'AlimentacionSaludable' ? "Este día comiste saludable"
                            : "Este día hiciste ejercicio"
                            : key === 'ConsumoDeAlcohol' ? "Este día ingeriste alcohol"
                            : "Este día fumaste"
                        }
                    </div>
                </div>
            );
        })
    );

    return (
        <div className={styles.habitosSaludablesContainer}>
            <div className={styles.accordionPageHeader}>
                <div className={styles.flechaBack} onClick={goBack}></div>
                <div className={styles.accordionPageHeaderDate}>{day} de {month} {year}</div>
            </div>
            <div className={styles.habitosSaludables}>
                <div className={styles.habitosTitulo}>Hábitos saludables</div>
                {renderHabitos(habitosSaludables, "habitos_saludables") || <div className={styles.habitoContainer}><div className={styles.emptyText}>-</div></div>}
            </div>
            <div className={styles.habitosNoSaludables}>
                <div className={styles.habitosTitulo}>Hábitos no saludables</div>
                {renderHabitos(habitosNoSaludables, "habitos_no_saludables") || <div className={styles.habitoContainer}><div className={styles.emptyText}>-</div></div>}
            </div>
            <div className={isEditionActive ? styles.botonEdicionInactivo : styles.botonEdicionActivo} onClick={toggleEdition}></div>
        </div>
    );
};

export default HabitosSaludables;
