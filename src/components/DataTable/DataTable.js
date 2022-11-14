import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const DataTable = ({ rows, columns }) => {
    let pageSize = rows.length;
    if (pageSize < 10) {
        pageSize = 10;
    }
    const navigate = useNavigate();
    const location = useLocation();

    // const handleRowClick = (param, event) => {
    //     console.log("Row:");
    //     console.log(param);
    //     console.log(event);
    //     const item = { 
    //         pathname: location.pathname + "/" + param.row.id,
    //         item: param.row
    //     };

    //     navigate(`${item.pathname}`, { state: item });
    // };

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => {
                return row.id;
            }}
            // onRowClick={handleRowClick}
            disableColumnMenu
            disableColumnSelector
            disableSelectionOnClick
            // hideFooter
            autoHeight
            pageSize={10}
            rowsPerPageOptions={[10]}
            // disableColumnFilter
            // disableDensitySelector
            components={{ Toolbar: GridToolbar }}
            componentsProps={{
                toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                },
            }}
            sx={{

                // '& .MuiDataGrid-row': { cursor: 'pointer' },
                "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
                    outline: "none"
                },
                '& .css-1j9kmqg-MuiDataGrid-toolbarContainer': {
                    padding: '12px 16px 8px',
                    borderBottom: '1px solid #e0e0e0',
                },
                '& .css-c63i49-MuiInputBase-input-MuiInput-input': {
                    padding: '8px 0px',
                    fontSize: '0.875rem',
                    lineHeight: '1.25rem',
                    fontWeight: '400',
                    letterSpacing: '0.01071em',
                },
                '& .css-levciy-MuiTablePagination-displayedRows': {
                    mb: 0
                },
            }}
        // rowCount={100}
        />

    )
}

export default DataTable