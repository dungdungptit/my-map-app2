import * as React from 'react';
import Button from '@mui/material/Button';

import CloseIcon from '@mui/icons-material/Close';

import { Box, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import ListIcon from '@mui/icons-material/List';
import RoomIcon from '@mui/icons-material/Room';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HeightIcon from '@mui/icons-material/Height';
import HistoryIcon from '@mui/icons-material/History';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import SignalCellular0BarIcon from '@mui/icons-material/SignalCellular0Bar';
import SpeedIcon from '@mui/icons-material/Speed';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';
import PropTypes from 'prop-types';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ height: '225px' }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function TabPanelItem({ open, handleClose, item }) {
    console.log(item);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (item.type === 'vehicle') {
        return (
            <Box sx={{ width: '100%', height: "inherit" }}>
                <CloseIcon
                    sx={{
                        position: 'absolute',
                        top: '12px',
                        right: '4px',
                        fontSize: '28px',
                        color: '#6f6f6f',
                        cursor: 'pointer',
                        zIndex: 401,
                    }}
                    onClick={handleClose}
                />
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Vehicle" {...a11yProps(0)} />
                        <Tab label="Driver" {...a11yProps(1)} />
                        <Tab label="Events" {...a11yProps(2)} />
                        <Tab label="Send require" {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Box>
                        <List
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                flexWrap: 'wrap',
                                height: 230,
                                pb: 0,
                                maxWidth: 600,
                                overflowX: 'hide',
                                overflowY: 'auto',
                                "& .css-cveggr-MuiListItemIcon-root": {
                                    minWidth: '32px',
                                },
                                "& .css-1pklcki-MuiListItem-root:nth-of-type(2n+1)": {
                                    backgroundColor: '#f5f5f5',
                                },
                                "& .css-konndc-MuiListItemText-root": {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                },
                                "& .css-10hburv-MuiTypography-root": {
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    color: '#6f6f6f',
                                },
                                "& .css-83ijpv-MuiTypography-root": {
                                    fontSize: '12px',
                                    color: '#6f6f6f',
                                }

                            }}
                        >
                            {/* for in item */}
                            {item.type === 'vehicle' && (
                                <>
                                    <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40, width: 280 }}>
                                        <ListItemIcon>
                                            <ListIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="ID" secondary={item.id} />
                                    </ListItem>
                                    <ListItem sx={{ height: 40, width: 280 }}>
                                        <ListItemIcon>
                                            <DataThresholdingIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="License Plate" secondary={item.plate} />
                                    </ListItem>
                                    <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40, width: 280 }}>
                                        <ListItemIcon>
                                            <DirectionsCarIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Model" secondary={item.model} />
                                    </ListItem>
                                    <ListItem sx={{ height: 40, width: 280 }}>
                                        <ListItemIcon>
                                            <RoomIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Position" secondary={item.latitude.toFixed(6) + ', ' + item.longitude.toFixed(6)} />
                                    </ListItem>
                                    <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40, width: 280 }}>
                                        <ListItemIcon>
                                            <SignalCellular0BarIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Angle" secondary={item.angle} />
                                    </ListItem>
                                    <ListItem sx={{ height: 40, width: 280 }}>
                                        <ListItemIcon>
                                            <SpeedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Speed" secondary={item.speed + "km/h"} />
                                    </ListItem>
                                    <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40, width: 280 }}>
                                        <ListItemIcon>
                                            <HistoryIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Engine Hours" secondary={item.engineHours} />
                                    </ListItem>
                                    <ListItem sx={{ height: 40, width: 280 }}>
                                        <ListItemIcon>
                                            <NetworkCheckIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Odomeder" secondary={item.odometer} />
                                    </ListItem>
                                    <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40, width: 280 }}>
                                        <ListItemIcon>
                                            <HeightIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Altitude" secondary={item.altitude} />
                                    </ListItem>

                                    <ListItem sx={{ height: 40, width: 280 }}>
                                        <ListItemIcon>
                                            <AutorenewIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Status" secondary={item.status} />
                                    </ListItem>
                                </>
                            )}
                        </List>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Driver
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Events
                </TabPanel>
                <TabPanel value={value} index={3}>
                    Send require
                </TabPanel>
            </Box>
        );
    } else if (item.type === 'bin') {
        return (
            <Box sx={{ width: '100%', height: "inherit" }}>
                <CloseIcon
                    sx={{
                        position: 'absolute',
                        top: '12px',
                        right: '4px',
                        fontSize: '28px',
                        color: '#6f6f6f',
                        cursor: 'pointer',
                        zIndex: 401,
                    }}
                    onClick={handleClose}
                />
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Bin" {...a11yProps(0)} />
                        <Tab label="Events" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Box>
                        <List
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                flexWrap: 'wrap',
                                height: 230,
                                pb: 0,
                                maxWidth: 600,
                                overflowX: 'hide',
                                overflowY: 'auto',
                                "& .css-cveggr-MuiListItemIcon-root": {
                                    minWidth: '32px',
                                },
                                "& .css-1pklcki-MuiListItem-root:nth-of-type(2n+1)": {
                                    backgroundColor: '#f5f5f5',
                                },
                                "& .css-konndc-MuiListItemText-root": {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                },
                                "& .css-10hburv-MuiTypography-root": {
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    color: '#6f6f6f',
                                },
                                "& .css-83ijpv-MuiTypography-root": {
                                    fontSize: '12px',
                                    color: '#6f6f6f',
                                }

                            }}
                        >
                            {/* for in item */}
                            <>
                                    <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40, width: 280 }}>
                                        <ListItemIcon>
                                            <ListIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="ID" secondary={item.id} />
                                    </ListItem>
                                    <ListItem sx={{ height: 40, width: 280 }}>
                                        <ListItemIcon>
                                            <DataThresholdingIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Area Id" secondary={item.areaId} />
                                    </ListItem>
                                    <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40, width: 280 }}>
                                        <ListItemIcon>
                                            <DirectionsCarIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Heigth" secondary={item.heigth} />
                                    </ListItem>
                                    <ListItem sx={{ height: 40, width: 280 }}>
                                        <ListItemIcon>
                                            <RoomIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Position" secondary={item.latitude.toFixed(6) + ', ' + item.longitude.toFixed(6)} />
                                    </ListItem>
                                    <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40, width: 280 }}>
                                        <ListItemIcon>
                                            <SignalCellular0BarIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Weight" secondary={item.weight + "kg"} />
                                    </ListItem>
                                    <ListItem sx={{ height: 40, width: 280 }}>
                                        <ListItemIcon>
                                            <SpeedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Max Weight" secondary={item.maxWeight + "kg"} />
                                    </ListItem>
                                    <ListItem sx={{ backgroundColor: '#f5f5f5', height: 40, width: 280 }}>
                                        <ListItemIcon>
                                            <AutorenewIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Status" secondary={item.status} />
                                    </ListItem>
                                </>
                        </List>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Events
                </TabPanel>
            </Box>
        );
    }

    else {
        return (<div></div>);
    }
}