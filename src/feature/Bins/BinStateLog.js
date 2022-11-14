import { Box, Typography } from '@mui/material'
import { React, useState, useEffect } from 'react';
import { getBinStateLog } from '../../store/reducers/binSlice';
import { DataGrid } from '@mui/x-data-grid';

const BinStateLog = ({ binId }) => {
    const [binStateLog, setBinStateLog] = useState([]);

    useEffect(() => {
        getBinStateLog(binId).then((data) => {
            setBinStateLog(data);
            console.log(data);
        });
    }, []);

    const columns = [
        { field: 'id', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'ID', minWidth: 70, sortable: false, },
        { field: 'description', headerClassName: 'super-app-theme--header', headerName: 'Description', minWidth: 200, },
        {
            field: 'updatedAt', headerClassName: 'super-app-theme--header', headerName: 'Time', minWidth: 200, sortable: false,
            renderCell: (params) => {
                const date = params.value.slice(0, 19).replace('T', ' ').toString();
                return (
                    <Typography sx={{ fontSize: "0.875rem" }}>
                        {date}
                    </Typography>
                );
            }
        },
        { field: 'latitude', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Latitude', minWidth: 150, flex: 1, sortable: false },
        { field: 'longitude', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Longitude', minWidth: 150, flex: 1, sortable: false },
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
                    rows={binStateLog} columns={columns}
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

export default BinStateLog