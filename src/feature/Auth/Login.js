import { Box, Button, TextField, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import { Stack } from '@mui/system'
import { React, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginAsync } from '../../store/reducers/authSlice'

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, setUser] = useState({
        phone: '',
        password: ''
    })

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(loginAsync(user))

        // localStorage.setItem('user', JSON.stringify(user))
        navigate('/')
    }

    const onChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                backgroundColor: '#f5f5f5'
            }}
        >
            <MapContainer center={[21.023396, 105.850094]} zoom={13} style={{ height: "inherit" }}>
                <TileLayer
                    attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
                />
            </MapContainer>


            <Stack spacing={3} sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 401,
                height: 'auto',
                maxWidth: 480,
                width: '100%',
                margin: '0 auto',
                p: "48px 64px",
                bgcolor: '#fff',
                borderRadius: 4,
            }}>
                <Box component='form' noValidate autoComplete="off" onSubmit={onSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: 'auto',
                    }}
                >
                    <Typography variant='h4' sx={{ fontWeight: 600, color: '#000', textAlign: 'center', fontSize: "1.5rem", mb: 4 }}>Signin to Map</Typography>
                    <TextField id="outlined-basic" sx={{ width: "100%", mb: 2 }} label="Phone" variant="outlined" name='phone' value={user.phone} onChange={onChange} />
                    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            value={user.password}
                            onChange={onChange}
                            endAdornment={
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
                            }
                            label="Password"
                        />
                    </FormControl>
                    <Typography variant='body2' component="a" sx={{ cursor: "pointer", "&:hover": { color: '#000' }, width: "100%", color: '#000', fontSize: "0.875rem", my: 2, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                        Forgot password?
                    </Typography>
                    <Button variant="contained" sx={{
                        width: "100%", bgcolor: '#212b36', color: '#fff', textDecoration: 'none',
                        fontWeight: 700,
                        height: 48,
                        p: "8px 22px",
                        fonSize: 15,
                        "&:hover": {
                            bgcolor: "#212b36"
                        },
                        textTransform: "capitalize"
                    }} type='submit'>Login</Button>
                </Box>
            </Stack>
        </Box>
    )
}

export default Login