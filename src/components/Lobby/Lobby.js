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
                <Typography variant="h2" className={styles.modalTitle}>Bienvenido</Typography>
            </Box>
            <Box className={styles.containerWithBordersLogo}>
                <div className={styles.icon}></div>
            </Box>
            <Box className={styles.containerWithReminder}>
                <div className={styles.reminder}></div>
            </Box>
            <Box className={styles.containerWithTeam}>
                <div className={styles.team}></div>
            </Box>
        </Box>
    );
};

export default Lobby;
