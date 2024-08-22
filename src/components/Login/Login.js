import React, {useState} from 'react';
import styles from './Login.module.css';
import {useRouter} from "next/router";
import {Modal, TextField, Button, IconButton, Box, Typography, Icon} from '@mui/material';

const Login = () => {

    const router = useRouter();

    return (
        <Box className={styles.loginContainer}> 
            <Box>
                <Typography variant="h6" className={styles.modalTitle}>Login</Typography>
            </Box>
            <Box className={styles.containerWithBorders}>
                    <div className={styles.icon}></div>
            </Box>
        </Box>
    );
};

export default Login;
