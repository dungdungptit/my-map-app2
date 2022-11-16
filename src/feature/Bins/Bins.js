// @mui
import { Typography, Box, Stack, Button, Breadcrumbs, Link } from '@mui/material';
import { Fragment, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { DataTable } from '../../components/DataTable';
import { binsSelector, getBinsDataAsync } from '../../store/reducers/binSlice';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import BinAction from './BinAction';
import { useTranslation } from 'react-i18next';
import { getStatus } from './constant';	


const Bins = () => {
    const { t } = useTranslation();
    const bins = useSelector(binsSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBinsDataAsync());
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
        navigate(`/bins/${param.row.id}`, { state: param.row });

    };

    const columns = [
        { field: 'id', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("bins.table.id")}`, minWidth: 70, sortable: false, },
        { field: 'areaId', headerClassName: 'super-app-theme--header', headerName: `${t("bins.table.areaId")}`, minWidth: 100 },
        {
            field: 'weight', headerClassName: 'super-app-theme--header', headerName: `${t("bins.table.weight")}`, minWidth: 100,
            renderCell: (params) => (
                `${params.value} kg`
            ),
        },
        { field: 'address', headerClassName: 'super-app-theme--header', headerName: `${t("bins.table.address")}`, flex: 1, minWidth: 200, sortable: false },
        { field: 'latitude', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("bins.table.latitude")}`, minWidth: 100, flex: 1, sortable: true },
        { field: 'longitude', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("bins.table.longitude")}`, minWidth: 100, flex: 1, sortable: false },
        {
            field: 'status', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("bins.table.status")}`, minWidth: 100, sortable: true,
            renderCell: (params) => {
                const status = getStatus(params.value);

                return (
                    `${t("bins.table." + status)}`
                );
            }
        },
        {
            field: 'action', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("bins.table.action")}`, flex: 1, minWidth: 150, sortable: false,
            renderCell: (params) => (
                <BinAction params={params} />
            )
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
                            {t("bins.pageName")}
                            <Breadcrumbs maxItems={2} aria-label="breadcrumb" sx={{ mt: 1 }}>
                                <Link underline="hover" color="inherit" href="">
                                    {t("bins.home")}
                                </Link>
                                <Typography color="text.primary">
                                    {t("bins.pageName")}
                                </Typography>
                            </Breadcrumbs>
                        </Typography>

                        {/* Add custom button to the toolbar */}
                        {/* a link to /problems/Add */}
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => navigate('/bins/add')}
                        >
                            {t("bins.add")}
                        </Button>
                    </Stack>


                    <DataTable rows={bins} columns={columns} />
                </Box>
            </Box>
        </Fragment >
    )
}

export default Bins