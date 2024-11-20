// src/HabitosSaludables.js
import React, { useState, useEffect } from 'react';
import styles from './PatientProfile.module.css';
import './PatientProfile.css';
import { TextField, Button, Box, Typography, InputAdornment, IconButton } from '@mui/material';


const PatientProfile = ({paciente}) => {
    const [item, setItem] = useState(paciente);
    return (
        <Box className={styles.loginContainer}> 
            <Box className={styles.containerWithBordersTitle}>
                <Typography variant="h2" className={styles.modalTitle}>Perfil</Typography>
            </Box>
            <Box className={styles.containerWithBordersLogo}>
                <div className={styles.icon}></div>
            </Box>
            <div className={styles.accordionContainer}>
                <div className={styles.accordionListContainer}>
                    <div
                        className={styles.accordionHeader}
                    >
                        <div className={styles.patientDataContainer}>
                            <div className={styles.userTitle}>
                                {item.NombreUsuario}
                            </div>
                            <div className={styles.accordionAmount}>
                                {item.CorreoElectronico}
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        </Box>
    );
};

export default PatientProfile;
