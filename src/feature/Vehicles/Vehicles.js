import { vehicles } from '../../api/vehicle/vehicles';
import { DataTable } from '../../components/DataTable';

// @mui
import { Typography, Box, Stack, Button, Breadcrumbs, Link } from '@mui/material';
import { Fragment, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { 
    vehiclesSelector,
    getVehiclesDataAsync,
    deleteVehicleDataAsync,
} from '../../store/reducers/vehicleSlice';
import { useState } from 'react';

// import data
// import { problems } from '../../data/problems';

const Vehicles = () => {

    const vehicles = useSelector(vehiclesSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVehiclesDataAsync());
    }, [dispatch]);

    const user = JSON.parse(localStorage.getItem('user'));
    const location = useLocation();

    // Click render ProblemItem
    const navigate = useNavigate();

    const handleRowClick = (param, event) => {
        console.log("Row:");
        console.log(param);
        console.log(event);
        console.log(location.pathname);
        navigate(`/vehicles/${param.row.id}`, { state: param.row });

    };

    const columns = [
        { field: 'id', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'ID', minWidth: 70, sortable: false, },
        {
            field: 'plate', headerClassName: 'super-app-theme--header', headerName: 'License Plate', minWidth: 150, flex: 1, sortable: false,
            renderCell: (params) => (
                <Link sx={{ cursor: "pointer" }} onClick={() => handleRowClick(params)}>{params.value}</Link>
            ),
        },
        { field: 'model', headerClassName: 'super-app-theme--header', headerName: 'Model', minWidth: 200 },
        { field: 'angle', headerClassName: 'super-app-theme--header', headerName: 'Angle', minWidth: 100, sortable: false },
        { field: 'latitude', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Latitude', minWidth: 150, flex: 1, sortable: false },
        { field: 'longitude', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Longitude', minWidth: 150, flex: 1, sortable: false },
        { field: 'status', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Status', minWidth: 100, sortable: true },
        {
            field: 'action', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Action', flex: 1, minWidth: 200, sortable: false,
            renderCell: (params) => {
                const onClick = (e) => {
                    const currentRow = params.row;
                    return alert(JSON.stringify(currentRow, null, 4));
                };

                const onEdit = (e) => {
                    const vehicle = params.row;
                    navigate(`/vehicles/edit/${vehicle.id}`, { state: vehicle });
                };

                const onDelete = (e) => {
                    const vehicleId = params.row.id;
                    dispatch(deleteVehicleDataAsync(vehicleId))
                    window.location.reload();
                };

                return (
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="warning" size="small" onClick={onEdit}>Edit</Button>
                        <Button variant="contained" color="error" size="small" onClick={onDelete}>Delete</Button>
                    </Stack>
                );
            },
        },
    ];

    return (
        <Fragment>
            <Box sx={{
                height: 'auto',
                py: 4,
                pt: 6,
                px: 2,
                maxWidth: 1200,
                margin: '0 auto',
            }} >
                <Box
                    sx={{
                        height: 300,
                        width: '100%',
                        '& .super-app-theme--header': {
                            // backgroundColor: '#ececec',
                        },
                        '& .css-1jbbcbn-MuiDataGrid-columnHeaderTitle': {
                            fontWeight: '600',
                        }
                    }}
                >
                    <Stack direction='row'
                        sx={{
                            py: { xs: 1, md: 3 },
                            pt: { xs: 0, md: 0 },
                            px: 0,
                            justifyContent: {
                                xs: "center",
                                sm: "space-between",
                                md: "space-between",
                                lg: "space-between",
                            },
                            alignItems: {
                                xs: "space-between",
                                sm: "center",
                                md: "center",
                                lg: "center",
                            },
                            flexDirection: {
                                xs: "column",
                                sm: "row",
                                md: "row",
                                lg: "row",
                            },
                        }}>
                        <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom>
                            Vehicles
                            <Breadcrumbs maxItems={2} aria-label="breadcrumb" sx={{ mt: 1 }}>
                                <Link underline="hover" color="inherit" href="">
                                    Home
                                </Link>
                                <Typography color="text.primary">Vehicles</Typography>
                            </Breadcrumbs>
                        </Typography>

                        {/* Add custom button to the toolbar */}
                        {/* a link to /problems/Add */}
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => navigate('/vehicles/add')}
                        >
                            New vehicle
                        </Button>
                    </Stack>


                    <DataTable rows={vehicles} columns={columns} />
                </Box>
            </Box>
        </Fragment >
    )
}

export default Vehicles
