import React, {useState} from 'react';
import styles from './Login.module.css';
import './Login.css';
import {useRouter} from "next/router";
import {Modal, TextField, Button, IconButton, Box, Typography, Icon} from '@mui/material';

const Login = () => {

    const router = useRouter();
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');

    return (
        <Box className={styles.loginContainer}> 
            <Box className={styles.containerWithBordersTitle}>
                <Typography variant="h2" className={styles.modalTitle}>LOGIN</Typography>
            </Box>
            <Box className={styles.containerWithBordersLogo}>
                    <div className={styles.icon}></div>
                    <div className={styles.iconTitle}></div>
            </Box>
            <Box className={styles.containerWithBordersName}>
                <Typography variant="h6" className={styles.labelUser}>Nombre Completo</Typography>
                <TextField
                        className={styles.nameInput}
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        fullWidth
                        margin="normal"
                />
            </Box>
            <Box className={styles.containerWithBordersPassword}>
                <Typography variant="h6" className={styles.labelUser}>Contraseña</Typography>
                <TextField
                        className={styles.nameInput}
                        onChange={(e) => setPass(e.target.value)}
                        value={pass}
                        fullWidth
                        margin="normal"
                />
            </Box>
            <Box className={styles.buttonContainer}>
                    <Button className={styles.buttonModal} variant="contained" color="primary" fullWidth>
                        Confirmar
                    </Button>
                    <Typography variant="h6" className={styles.labelUser}>¿No tienes cuenta?</Typography>
            </Box>
        </Box>
    );
};

export default Login;
