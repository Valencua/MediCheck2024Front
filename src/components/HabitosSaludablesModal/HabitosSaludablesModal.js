// components/VacunacionModal.js
import React, { useState } from 'react';
import {Modal, TextField, Button, IconButton, Box, Typography, Icon} from '@mui/material';
import './HabitosSaludablesModal.css';
import { DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import styles from './HabitosSaludablesModal.module.css';

const HabitosNoSaludablesModal = ({ isOpen, handleClose, agregarAlimentar }) => {
    const [date, setDate] = useState(new Date('2024-03-07T16:00:00'));
    const [comidaSaludable, setComidaSaludable] = useState(false);
    const [ejercicio, setEjercicio] = useState(false);
    const [dormir, setDormir] = useState(false);
    const cambiarComida = async (e) => {
        setComidaSaludable(!comidaSaludable)
    }
    const cambiarEjercicio = async (e) => {
        setEjercicio(!ejercicio)

    }
    const cambiarDormir = async (e) => {
        setDormir(!dormir)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        //diaDeEvento, actividadFisica, alimentacionSaludable, minSueño
        // Send a POST request to the API route
        const res = await fetch('https://medicheckapi.vercel.app/habitos-saludables', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                alimentacionSaludable: comidaSaludable,
                actividadFisica: ejercicio || '',
                diaDeEvento: date,
                minSueño:dormir,
            })
        });
    
        const data = await res.json();
    
        if (res.ok) {
            const habitosSaludables = data.habitosSaludables
          // Save the token in localStorage or cookies and redirect to the protected page
          //localStorage.setItem('token', data.token);

          handleClose()
        } else {
          // Display an error message
          setError(data.message);
        }
      };
    return (    
        <Modal open={isOpen} onClose={handleClose}>
            <Box className={styles.modalBox}>
                <Box className="modal-header">
                    <IconButton onClick={handleClose}>
                        <div className={styles.modalCloseIcon}/>
                    </IconButton>
                </Box>
                <Typography variant="h6" className={styles.modalTitle}>Habitos saludables</Typography>
                <Box className={styles.containerWithBorders}>
                    <div className={styles.icon}></div>
                </Box>
                <Box className={styles.datepickerContainer}>
                    <Typography variant="h6" className={styles.fechaText}>Fecha:</Typography>
                    <DatePicker className={styles.datePicker} value={date} format="MM/dd/yyyy HH:mm" onChange={(newValue) => setDate(newValue)}/>
                </Box>
                <Box className={styles.contenedorHabitos}>
                    <div className={comidaSaludable? styles.contenedorHabitosRow : styles.contenedorHabitosRowDisable}>
                        <div className={styles.contenedorTitleIcon}>
                            <div className={styles.iconComerSaludable}></div>
                            <div className={styles.habitoNoSaludableText} onClick={cambiarComida}>Comer saludable</div>
                        </div> 
                    </div>
                    <div className={ejercicio? styles.contenedorHabitosRow : styles.contenedorHabitosRowDisable}>
                        <div className={styles.contenedorTitleIcon}>
                            <div className={styles.iconEjercicio}></div>
                            <div className={styles.habitoNoSaludableText} onClick={cambiarEjercicio}>Hacer ejercicio</div>
                        </div>
                    </div>
                    <div className={dormir? styles.contenedorHabitosRow : styles.contenedorHabitosRowDisable}>
                        <div className={styles.contenedorTitleIcon}>
                            <div className={styles.iconDormir}></div>
                            <div className={styles.habitoNoSaludableText} onClick={cambiarDormir}>Dormir 8 horas</div>
                        </div>
                    </div>

                </Box>
                <Box className={styles.buttonContainer}>
                    <Button className={styles.buttonModal} variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                        Confirmar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default HabitosNoSaludablesModal;
