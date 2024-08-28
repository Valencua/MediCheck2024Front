// src/HabitosSaludables.js
import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useRouter } from 'next/router';
import styles from './EventList.module.css';
import './EventList.css';

const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true });
};

const EventList = ({ day, month, year, event }) => {
    
    const createEvents = (event) => {
        if (!Array.isArray(event)) return [];
    
        const combinedArray = [];
    
        event.forEach(item => {
            if (item?.medicacion) {
                combinedArray.push(...item.medicacion.map(med => ({
                    type: 'Medicación',
                    name: med.NombreMedicamento,
                    amount: med.CantidadMedicamento,
                    time: formatTime(med.TimestampMedicacion._seconds),
                    details: med.NotasMedicamento,
                    timestamp: med.TimestampMedicacion._seconds
                })));
            }
        });
    
        event.forEach(item => {
            if (item?.vacunacion) {
                combinedArray.push(...item.vacunacion.map(vac => ({
                    type: 'Vacunación', 
                    name: vac.NombreVacuna,
                    time: formatTime(vac.TimestampVacunacion._seconds),
                    timestamp: vac.TimestampVacunacion._seconds
                })));
            }
        });
    
        combinedArray.sort((a, b) => a.timestamp - b.timestamp);
    
        combinedArray.forEach(item => delete item.timestamp);
    
        return combinedArray;
    };

    const [isEditionActive, setIsEditionActive] = useState(false);
    const [items, setItems] = useState(event ? createEvents(event) : []);
    
    useEffect(() => {
        if (event) {
            setItems(createEvents(event));
        }
    }, [event]); // Run this effect whenever `event` changes

    const removeItem = async (item) => { //name amount time
        if (!isEditionActive){
            return;
        }

        const eventoABorrarV = event[0]["vacunacion"]?.filter(vac => vac.NombreVacuna === item.name)[0];
        const eventoABorrarM = event[0]["medicacion"]?.filter(med => med.NombreMedicamento === item.name)[0];
        
        const deleteRequest = item.type === "Vacunación" ? {
            tipoEvento: "vacunacion",
            diaDeEvento: new Date(eventoABorrarV.TimestampVacunacion._seconds * 1000),
            nombreVacuna: eventoABorrarV.NombreVacuna,
        } : {
            tipoEvento: "medicacion",
            diaDeEvento: new Date(eventoABorrarM.TimestampMedicacion._seconds * 1000),
            nombreMedicamento: eventoABorrarM.NombreMedicamento,
        };

        // Send a DELETE request to the API route
        const res = await fetch('https://medicheckapi.vercel.app/evento', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(deleteRequest)
        });
    
        const data = await res.json();
    
        if (res.ok) {
            //const habitosSaludables = data.habitosSaludables;
            // Save the token in localStorage or cookies and redirect to the protected page
            // localStorage.setItem('token', data.token);
        } else {
            // Display an error message
            setError(data.message);
        }
    };

    const router = useRouter(); 

    const goBack = () => {
        router.back();
    };

    const toggleEdition = () => {
        setIsEditionActive(!isEditionActive);
    };

    return (
        <div className={styles.accordionContainer}>
            <div className={styles.accordionPageHeader}>
                <div className={styles.flechaBack} onClick={goBack}></div>
                <div className={styles.accordionPageHeaderDate}>{day} de {month} {year}</div>
            </div>
            {items.map((value, index) => {
                let iconoEvento = value.type === 'Vacunación' ? styles.iconoVacunacion : styles.iconoPildora;
                let iconoFila = isEditionActive ? styles.iconoEliminar : iconoEvento;
                return (
                    <Accordion key={index} className={styles.accordionListContainer}>
                        <AccordionSummary
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                        >
                            <div className={styles.accordionHeader}>
                                <div className={iconoFila} onClick={() => removeItem(value)}></div>
                                <div className={styles.accordionType}>{value.name}</div> 
                                <div className={styles.accordionAmount}>{value.amount}</div>
                                <div className={styles.accordionTime}>{value.time}</div>
                            </div>
                        </AccordionSummary>
                        {value.details ?
                            (
                                <AccordionDetails>
                                    <div className={styles.accordionDetails}>{value.details}</div>
                                </AccordionDetails>
                            ) : null
                        }

                    </Accordion>
                );
            })}

            <div className={isEditionActive ? styles.botonEdicionInactivo : styles.botonEdicionActivo} onClick={toggleEdition}></div>
        </div>
    );
};

export default EventList;
