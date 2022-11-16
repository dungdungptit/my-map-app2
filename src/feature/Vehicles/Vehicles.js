
// @mui
import { Typography, Box, Stack, Button, Breadcrumbs, Link } from '@mui/material';
import { Fragment, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {
    vehiclesSelector,
    getVehiclesDataAsync,
} from '../../store/reducers/vehicleSlice';

import { DataTable } from '../../components/DataTable';
import VehicleAction from './VehicleAction';
import { useTranslation } from 'react-i18next';


const Vehicles = () => {
    const { t } = useTranslation();
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
        { field: 'id', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("vehicles.table.id")}`, minWidth: 70, sortable: false, },
        { field: 'plate', headerClassName: 'super-app-theme--header', headerName: `${t("vehicles.table.plate")}`, minWidth: 150, flex: 1, sortable: false, },
        { field: 'model', headerClassName: 'super-app-theme--header', headerName: `${t("vehicles.table.model")}`, minWidth: 200 },
        { field: 'angle', headerClassName: 'super-app-theme--header', headerName: `${t("vehicles.table.angle")}`, minWidth: 100, sortable: false },
        { field: 'latitude', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("vehicles.table.latitude")}`, minWidth: 150, flex: 1, sortable: false },
        { field: 'longitude', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("vehicles.table.longitude")}`, minWidth: 150, flex: 1, sortable: false },
        { field: 'status', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("vehicles.table.status")}`, minWidth: 100, sortable: true },
        {
            field: 'action', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("vehicles.table.action")}`, flex: 1, minWidth: 150, sortable: false,
            renderCell: (params) => (
                <VehicleAction {...{params}} />
            ),
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
                        // height: 300,
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
                            {t("vehicles.pageName")}
                            <Breadcrumbs maxItems={2} aria-label="breadcrumb" sx={{ mt: 1 }}>
                                <Link underline="hover" color="inherit" href="">
                                    {t("vehicles.home")}
                                </Link>
                                <Typography color="text.primary">
                                    {t("vehicles.pageName")}
                                </Typography>
                            </Breadcrumbs>
                        </Typography>

                        {/* Add custom button to the toolbar */}
                        {/* a link to /problems/Add */}
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => navigate('/vehicles/add')}
                        >
                            {t("vehicles.add")}
                        </Button>
                    </Stack>


                    <DataTable rows={vehicles} columns={columns} />
                </Box>
            </Box>
        </Fragment >
    )
}

export default Vehicles
