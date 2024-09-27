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
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Send a POST request to the API route
        const res = await fetch('https://medicheckapi.vercel.app/vacuna', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombreVacuna: name,
                notasVacunacion: notes || '',
                diaDeEvento: date,
            })
        });
    
        const data = await res.json();
    
        if (res.ok) {
            const vacunaData = data.vacunaData
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
                    <Button className={styles.buttonModal} variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                        Confirmar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default VacunacionModal;
