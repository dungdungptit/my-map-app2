import { Box, IconButton, Tooltip } from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteDriverDataAsync } from '../../store/reducers/driverSlice';

const DriverAction = ({ params }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onPreview = (e) => {
        const currentRow = params.row;
        navigate(`/drivers/${currentRow.id}`, { state: currentRow });
    };

    const onEdit = (e) => {
        const driver = params.row;
        navigate(`/drivers/edit/${driver.id}`, { state: driver });
    };

    const onDelete = (e) => {
        const driverId = params.row.id;
        dispatch(deleteDriverDataAsync(driverId))
        window.location.reload();
    };
    return (
        <Box >
            <Tooltip title="View driver details">
                <IconButton onClick={onPreview}>
                    <PreviewIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Edit this driver">
                <IconButton onClick={onEdit}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete this driver">
                <IconButton onClick={onDelete}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </Box>
    )
}

export default DriverAction