// src/HabitosSaludables.js
import React, {useState} from 'react';
import styles from './HabitosSaludables.module.css';
import './HabitosSaludables.css';
import {useRouter} from "next/router";

const HabitosSaludables = ({ day, month, year, event}) => {
    const eventHabitosSaludables = { ...event[0]?.['habitos_nosaludables_saludables.saludables'] }
    delete eventHabitosSaludables.TimestampHabitosSaludables;
    const [habitosSaludables, setHabitosSaludables] = useState(eventHabitosSaludables)
    const router = useRouter();
    
    const goBack = () => {
        router.back();
    };

    const removeHabitoSaludable = (key) => {
        setHabitosSaludables(prevHabitos => ({...prevHabitos, [key]: false}));
    }
    

    return (
        <div className={styles.habitosSaludablesContainer}>
            <div className={styles.accordionPageHeader}>
                <div className={styles.flechaBack}  onClick={goBack}></div>
                <div className={styles.accordionPageHeaderDate}>{day} de {month} {year}</div>
            </div>
            <div className={styles.habitosSaludables}>
                <div className={styles.habitosTitulo}>Hábitos saludables</div>
                {habitosSaludables ? 
                    Object.keys(habitosSaludables).map((key, index) => {
                        
                        return habitosSaludables[key] ? 
                        (
                            <div className={styles.habitoContainer} key={index}>
                                <div className={key === 'MinSueño' ? styles.habitoDormir : key === 'AlimentacionSaludable' ? styles.habitoAlimento : styles.habitoEjercicio}></div>
                                <div className={styles.habitoSaludableText}>{key === 'MinSueño' ? "Este día dormiste 8 horas" : key === 'AlimentacionSaludable' ? "Este día comiste saludable ": "Este día hiciste ejercicio"}</div>
                                <div className={styles.eliminarHabitoSaludable} onClick={() => removeHabitoSaludable(key)}></div>
                            </div>
                        ) : null
                    })
                    : (
                        <div className={styles.habitoContainer}>
                            <div className={styles.emptyText}>-</div>
                        </div>
                    )
                }
            </div>
            <div className={styles.habitosNoSaludables}>
                <div className={styles.habitosTitulo}>Hábitos no saludables</div>
                {/* {habitosNoSaludables.length > 0 ? habitosNoSaludables.map((habito,index) => (
                    <div className={styles.habitoContainer} key={index}>
                        <div className={habito.type === 'alcohol' ? styles.habitoAlcohol : styles.habitoFumar}></div>
                        <div className={styles.habitoSaludableText}>{habito.texto}</div>
                        <div className={styles.eliminarHabitoSaludable} onClick={() => removeHabitoNoSaludable(index)}></div>
                    </div>
                )) : (
                    <div className={styles.habitoContainer}>
                        <div className={styles.emptyText}>-</div>
                    </div>
                )
                } */}
            </div>
        </div>
    );
};

export default HabitosSaludables;
