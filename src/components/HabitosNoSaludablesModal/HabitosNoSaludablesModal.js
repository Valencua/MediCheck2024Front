// components/VacunacionModal.js
import React, { useState } from 'react';
import {Modal, TextField, Button, IconButton, Box, Typography, Icon} from '@mui/material';
import './HabitosNoSaludablesModal.css';
import { DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import styles from './HabitosNoSaludablesModal.module.css';

const HabitosNoSaludablesModal = ({ isOpen, handleClose, agregarAlimentar }) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('1 pastilla');
    const [time, setTime] = useState('16:00 pm');
    const [date, setDate] = useState(new Date('2024-03-07T16:00:00'));
    const [notes, setNotes] = useState('');

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
                    <div className={styles.contenedorHabitosRow}>
                        <div className={styles.contenedorTitleIcon}>
                            <div className={styles.iconFumarNoSaludable}></div>
                            <div className={styles.habitoNoSaludableText}>Fumar</div>
                        </div> 
                        <div className={styles.descripcion}>El fumar daña casi cada órgano del cuerpo y sistema de órganos del cuerpo y disminuye la salud general de la persona.</div>
                    </div>
                    <div className={styles.contenedorHabitosRowDisable}>
                        <div className={styles.contenedorTitleIcon}>
                            <div className={styles.iconAlcoholNoSaludable}></div>
                            <div className={styles.habitoNoSaludableText}>Tomar alcohol</div>
                        </div>
                        <div className={styles.descripcion}>Con el tiempo, el consumo excesivo de alcohol puede causar enfermedades crónicas y otros serios problemas.</div>
                    </div>

                </Box>
                <Box className={styles.buttonContainer}>
                    <Button className={styles.buttonModal} variant="contained" color="primary" fullWidth onClick={() => {
                        agregarAlimentar()
                        handleClose()
                    }}>
                        Confirmar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default HabitosNoSaludablesModal;
