import React, {useState} from 'react';
import styles from './Login.module.css';
import './Login.css';
import {useRouter} from "next/router";
import { Modal, TextField, Button, Box, Typography, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {

    const router = useRouter();
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
                <div className={styles.containerUserLabel}>
                    <Typography variant="h6" className={styles.labelUser}>Nombre Completo</Typography>
                </div>
                <div className={styles.containerUserInputUser}>
                    <TextField
                        className={styles.nameInput}
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        fullWidth
                        margin="normal"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <div className={styles.LogoContainer}> 
                                        <div className={styles.userLogo}></div>
                                    </div>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '2vh',
                                backgroundColor: '#AFAFAF40',
                            },
                        }}
                    />
                </div>
                
            </Box>
            <Box className={styles.containerWithBordersPassword}>
                <div className={styles.containerUserLabel}>
                    <Typography variant="h6" className={styles.labelUser}>Contraseña</Typography>
                </div>
                <div className={styles.containerUserInputUser}>
                    <TextField
                        className={styles.nameInput}
                        onChange={(e) => setPass(e.target.value)}
                        value={pass}
                        type={showPassword ? 'text' : 'password'} 
                        fullWidth
                        margin="normal"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <div className={styles.LogoContainer}> 
                                        <div className={styles.lockIcon}></div>
                                    </div>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '2vh', 
                                backgroundColor: '#AFAFAF40', 
                            },
                        }}
                    />
                </div>
            </Box>
            <Box className={styles.buttonContainer}>
                <Button className={styles.buttonModal} variant="contained" color="primary" fullWidth>
                    Confirmar
                </Button>
                <Typography variant="h6" className={styles.labelRegister}>¿No tienes cuenta?</Typography>
            </Box>
        </Box>
    );
};

export default Login;