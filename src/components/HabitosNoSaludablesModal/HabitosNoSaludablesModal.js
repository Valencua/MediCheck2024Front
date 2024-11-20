// components/VacunacionModal.js
import React, { useState } from 'react';
import {Modal, TextField, Button, IconButton, Box, Typography, Icon} from '@mui/material';
import './HabitosNoSaludablesModal.css';
import { DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import styles from './HabitosNoSaludablesModal.module.css';

const HabitosNoSaludablesModal = ({ isOpen, handleClose, agregarAlimentar }) => {
    const [date, setDate] = useState(new Date());
    const [consumoDeAlcohol, setConsumoDeAlcohol] = useState(false);
    const [consumoDeTabaco, setConsumoDeTabaco] = useState(false);

    const cambiarAlcohol = async (e) => {
        setConsumoDeAlcohol(!consumoDeAlcohol)

    }
    const cambiarTabaco = async (e) => {
        setConsumoDeTabaco(!consumoDeTabaco)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        //diaDeEvento, actividadFisica, alimentacionSaludable, minSueño
        // Send a POST request to the API route
        const authToken = localStorage.getItem('token');
        const res = await fetch('https://medicheckapi.vercel.app/habitos-no-saludables', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`    
            },
            body: JSON.stringify({
                consumoDeAlcohol: consumoDeAlcohol || false,
                consumoDeTabaco: consumoDeTabaco || false,
                diaDeEvento: date,
            })
        });
    
        const data = await res.json();
        if (res.ok) {
            //const habitosSaludables = data.habitosSaludables
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
                <Typography variant="h6" className={styles.modalTitle}>Habitos no saludables</Typography>
                <Box className={styles.containerWithBorders}>
                    <div className={styles.icon}></div>
                </Box>
                <Box className={styles.datepickerContainer}>
                    <Typography variant="h6" className={styles.fechaText}>Fecha:</Typography>
                    <DatePicker className={styles.datePicker} value={date} format="MM/dd/yyyy HH:mm" onChange={(newValue) => setDate(newValue)}/>
                </Box>
                <Box className={styles.contenedorHabitos}>
                    <div className={consumoDeTabaco? styles.contenedorHabitosRow : styles.contenedorHabitosRowDisable}>
                        <div className={styles.contenedorTitleIcon}>
                            <div className={styles.iconFumarNoSaludable}></div>
                            <div className={styles.habitoNoSaludableText} onClick = {cambiarTabaco}>Fumar</div>
                        </div> 
                        <div className={styles.descripcion}>El fumar daña casi cada órgano del cuerpo y sistema de órganos del cuerpo y disminuye la salud general de la persona.</div>
                    </div>
                    <div className={consumoDeAlcohol? styles.contenedorHabitosRow : styles.contenedorHabitosRowDisable}>
                        <div className={styles.contenedorTitleIcon}>
                            <div className={styles.iconAlcoholNoSaludable}></div>
                            <div className={styles.habitoNoSaludableText} onClick = {cambiarAlcohol}>Tomar alcohol</div>
                        </div>
                        <div className={styles.descripcion}>Con el tiempo, el consumo excesivo de alcohol puede causar enfermedades crónicas y otros serios problemas.</div>
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
