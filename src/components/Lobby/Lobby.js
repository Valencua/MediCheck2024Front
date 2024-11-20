// src/HabitosSaludables.js
import React, { useState, useEffect } from 'react';
import styles from './Lobby.module.css';
import './Lobby.css';
import { TextField, Button, Box, Typography, InputAdornment, IconButton } from '@mui/material';


const Lobby = ({paciente}) => {
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
                                {item}
                            </div>
                            <div className={styles.accordionAmount}>
                                {item}
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        </Box>
    );
};

export default Lobby;
