// @mui
import { Typography, Box, Stack, Button, Breadcrumbs, Link } from '@mui/material';
import { Fragment, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { DataTable } from '../../components/DataTable';
import { binsSelector, getBinsDataAsync } from '../../store/reducers/binSlice';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const Bins = () => {
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
        { field: 'id', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'ID', minWidth: 70, sortable: false, },
        {
            field: 'name', headerClassName: 'super-app-theme--header', headerName: 'Detail', minWidth: 100, flex: 1, sortable: false,
            renderCell: (params) => (
                <Link sx={{ cursor: "pointer" }} onClick={() => handleRowClick(params)}>View</Link>
            ),
        },
        { field: 'weight', headerClassName: 'super-app-theme--header', headerName: 'Weight', minWidth: 100 },
        { field: 'maxWeight', headerClassName: 'super-app-theme--header', headerName: 'Max Weight', minWidth: 100, sortable: false },
        { field: 'latitude', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Latitude', minWidth: 150, flex: 1, sortable: true },
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
                    navigate(`/bins/edit/${params.row.id}`, { state: params.row });
                };

                const onDelete = (e) => {
                    const currentRow = params.row;
                    return alert(JSON.stringify(currentRow, null, 4));
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
                            Bins
                            <Breadcrumbs maxItems={2} aria-label="breadcrumb" sx={{ mt: 1 }}>
                                <Link underline="hover" color="inherit" href="">
                                    Home
                                </Link>
                                <Typography color="text.primary">Bins</Typography>
                            </Breadcrumbs>
                        </Typography>

                        {/* Add custom button to the toolbar */}
                        {/* a link to /problems/Add */}
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => navigate('/bins/add')}
                        >
                            New bin
                        </Button>
                    </Stack>


                    <DataTable rows={bins} columns={columns} />
                </Box>
            </Box>
        </Fragment >
    )
}

export default Bins