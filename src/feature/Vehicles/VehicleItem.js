import { Box, Breadcrumbs, Button, Link, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Paper, Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, Fragment } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import vehicle_img from '../Map/green-vehicle.png';

import ListIcon from '@mui/icons-material/List';
import RoomIcon from '@mui/icons-material/Room';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HeightIcon from '@mui/icons-material/Height';
import HistoryIcon from '@mui/icons-material/History';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import SignalCellular0BarIcon from '@mui/icons-material/SignalCellular0Bar';
import SpeedIcon from '@mui/icons-material/Speed';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';
import { DataGrid } from '@mui/x-data-grid';
import { assetUrl } from '../../ultils/axiosApi';
import { useState } from 'react';
import { getVehicleDataById, getVehicleStateLog } from '../../store/reducers/vehicleSlice';
import VehicleStateLog from './VehicleStateLog';

const VehicleItem = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const vehicleId = parseInt(params.vehicleId);
    

    const [vehicle, setVehicle] = useState(
        {
            latitude: 0,
            longitude: 0,
            engineHours: 0,
            engineId: 0,
            engineType: 0,
            model: "",
            altitude: 0,
            angle: 0,
            status: '',
            odometer: 0,
            plate: "",
            image: "",
        }
    );


    useEffect(() => {
        getVehicleDataById(vehicleId).then((result) => {
            console.log("Result:", result);
            setVehicle(result);
        });
    }, [])

    return (
        <Box>
            {vehicle && (
                <Fragment>
                    <Box sx={{
                        height: 'auto',
                        py: 4,
                        pt: 6,
                        px: 2,
                        maxWidth: 1200,
                        margin: '0 auto',
                    }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom>
                                Vehicle Details
                                <Breadcrumbs maxItems={3} aria-label="breadcrumb" sx={{ mt: 1 }}>
                                    <Link underline="hover" color="inherit" href="">
                                        Home
                                    </Link>
                                    <Link underline="hover" color="inherit" href="/vehicles">
                                        Vehicles
                                    </Link>
                                    <Typography color="text.primary">{vehicle.plate}</Typography>
                                </Breadcrumbs>
                            </Typography>

                            {/* Edit problem item */}

                        </Stack>

                        <Paper elevation={0} sx={{ width: { xs: "100%", sm: "100%", md: "100%", lg: "100%", }, height: "auto", p: 2, mt: 2 }}>
                            <Stack direction="row" alignItems="center" justifyContent="space-around" sx={{ mb: 2, pt: 2, flexDirection: { xs: "column", sm: "row", md: "row", lg: "row", } }}>
                                <Box sx={{ p: 2, width: '100%', maxWidth: 500 }}>
                                    <img src={`${assetUrl}${vehicle.image}`} alt={vehicle.name} width="100%" />
                                </Box>
                                <Box sx={{ py: 2, minWidth: 300, width: "100%", maxWidth: 500 }}>
                                    <Box sx={{ textAlign: 'start', mb: 1, }}>
                                        {/* status, speed, weight, latitude, longitude */}
                                        <List
                                            aria-labelledby="vehicle-list-subheader"
                                            subheader={
                                                <ListSubheader component="div" id="vehicle-list-subheader" sx={{
                                                    fontSize: '1.2rem',
                                                    fontWeight: 'bold',
                                                    color: '#000',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    pr: 0,
                                                }}>
                                                    Vehicle {vehicle.plate}
                                                    <Button
                                                        variant='contained'
                                                        aria-label="edit"
                                                        color="warning"
                                                        size="small"
                                                        startIcon={<EditIcon />}
                                                        onClick={() => navigate(`/vehicles/edit/${vehicle.id}`, { state: vehicle })}
                                                    >
                                                        Edit
                                                    </Button>
                                                </ListSubheader>
                                            }
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                height: 'auto',
                                                pb: 0,
                                                width: '100%',

                                                bgcolor: 'background.paper',
                                                "& .css-cveggr-MuiListItemIcon-root": {
                                                    minWidth: '32px',
                                                },
                                                "& .css-1pklcki-MuiListItem-root:nth-of-type(2n+1)": {
                                                    backgroundColor: '#f5f5f5',
                                                },
                                                "& .css-konndc-MuiListItemText-root": {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                },
                                            }}
                                        >
                                            <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40 }}>
                                                <ListItemIcon>
                                                    <ListIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="ID" secondary={vehicle.id} />
                                            </ListItem>
                                            <ListItem sx={{ height: 40 }}>
                                                <ListItemIcon>
                                                    <DataThresholdingIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="License Plate" secondary={vehicle.plate} />
                                            </ListItem>
                                            <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40 }}>
                                                <ListItemIcon>
                                                    <DirectionsCarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Model" secondary={vehicle.model} />
                                            </ListItem>
                                            <ListItem sx={{ height: 40 }}>
                                                <ListItemIcon>
                                                    <RoomIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Position" secondary={vehicle.latitude.toFixed(6) + ', ' + vehicle.longitude.toFixed(6)} />
                                            </ListItem>
                                            <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40 }}>
                                                <ListItemIcon>
                                                    <SignalCellular0BarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Angle" secondary={vehicle.angle + ""} />
                                            </ListItem>
                                            <ListItem sx={{ height: 40 }}>
                                                <ListItemIcon>
                                                    <SpeedIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Speed" secondary={vehicle.speed + "km/h"} />
                                            </ListItem>
                                            <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40 }}>
                                                <ListItemIcon>
                                                    <HistoryIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Engine Hours" secondary={vehicle.engineHours + ""} />
                                            </ListItem>
                                            <ListItem sx={{ height: 40 }}>
                                                <ListItemIcon>
                                                    <NetworkCheckIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Odomeder" secondary={vehicle.odometer + ""} />
                                            </ListItem>
                                            <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40 }}>
                                                <ListItemIcon>
                                                    <HeightIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Altitude" secondary={vehicle.altitude + ""} />
                                            </ListItem>

                                            <ListItem sx={{ height: 40 }}>
                                                <ListItemIcon>
                                                    <AutorenewIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Status" secondary={vehicle.status} />
                                            </ListItem>
                                        </List>
                                    </Box>
                                </Box>
                            </Stack>

                            <VehicleStateLog vehicleId={vehicleId} />
                        </Paper>
                    </Box>
                </Fragment>
            )}
        </Box>
    )
}

export default VehicleItem