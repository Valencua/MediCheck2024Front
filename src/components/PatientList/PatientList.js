// src/HabitosSaludables.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './PatientList.module.css';
import './PatientList.css';


const PatientList = ({pacientes}) => {

    const [items, setItems] = useState(pacientes);

    const router = useRouter(); 

    const goToProfile = (paciente) => {
        router.push({   
            pathname: '/patient-profile',
            query: { paciente: JSON.stringify(paciente) },
        });}
    const goToPatientCalendar = () => {
        router.push('/calendar');}
    return (
        <div className={styles.accordionContainer}> 
            <div className={styles.containerWithBordersTitle}>
                <p variant="h2" className={styles.modalTitle}>Lista de pacientes</p>
            </div>
            {items.map((value, index) => { 
                return (
                    <div className={styles.accordionHeader}>
                        <div key={index} className={styles.accordionListContainer}>
                            <div
                                aria-controls={`panel${index}-content`}
                                id={`panel${index}-header`}
                                className={styles.accordionHeader}
                            >
                                
                                <div
                                    className={styles.iconoAvatar}
                                    onClick={() => goToProfile(value)}
                                ></div>
                                <div className={styles.patientDataContainer}> 
                                    <div className={styles.accordionType}>
                                        {value.NombreUsuario}
                                    </div>
                                    <div className={styles.accordionAmount}>
                                        {value.CorreoElectronico}
                                    </div>
                                </div>
                                <div
                                    className={styles.iconoCalendar}
                                    onClick={() => goToPatientCalendar(value)}
                                ></div>
                                </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PatientList;
