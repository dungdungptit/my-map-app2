import { Box, Breadcrumbs, Button, Link, Paper, Stack, Typography, TextField } from '@mui/material';
import React, { useEffect, Fragment, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch } from 'react-redux';

import {
    postVehicleDataAsync,
    putVehicleDataAsync,
    getVehicleDataById
} from '../../store/reducers/vehicleSlice';
import { assetUrl } from '../../ultils/axiosApi';

const VehicleItemNew = ({ state }) => {
    // state = "new" or "edit"
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    console.log("Params:", params);
    console.log("Location:", location);

    let [click, setClick] = useState(false);

    const handleClick = (e) => {
        setClick(true);
    }
    // convert vehicleId to number
    const vehicleId = parseInt(params.vehicleId);

    const [vehicleItem, setVehicleItem] = useState(
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

    const dispatch = useDispatch();
    useEffect(() => {
        if (state === "edit") {
            getVehicleDataById(vehicleId).then((result) => {
                console.log("Result:", result);
                setVehicleItem(result);
            });
        }
    }, [])

    console.log("VehicleItem:", vehicleItem);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setVehicleItem({ ...vehicleItem, [name]: value });
    }

    const handleInputChangeImage = (event) => {
        const { name, value } = event.target;
        setVehicleItem({ ...vehicleItem, [name]: URL.createObjectURL(event.target.files[0]) });
    }

    const handleSave = (event) => {
        event.preventDefault();
        const formVehicle = document.getElementById("formVehicle");
        const formData = new FormData(formVehicle);
        if (state === "new") {
            dispatch(postVehicleDataAsync(formData));
        }
        else if (state === "edit") {
            dispatch(putVehicleDataAsync({formData, vehicleId}));
        }
        navigate("/vehicles");
    }

    return (
        <Box>
            <Fragment>
                <Box sx={{
                    height: 'auto',
                    py: 4,
                    pt: 6,
                    px: 2,
                    maxWidth: 1200,
                    margin: '0 auto',
                }}>
                    <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
                        <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom>
                            {state === "new" ? "Create new vehicle" : "Edit vehicle"}
                            <Breadcrumbs maxItems={3} aria-label="breadcrumb" sx={{ mt: 1 }}>
                                <Link underline="hover" color="inherit" href="">
                                    Home
                                </Link>
                                <Link underline="hover" color="inherit" href="/vehicles">
                                    Vehicles
                                </Link>
                                <Typography color="text.primary">{state === "new" ? "New vehicle" : `${vehicleItem.plate}`}</Typography>
                            </Breadcrumbs>
                        </Typography>

                        {/* Edit problem item */}
                    </Stack>

                    {/*  form multipart */}
                    <Stack id='formVehicle' direction="row" alignItems="flex-start" justifyContent="space-between" component="form" noValidate autoComplete="off" encType="multipart/form-data" sx={{
                        gap: 3,
                        flexDirection: { xs: 'column', md: 'row' },
                    }}
                        onSubmit={handleSave}
                    >
                        <Paper sx={{ mt: 3, p: 2, flexGrow: 1, maxWidth: 1200 }}>
                            <Box sx={{ width: '100%', mt: 2 }}>
                                <Typography variant="h6" component="h3" fontWeight='bold' gutterBottom>
                                    Vehicle information
                                </Typography>
                                <TextField id="outlined-basic" label="Plate" variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} onChange={handleInputChange} name="plate" value={vehicleItem ? vehicleItem.plate : ""} />
                                <TextField id="outlined-basic" label="Engine ID" variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={vehicleItem.engineId} onChange={handleInputChange} name="engineId" />
                                <TextField id="outlined-basic" label="Engine type" variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={vehicleItem.engineType} onChange={handleInputChange} name="engineType" />
                                <TextField id="outlined-basic" label="Engine hours" variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={vehicleItem.engineHours} onChange={handleInputChange} name="engineHours" />
                                <TextField id="outlined-basic" label="Model" variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={vehicleItem.model} onChange={handleInputChange} name="model" />
                                <TextField id="outlined-basic" label="Odometer" variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={vehicleItem.odometer} onChange={handleInputChange} name="odometer" />
                                <TextField id="outlined-basic" label="Altitude" variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={vehicleItem.altitude} onChange={handleInputChange} name="altitude" />

                            </Box>


                            {/* chosse image file and preview */}


                        </Paper>

                        <Box sx={{ mt: 2, minWidth: 300, width: "100%", maxWidth: { xs: '100%', md: 300 } }}>
                            <Paper sx={{ width: '100%', my: 1, p: 2, pt: 4 }}>
                                <Typography variant="h6" component="h3" fontWeight='bold' gutterBottom>
                                    Status
                                </Typography>
                                <TextField id="outlined-basic" label="Status" variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={vehicleItem.status} onChange={handleInputChange} name="status" />


                                <Typography variant="h6" component="h3" fontWeight='bold' gutterBottom>
                                    Position
                                </Typography>
                                <TextField id="outlined-basic" label="Latitude" variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={vehicleItem.latitude} onChange={handleInputChange} name="latitude" />
                                <TextField id="outlined-basic" label="Longitude" variant="outlined" sx={{ width: '100%', mb: 2 }} value={vehicleItem.longitude} onChange={handleInputChange} name="longitude" />
                                <TextField id="outlined-basic" label="Angle" variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={vehicleItem.angle} onChange={handleInputChange} name="angle" />

                                <Box sx={{ width: '100%', mb: 2 }}>
                                    <Typography variant="h6" component="h3" fontWeight='bold' gutterBottom>
                                        Image
                                    </Typography>
                                    <label htmlFor="contained-button-file">
                                        <Button variant="contained" component="span"
                                            endIcon={<AttachFileIcon />}
                                            onClick={(e) => handleClick()}
                                        >
                                            Upload
                                        </Button>
                                    </label>
                                    <input accept="image/*" id="contained-button-file" type="file" onChange={handleInputChangeImage} name="image" style={{ display: "none" }} />

                                    <Box sx={{ width: '100%', mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        {state === "new" && vehicleItem.image && <img src={vehicleItem.image} alt="vehicle" width="220" height="220" />}
                                        {state === "edit" && <img src={click ? `${vehicleItem.image}` : `${assetUrl}${vehicleItem.image}`} alt="vehicle" width={220} height={220} />}
                                    </Box>
                                </Box>
                            </Paper>

                            <Box sx={{ width: '100%', my: 1 }}>
                                <Button variant="contained" color="primary" endIcon={<SaveIcon />} sx={{ width: '100%', mb: 2, mt: 1, py: 1.5 }} type="submit">
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    </Stack>



                </Box>
            </Fragment >
        </Box >
    )
}

export default VehicleItemNew