// src/HabitosSaludables.js
import React, {useState} from 'react';
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
        const combinedArray = [];
        event.forEach(item => {
            if (item["vacunacion_medicacion.medicacion"]) {
                combinedArray.push(...item["vacunacion_medicacion.medicacion"].map(med => ({
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
            if (item["vacunacion_medicacion.vacunacion"]) {
                combinedArray.push(...item["vacunacion_medicacion.vacunacion"].map(vac => ({
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
    }
    const [isEditionActive, setIsEditionActive] = useState(false);
    const [items, setItems] = useState(event? createEvents(event) : [])
    
    const router = useRouter(); 

    const goBack = () => {
        router.back();
    };

    const toggleEdition = () => {
        setIsEditionActive(!isEditionActive);
    };

    const removeItem = (itemToRemove) => {
        if (!isEditionActive){
            return;
        }
        setItems(prevItems => prevItems.filter(item =>
            !(item.type === itemToRemove.type && item.time === itemToRemove.time && item.details === itemToRemove.details)
        ));
    }

    return (
        <div className={styles.accordionContainer}>
            <div className={styles.accordionPageHeader}>
                <div className={styles.flechaBack}  onClick={goBack}></div>
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
