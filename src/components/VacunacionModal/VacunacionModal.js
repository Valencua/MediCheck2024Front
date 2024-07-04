// components/VacunacionModal.js
import React, { useState } from 'react';
import { Modal, TextField, Button, IconButton, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './VacunacionModal.css';
import { DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import styles from './VacunacionModal.module.css';

const VacunacionModal = ({ isOpen, handleClose }) => {
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
                <Typography variant="h6" className={styles.modalTitle}>Agregar vacunación</Typography>
                <Box className={styles.containerWithBorders}>
                    <TextField
                        label="Nombre"
                        className={styles.nameInput}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                </Box>
                <Box className={styles.datepickerContainer}>
                    <Typography variant="h6" className={styles.fechaText}>Fecha:</Typography>
                    <DatePicker className={styles.datePicker} value={date} format="MM/dd/yyyy HH:mm" onChange={(newValue) => setDate(newValue)}/>
                </Box>
                <Box className={styles.containerWithBorders}>
                    <TextField
                        label="Notas"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={8}
                        className={styles.notas}
                    />
                </Box>
                <Box className={styles.buttonContainer}>
                    <Button className={styles.buttonModal} variant="contained" color="primary" fullWidth onClick={handleClose}>
                        Confirmar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default VacunacionModal;
