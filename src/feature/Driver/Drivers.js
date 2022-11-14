// @mui
import { Typography, Box, Stack, Button, Breadcrumbs, Link } from '@mui/material';
import { Fragment, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { DataTable } from '../../components/DataTable';
import { deleteDriverDataAsync, driversSelector, getDriversDataAsync } from '../../store/reducers/driverSlice';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const Drivers = () => {
  const drivers = useSelector(driversSelector);
  console.log(drivers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDriversDataAsync());
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
    navigate(`/drivers/${param.row.id}`, { state: param.row });

  };

  const columns = [
    { field: 'id', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'ID', minWidth: 70, sortable: false, },
    {
      field: 'fullname', headerClassName: 'super-app-theme--header', headerName: 'Full Name', minWidth: 160, flex: 1, sortable: true,
      renderCell: (params) => (
        <Fragment>
          <Link sx={{ cursor: "pointer" }} onClick={() => handleRowClick(params)} variant="body2">
            {params.row.firstName} {params.row.lastName}
          </Link>
        </Fragment>
      )
    },
    { field: 'email', headerClassName: 'super-app-theme--header', headerName: 'Email', minWidth: 160, flex: 1, sortable: false },
    { field: 'firstName', headerClassName: 'super-app-theme--header', headerName: 'First Name', minWidth: 120, flex: 1, sortable: true, },
    { field: 'lastName', headerClassName: 'super-app-theme--header', headerName: 'Last Name', minWidth: 100, flex: 1, sortable: true, },
    { field: 'dob', headerClassName: 'super-app-theme--header', headerName: 'Date Of Birth', minWidth: 120, flex: 1, sortable: true, },
    { field: 'phone', headerClassName: 'super-app-theme--header', headerName: 'Phone', minWidth: 120, flex: 1, sortable: false, },
    { field: 'gender', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Gender', minWidth: 80, flex: 1, sortable: true },
    {
      field: 'action', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Action', flex: 1, minWidth: 180, sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          const currentRow = params.row;
          return alert(JSON.stringify(currentRow, null, 4));
        };

        const onEdit = (e) => {
          navigate(`/drivers/edit/${params.row.id}`, { state: params.row });
        };

        const onDelete = (e) => {
          const currentRow = params.row;
          dispatch(deleteDriverDataAsync(currentRow.id));
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
              Drivers
              <Breadcrumbs maxItems={2} aria-label="breadcrumb" sx={{ mt: 1 }}>
                <Link underline="hover" color="inherit" href="">
                  Home
                </Link>
                <Typography color="text.primary">Drivers</Typography>
              </Breadcrumbs>
            </Typography>

            {/* Add custom button to the toolbar */}
            {/* a link to /problems/Add */}
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/drivers/add')}
            >
              New driver
            </Button>
          </Stack>


          <DataTable rows={drivers} columns={columns} />
        </Box>
      </Box>
    </Fragment >
  )
}

export default Drivers