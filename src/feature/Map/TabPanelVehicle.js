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
import WidthFullIcon from '@mui/icons-material/WidthFull';
import StraightenIcon from '@mui/icons-material/Straighten';
import BadgeIcon from '@mui/icons-material/Badge';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CakeIcon from '@mui/icons-material/Cake';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import EmailIcon from '@mui/icons-material/Email';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { assetUrl } from '../../ultils/axiosApi';
import Hls from 'hls.js'
import ReactPlayer from 'react-player'

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

let handleViewCamera = (id) => {
    setTimeout(() => {
        if (Hls.isSupported()) {
            var video = document.getElementById(`video${id}`);
            console.log(`check video${id}`, video);
            var hls = new Hls();
            hls.on(Hls.Events.MEDIA_ATTACHED, function () {
                console.log('video tag and hls.js are now bound together !');
            });
            hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                console.log(
                    'manifest loaded, found ' + data.levels.length + ' quality level'
                );
            });
            hls.loadSource('https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8');
            // bind them together
            hls.attachMedia(video);
            video.play();
        }

    }, 2000)
}


export default function TabPanelVehicle({ open, handleClose, item }) {
    const { t } = useTranslation();
    // console.log(item);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const driver = item?.driver;

    if (!!item && open) {
        return (
            <Box sx={{
                width: "100%",
                height: open ? "274px" : 0,
                backgroundColor: open ? "white" : "#f5f5f5",
                position: 'absolute',
                bottom: 0,
                zIndex: 1001,
                transition: "height 0.3s ease-in-out",
            }}>
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
                            <Tab label={t("vehicle")} {...a11yProps(0)} />
                            <Tab label={t("driver")} {...a11yProps(1)} />
                            <Tab label={t("map.events")} {...a11yProps(2)} />
                            <Tab label={t("map.sendRequest")} {...a11yProps(3)} />
                            {/* <Tab label={t("map.cameras")} {...a11yProps(4)} onClick={() => handleViewCamera(1)} /> */}
                            <Tab label={t("map.cameras")} {...a11yProps(4)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'flex-start',
                                height: '100%',
                                width: '100%',
                            }}
                        >
                            <List
                                sx={{
                                    display: 'flex',
                                    flexGrow: 1,
                                    flexDirection: 'column',
                                    flexWrap: 'wrap',
                                    height: 230,
                                    pb: 0,
                                    maxWidth: 1200,
                                    overflowX: 'hide',
                                    overflowY: 'auto',
                                    "& .MuiListItemIcon-root": {
                                        minWidth: '32px',
                                    },
                                    "& .MuiListItem-root:nth-of-type(2n+1)": {
                                        backgroundColor: '#f5f5f5',
                                    },
                                    "& .MuiListItemText-root": {
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    },
                                    "& .MuiTypography-body1": {
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        color: '#6f6f6f',
                                    },
                                    "& .MuiTypography-body2": {
                                        fontSize: '12px',
                                        color: '#6f6f6f',
                                    }

                                }}
                            >
                                {/* for in item */}
                                {item.type === 'vehicle' && (
                                    <>
                                        <ListItem sx={{ width: 360, backgroundColor: '#f5f5f5', height: 40 }}>
                                            <ListItemIcon>
                                                <ListIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={t('vehicles.table.id')} secondary={item.id} />
                                        </ListItem>
                                        <ListItem sx={{ width: 360, height: 40 }}>
                                            <ListItemIcon>
                                                <DataThresholdingIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={t('vehicles.form.engineId')} secondary={item.engineId} />
                                        </ListItem>
                                        <ListItem sx={{ width: 360, backgroundColor: '#f5f5f5', height: 40 }}>
                                            <ListItemIcon>
                                                <DataThresholdingIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={t('vehicles.form.plate')} secondary={item.plate + ""} />
                                        </ListItem>
                                        <ListItem sx={{ width: 360, height: 40 }}>
                                            <ListItemIcon>
                                                <HistoryIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={t('vehicles.form.engineType')} secondary={item.engineType + ""} />
                                        </ListItem>
                                        <ListItem sx={{ width: 360, backgroundColor: '#f5f5f5', height: 40 }}>
                                            <ListItemIcon>
                                                <HistoryIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={t('vehicles.form.engineHours')} secondary={item.engineHours + "h"} />
                                        </ListItem>
                                        <ListItem sx={{ width: 360, height: 40 }}>
                                            <ListItemIcon>
                                                <DirectionsCarIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={t('vehicles.form.model')} secondary={item.model} />
                                        </ListItem>
                                        <ListItem sx={{ width: 360, backgroundColor: '#f5f5f5', height: 40 }}>
                                            <ListItemIcon>
                                                <RoomIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={t('vehicles.form.position')} secondary={item.latitude.toFixed(6) + ', ' + item.longitude.toFixed(6)} />
                                        </ListItem>
                                        <ListItem sx={{ width: 360, height: 40 }}>
                                            <ListItemIcon>
                                                <HeightIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={t('vehicles.form.height')} secondary={item.height + ""} />
                                        </ListItem>
                                        <ListItem sx={{ width: 360, backgroundColor: '#f5f5f5', height: 40 }}>
                                            <ListItemIcon>
                                                <StraightenIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={t('vehicles.form?.length')} secondary={item?.length} />
                                        </ListItem>
                                        <ListItem sx={{ width: 360, height: 40 }}>
                                            <ListItemIcon>
                                                <WidthFullIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={t('vehicles.form.width')} secondary={item.width} />
                                        </ListItem>
                                        <ListItem sx={{ width: 360, backgroundColor: '#f5f5f5', height: 40 }}>
                                            <ListItemIcon>
                                                <NetworkCheckIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={t('vehicles.form.odometer')} secondary={item.odometer + ""} />
                                        </ListItem>
                                        <ListItem sx={{ width: 360, height: 40 }}>
                                            <ListItemIcon>
                                                <HeightIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={t('vehicles.form.tonnage')} secondary={item.tonnage + ""} />
                                        </ListItem>
                                        <ListItem sx={{ width: 360, backgroundColor: '#f5f5f5', height: 40 }}>
                                            <ListItemIcon>
                                                <AutorenewIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={t('vehicles.form.status')} secondary={item.status} />
                                        </ListItem>
                                    </>
                                )}
                            </List>
                            <Box sx={{ p: 2, width: 282, height: 196, maxWidth: 500 }}>
                                <Typography variant="p" component="h6" sx={{ mb: 1, fonWeight: 600 }}>
                                    {t('vehicles.form.image')}
                                </Typography>
                                <img src={`${assetUrl}/vehicle/${item.image}`} alt={item.name} width="100%" height="100%" />
                            </Box>
                        </Box>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'flex-start',
                                height: '100%',
                                width: '100%',
                            }}
                        >
                            <List
                                sx={{
                                    display: 'flex',
                                    flexGrow: 1,
                                    flexDirection: 'column',
                                    flexWrap: 'wrap',
                                    height: 230,
                                    pb: 0,
                                    maxWidth: 800,
                                    overflowX: 'hide',
                                    overflowY: 'auto',
                                    "& .MuiListItemIcon-root": {
                                        minWidth: '32px',
                                    },
                                    "& .MuiListItem-root:nth-of-type(2n+1)": {
                                        backgroundColor: '#f5f5f5',
                                    },
                                    "& .MuiListItemText-root": {
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    },
                                    "& .MuiTypography-body1": {
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        color: '#6f6f6f',
                                    },
                                    "& .MuiTypography-body2": {
                                        fontSize: '12px',
                                        color: '#6f6f6f',
                                    }

                                }}
                            >
                                {/* for in item */}
                                {item.type === 'vehicle' && (
                                    <>
                                        <ListItem sx={{ width: 360, backgroundColor: '#f5f5f5', height: 40 }}>
                                            <ListItemIcon>
                                                <ListIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={t("drivers.table.id")} secondary={driver.id} />
                                        </ListItem>
                                        <ListItem sx={{ width: 360, height: 40 }}>
                                            <ListItemIcon>
                                                <BadgeIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={t("drivers.table.fullname")} secondary={driver.firstName + " " + driver.lastName} />
                                        </ListItem>
                                        <ListItem sx={{ width: 360, backgroundColor: '#f5f5f5', height: 40 }}>
                                            <ListItemIcon>
                                                <DriveFileRenameOutlineIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={t("drivers.table.firstName")} secondary={driver.firstName} />
                                        </ListItem>
                                        <ListItem sx={{ width: 360, height: 40 }}>
                                            <ListItemIcon>
                                                <DriveFileRenameOutlineIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={t("drivers.table.lastName")} secondary={driver.lastName} />
                                        </ListItem>
                                        <ListItem sx={{ width: 360, backgroundColor: '#f5f5f5', height: 40 }}>
                                            <ListItemIcon>
                                                <CakeIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={t("drivers.table.dob")} secondary={driver.dob} />
                                        </ListItem>
                                        <ListItem sx={{ width: 360, height: 40 }}>
                                            <ListItemIcon>
                                                {driver.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
                                            </ListItemIcon>
                                            <ListItemText primary={t("drivers.table.gender")} secondary={driver.gender} />
                                        </ListItem>
                                        <ListItem sx={{ width: 360, backgroundColor: '#f5f5f5', height: 40 }}>
                                            <ListItemIcon>
                                                <EmailIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={t("drivers.table.email")} secondary={driver.email} />
                                        </ListItem>
                                        <ListItem sx={{ width: 360, height: 40 }}>
                                            <ListItemIcon>
                                                <ContactPhoneIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={t("drivers.table.phone")} secondary={driver.phone} />
                                        </ListItem>
                                    </>
                                )}
                            </List>
                            <Box sx={{ p: 2, width: 232, height: 196, maxWidth: 500 }}>
                                <Typography variant="p" component="h6" sx={{ mb: 1, fonWeight: 600 }}>
                                    {t('drivers.form.image')}
                                </Typography>
                                <img src={`${assetUrl}/user/${driver.image}`} alt={driver.lastName} width="100%" height="100%" />
                            </Box>
                        </Box>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Events
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        Send require
                    </TabPanel>
                    {/* <TabPanel value={value} index={4}>
                        <video id='video1' height={"360px"} width={"640px"} muted controls></video>
                    </TabPanel> */}
                    <TabPanel value={value} index={4}>
                        <ReactPlayer
                            url={item.camera}
                            playing={true}
                            volume={1}
                            height="90vh"
                            width="100%"
                            controls={true}
                            muted={true}
                            config={{
                                file: {
                                    attributes: {
                                        preload: "auto",
                                    },
                                },
                            }}
                        />
                    </TabPanel>
                </Box>
            </Box>
        );
    }
    else {
        return (<Box sx={{
            width: "100%",
            height: open ? "274px" : 0,
            backgroundColor: open ? "white" : "#f5f5f5",
            position: 'absolute',
            bottom: 0,
            zIndex: 1001,
            transition: "height 0.3s ease-in-out",
        }}>
        </Box>
        );
    }
}