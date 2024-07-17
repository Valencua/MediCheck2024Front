// src/HabitosSaludables.js
import React, {useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useRouter } from 'next/router';
import styles from './EventList.module.css';
import './EventList.css';

const EventList = ({ day, month, year }) => {
    const [isEditionActive, setIsEditionActive] = useState(false);
    const [items, setItems] = useState([
        {type: 'Vacunación', time: '8:30 am'},
        {type: 'Medicación', amount: '2 ml', time: '9:00 am'},
        {type: 'Vacunación', time: '10:30 am'},
        {
            type: 'Medicación',
            amount: '1 g',
            time: '9:00 am',
            details: 'Tomar con un vaso de agua, no con algun jugo y tener en cuenta que despues de la primera dosis provoca cansancio. Ademas recordar que lalalala...'
        }
    ]);
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
                                <div className={styles.accordionType}>{value.type}</div>
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
