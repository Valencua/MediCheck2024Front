// components/VacunacionModal.js
import React, { useState } from 'react';
import { Modal, TextField, Button, IconButton, Box, Typography } from '@mui/material';
import './MedicationModal.css';
import { DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import styles from './MedicationModal.module.css';

const MedicationModal = ({ isOpen, handleClose }) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('1 pastilla');
    const [date, setDate] = useState(new Date('2024-03-07T16:00:00'));
    const [notes, setNotes] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Send a POST request to the API route
        const res = await fetch('https://medicheckapi.vercel.app/medicacion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombreMedicamento: name,
                cantidadMedicamento: quantity,
                notasMedicamento: notes || '',
                diaDeEvento: date,
            })
        });
    
        const data = await res.json();
    
        if (res.ok) {
            const medicationData = data.medicationData
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
                <Typography variant="h6" className={styles.modalTitle}>Agregar medicación</Typography>
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
                <Box className={styles.cantidadContainer}>
                    <Typography variant="h6" className={styles.cantidadText}>Cantidad:</Typography>
                    <TextField
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        fullWidth
                        margin="normal"
                        className={styles.cantidadInput}
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
                        rows={4}
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

export default MedicationModal;
