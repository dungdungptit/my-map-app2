import { Box, Typography } from '@mui/material'
import { React, useState, useEffect } from 'react';
import { getDriverStateLog } from '../../store/reducers/driverSlice';
import { DataGrid } from '@mui/x-data-grid';

const DriverStateLog = ({ driverId }) => {
    const [driverStateLog, setDriverStateLog] = useState([]);

    useEffect(() => {
        getDriverStateLog(driverId).then((data) => {
            setDriverStateLog(data);
            console.log(data);
        });
    }, []);

    const columns = [
        { field: 'id', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'ID', minWidth: 70, sortable: false, },
        {
            field: 'updatedAt', headerClassName: 'super-app-theme--header', headerName: 'Time', minWidth: 200, sortable: true,
            renderCell: (params) => {
                const date = params.value.slice(0, 19).replace('T', ' ').toString();
                return (
                    <Typography sx={{ fontSize: "0.875rem" }}>
                        {date}
                    </Typography>
                );
            }
        },
        { field: 'areaId', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Area Id', minWidth: 120, flex: 1, sortable: true },
        { field: 'userId', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'User Id', minWidth: 120, flex: 1, sortable: true },
        { field: 'vehicleId', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Vehicle Id', minWidth: 120, flex: 1, sortable: true },
        { field: 'status', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Status', minWidth: 100, sortable: true },
    ];

    return (
        <Box sx={{ width: '100%', height: 400, mt: 4 }}>
            <Box sx={{ textAlign: 'start', mb: 1, mt: 4 }}>
                <Typography variant="h6" component="div" sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#000', }}>
                    Last 10 status
                </Typography>

            </Box>
            <Box sx={{ width: '100%', height: 400, mb: 2 }}>
                <DataGrid
                    rows={driverStateLog} columns={columns}
                    disableColumnMenu
                    disableColumnSelector
                    disableSelectionOnClick
                    hideFooter
                    autoHeight
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </Box>
        </Box>
    )
}

export default DriverStateLog