import { Box, Breadcrumbs, Button, Link, Paper, Stack, Typography, TextField } from '@mui/material';
import React, { useEffect, Fragment, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch } from 'react-redux';

import {
    postBinDataAsync,
    putBinDataAsync,
    getBinDataById
} from '../../store/reducers/binSlice';
import { assetUrl } from '../../ultils/axiosApi';

const BinItemNew = ({ state }) => {
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
    // convert binId to number
    const binId = parseInt(params.binId);

    const [binItem, setBinItem] = useState(
        {
            id: 0,
            areaId: 0,
            latitude: 0,
            longitude: 0,
            address: "",
            heigth: 0,
            weight: 0,
            maxWeight: 0,
            status: '',
            image: "",
        }
    );

    const dispatch = useDispatch();
    useEffect(() => {
        if (state === "edit") {
            getBinDataById(binId).then((result) => {
                console.log("Result:", result);
                setBinItem(result);
            });
        }
    }, [])

    console.log("BinItem:", binItem);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBinItem({ ...binItem, [name]: value });
    }

    const handleInputChangeImage = (event) => {
        const { name, value } = event.target;
        setBinItem({ ...binItem, [name]: URL.createObjectURL(event.target.files[0]) });
    }

    const handleSave = (event) => {
        event.preventDefault();
        const formBin = document.getElementById("formBin");
        const formData = new FormData(formBin);
        if (state === "new") {
            dispatch(postBinDataAsync(formData));
        }
        else if (state === "edit") {
            dispatch(putBinDataAsync({ formData, binId }));
        }
        navigate("/bins");
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
                            {state === "new" ? "Create new bin" : "Edit bin"}
                            <Breadcrumbs maxItems={3} aria-label="breadcrumb" sx={{ mt: 1 }}>
                                <Link underline="hover" color="inherit" href="">
                                    Home
                                </Link>
                                <Link underline="hover" color="inherit" href="/bins">
                                    Bins
                                </Link>
                                <Typography color="text.primary">{state === "new" ? "New bin" : `ID: ${binItem.id}`}</Typography>
                            </Breadcrumbs>
                        </Typography>

                        {/* Edit problem item */}
                    </Stack>

                    {/*  form multipart */}
                    <Stack id='formBin' direction="row" alignItems="flex-start" justifyContent="space-between" component="form" noValidate autoComplete="off" encType="multipart/form-data" sx={{
                        gap: 3,
                        flexDirection: { xs: 'column', md: 'row' },
                    }}
                        onSubmit={handleSave}
                    >
                        <Paper sx={{ mt: 3, p: 2, flexGrow: 1, maxWidth: 1200 }}>
                            <Box sx={{ width: '100%', mt: 2 }}>
                                <Typography variant="h6" component="h3" fontWeight='bold' gutterBottom>
                                    Bin information
                                </Typography>
                                <TextField id="outlined-basic" label="Area ID" variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={binItem.areaId} onChange={handleInputChange} name="areaId" />
                                <TextField id="outlined-basic" label="Address" variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={binItem.address} onChange={handleInputChange} name="address" />
                                <TextField id="outlined-basic" label="Height" variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={binItem.heigth} onChange={handleInputChange} name="heigth" />
                                <TextField id="outlined-basic" label="Weight" variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={binItem.weight} onChange={handleInputChange} name="weight" />
                                <TextField id="outlined-basic" label="Max Weight" variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={binItem.maxWeight} onChange={handleInputChange} name="maxWeight" />

                            </Box>


                            {/* chosse image file and preview */}


                        </Paper>

                        <Box sx={{ mt: 2, minWidth: 300, width: "100%", maxWidth: { xs: '100%', md: 300 } }}>
                            <Paper sx={{ width: '100%', my: 1, p: 2, pt: 4 }}>
                                <Typography variant="h6" component="h3" fontWeight='bold' gutterBottom>
                                    Status
                                </Typography>
                                <TextField id="outlined-basic" label="Status" variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={binItem.status} onChange={handleInputChange} name="status" />


                                <Typography variant="h6" component="h3" fontWeight='bold' gutterBottom>
                                    Position
                                </Typography>
                                <TextField id="outlined-basic" label="Latitude" variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={binItem.latitude} onChange={handleInputChange} name="latitude" />
                                <TextField id="outlined-basic" label="Longitude" variant="outlined" sx={{ width: '100%', mb: 2 }} value={binItem.longitude} onChange={handleInputChange} name="longitude" />

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
                                        {state === "new" && binItem.image && <img src={binItem.image} alt="bin" width="220" height="220" />}
                                        {state === "edit" && <img src={click ? `${binItem.image}` : `${assetUrl}${binItem.image}`} alt="bin" width={220} height={220} />}
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

export default BinItemNew