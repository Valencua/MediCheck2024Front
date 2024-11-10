import React, {useState} from 'react';
import styles from './SignIn.module.css';
import './SignIn.css';
import {useRouter} from "next/router";
import { TextField, Button, Box, Typography, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { signInWithPopup, auth, provider, createUserWithEmailAndPassword } from '../../utils/firebase';

async function registerWithFirebase(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user?.getIdToken();
        return token;
    } catch (error) {
        console.error("Registration error:", error);
        throw error;
    }
}


const SignIn = () => {

    const router = useRouter();
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState(''); 
    const [rol, setRol] = useState(''); 
    const [showPassword, setShowPassword] = useState(false); 

    const handleSignIn = async () => {
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
    
          // Get the ID token
          const idToken = await user.getIdToken();
          const res = await fetch('http://localhost:3000/login-google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tokenId: idToken
                })
            });
        
            const data = await res.json();
        
            if (res.ok) {
                // Save the token in localStorage or cookies and redirect to the protected page
                localStorage.setItem('token', data.token);
                router.push('/calendar');
            } else {
                // Display an error message
                setError(data.message);
            }   
        } catch (error) {
          console.error(error);
        }
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userToken = await registerWithFirebase(email, pass)
        try{
            const res = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    nombreUsuario: name,
                    correoElectronico: email,
                    contraseña: pass, 
                    rol
                })
            });

            const data = await res.json();
        
            if (res.ok) {
                localStorage.setItem('token', userToken);
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
    
    const handleSetRolAsPatient = () => {
        setRol("patient"); 
    };
    const handleSetRolAsDoctor = () => {
        setRol("doctor"); 
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
            <Box className={styles.buttonContainer2}>
                <Button className={styles.buttonPaciente} variant="contained" color="primary" onClick={handleSetRolAsPatient} fullWidth>
                    Paciente
                </Button>
                <Button className={styles.buttonMedico} variant="contained" color="primary" onClick={handleSetRolAsDoctor} fullWidth>
                    Médico
                </Button>
            </Box>
            <Box className={styles.buttonContainer3}>
            <Button className={styles.buttonGoogleModal} variant="contained" color="primary" onClick={handleSignIn} fullWidth><div className={styles.LogoGoogle}></div>
                    Register with Google
                </Button>
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
