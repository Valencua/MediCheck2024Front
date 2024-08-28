import React, {useState} from 'react';
import styles from './SignIn.module.css';
import './SignIn.css';
import {useRouter} from "next/router";
import { TextField, Button, Box, Typography, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SignIn = () => {

    const router = useRouter();
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState(''); 
    const [showPassword, setShowPassword] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try{
            const res = await fetch('https://medicheckapi.vercel.app/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombreUsuario: name,
                    correoElectronico: email,
                    contraseña: pass
                })
            });

            const data = await res.json();
        
            if (res.ok) {
                localStorage.setItem('token', data.token);
                router.push('/calendar');
            } else {
                setError(data.message);
            }
        }catch(e){
            console.log(e.message)
        }
        
      };
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <Box className={styles.loginContainer}> 
            <Box className={styles.containerWithBordersTitle}>
                <Typography variant="h2" className={styles.modalTitle}>REGISTRO</Typography>
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
            <Box className={styles.containerWithBordersName}>
                <div className={styles.containerUserLabel}>
                    <Typography variant="h6" className={styles.labelUser}>Mail</Typography>
                </div>
                <div className={styles.containerUserInputUser}>
                    <TextField
                        className={styles.nameInput}
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email}
                        fullWidth
                        margin="normal"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <div className={styles.LogoContainer}> 
                                        <div className={styles.mailLogo}></div>
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
            <Box className={styles.buttonContainer}>
                <Button className={styles.buttonModal} variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                    Confirmar
                </Button>
                <Typography variant="h6" className={styles.labelRegister} onClick={() => router.back()}>¿Ya tienes cuenta?</Typography>
            </Box>
        </Box>
    );
};

export default SignIn;
