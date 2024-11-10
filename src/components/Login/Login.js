import React, { useState } from 'react';
import styles from './Login.module.css';
import './Login.css';
import { useRouter } from "next/router";
import { TextField, Button, Box, Typography, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { signInWithPopup, auth, provider, signInWithEmailAndPassword } from '../../utils/firebase';
import { createTheme } from '@mui/material/styles';

async function loginWithFirebase(email, password) {
    debugger
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user?.getIdToken();
    return token;
}

const Login = () => {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#FF5733',
            },
            secondary: {
                main: '#E0C2FF',
                light: '#F5EBFF',
                contrastText: '#47008F',
            },
            error: {
                main: '#FF0000',
            },
        },
    });

    const router = useRouter();
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [passError, setPassError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const idToken = await user.getIdToken();
            const res = await fetch('https://medicheckapi.vercel.app/login-google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tokenId: idToken
                })
            });
        
            const data = await res.json();
        
            if (res.ok) {
                localStorage.setItem('token', data.token);
                router.push('/calendar');
            } else {
                setErrorMessage(data.message);
            }   
        } catch (error) {
            console.error(error);
            setErrorMessage('An error occurred during sign in');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        setNameError(false);
        setPassError(false);
        setErrorMessage('');

        if (!name) {
            setNameError(true);
            setErrorMessage('Ingrese nombre');
            return;
        }

        if (!pass) {
            setPassError(true);
            setErrorMessage('Ingrese contraseña');
            return;
        }

        try {
            const authToken = await loginWithFirebase(name, pass)
            const res = await fetch('https://medicheckapi.vercel.app/login', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                 },
                body: JSON.stringify({
                    correoElectronico: name,
                    contraseña: pass
                })
            });
        
            const data = await res.json();
        
            if (res.ok) {
                localStorage.setItem('token', authToken);
                router.push('/calendar');
            } else {
                setNameError(true);
                setPassError(true);
                setErrorMessage(data.message || 'Credenciales inválidas');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('An error occurred during login');
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    const goToRegister = () => {
        router.push({
            pathname: '/signin',     
        });
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
            <Box className={`${styles.containerWithBordersName} ${nameError ? styles.inputIncorrect : ''}`}>
                <div className={styles.containerUserLabel}>
                    <Typography variant="h6" className={`${styles.labelUser} ${nameError ? styles.inputIncorrect : ''}`}>Nombre Completo</Typography>
                </div>
                <div className={styles.containerUserInputUser}>
                    <TextField
                        className={`${styles.nameInput}`} 
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        fullWidth
                        margin="normal"
                        error={nameError}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <div className={`${styles.LogoContainer} ${nameError ? styles.error : ''}`}> 
                                        <div className={`${styles.userLogo}`}></div>
                                    </div>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '2vh',
                                backgroundColor: nameError ? '#FFCCCC' : '#AFAFAF40',
                            },
                        }}
                    />
                </div>
            </Box>
            <Box className={`${styles.containerWithBordersPassword} ${passError ? styles.inputIncorrect : ''}`}>
                <div className={styles.containerUserLabel}>
                    <Typography variant="h6" className={`${styles.labelUser} ${passError ? styles.inputIncorrect : ''}`}>Contraseña</Typography>
                </div>
                <div className={styles.containerUserInputUser}>
                    <TextField
                        className={`${styles.nameInput}`}
                        onChange={(e) => setPass(e.target.value)}
                        value={pass}
                        type={showPassword ? 'text' : 'password'} 
                        fullWidth
                        margin="normal"
                        error={passError}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <div className={`${styles.LogoContainer} ${passError ? styles.error : ''}`}> 
                                        <div className={`${styles.lockIcon}`}></div>
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
                                backgroundColor: passError ? '#FFCCCC' : '#AFAFAF40', 
                            },
                        }}
                    />
                </div>
            </Box>
            <Typography color="error" align="center" style={{ marginTop: '10px', opacity: errorMessage ? 1 : 0}}>
                    {errorMessage}
            </Typography>
            <Box className={styles.buttonContainer}>
                <Button className={styles.buttonGoogleModal} variant="contained" color="primary" onClick={handleSignIn} fullWidth>
                    <div className={styles.LogoGoogle}></div>
                    Login with Google
                </Button>
                <Button className={styles.buttonModal} variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                    Confirmar
                </Button>
                <Typography variant="h6" className={styles.labelRegister} onClick={goToRegister}>¿No tienes cuenta?</Typography>
            </Box>
        </Box>
    );
};

export default Login;