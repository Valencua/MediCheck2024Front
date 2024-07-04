// src/HabitosSaludables.js
import React, {useState} from 'react';
import styles from './HabitosSaludables.module.css';
import './HabitosSaludables.css';
import {useRouter} from "next/router";

const HabitosSaludables = ({ day, month, year, habitosSaludables,habitosNoSaludables, removeHabitoSaludable, removeHabitoNoSaludable}) => {

    const router = useRouter();

    const goBack = () => {
        router.back();
    };


    return (
        <div className={styles.habitosSaludablesContainer}>
            <div className={styles.accordionPageHeader}>
                <div className={styles.flechaBack}  onClick={goBack}></div>
                <div className={styles.accordionPageHeaderDate}>{day} de {month} {year}</div>
            </div>
            <div className={styles.habitosSaludables}>
                <div className={styles.habitosTitulo}>Hábitos no saludables</div>
                {habitosSaludables.length > 0 ? habitosSaludables.map((habito,index) => (
                    <div className={styles.habitoContainer} key={index}>
                        <div className={habito.type === 'dormir' ? styles.habitoDormir : habito.type === 'alimento' ? styles.habitoAlimento : styles.habitoEjercicio}></div>
                        <div className={styles.habitoSaludableText}>{habito.texto}</div>
                        <div className={styles.eliminarHabitoSaludable} onClick={() => removeHabitoSaludable(index)}></div>
                    </div>
                )) : (
                    <div className={styles.habitoContainer}>
                        <div className={styles.emptyText}>-</div>
                    </div>
                )
                }
            </div>
            <div className={styles.habitosNoSaludables}>
                <div className={styles.habitosTitulo}>Hábitos no saludables</div>
                {habitosNoSaludables.length > 0 ? habitosNoSaludables.map((habito,index) => (
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
                }
            </div>
        </div>
    );
};

export default HabitosSaludables;
