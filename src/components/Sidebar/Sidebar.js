import { Box, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Stack, styled, Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import PublicIcon from '@mui/icons-material/Public';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

import useWindowDimensions from "../useWindowDimensions/useWindowDimensions";
import { useEffect } from 'react';

const SidebarBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
})

const Sidebar = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const navigate = useNavigate();

    const [open, setOpen] = React.useState(true);
    const { width } = useWindowDimensions();

    useEffect(() => {
        // width < 900 ? setOpen(false) : setOpen(true);
        if (width < 900) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }, [width])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickClose = () => {
        setOpen(false);
    };

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        if (index === 0) {
            console.log("index = 0");
            navigate('/');
        }
        else if (index === 1) {
            console.log("index = 1");
            navigate('/map2');
        }
        else if (index === 2) {
            console.log("index = 2");
            navigate('/map3');
        }
        else if (index === 3) {
            console.log("index = 3");
            navigate('/map4');
        }
        // else if(index === 4) {
        //     console.log("index = 4");
        //     navigate('/map5');
        // }
    };



    return (
        <Stack sx={{
            // display: { xs: 'none', lg: 'flex' },
            display: 'flex',
            position: { 
                xs: open ? 'fixed' : 'relative', 
                md: 'relative',
                lg: 'relative' 
            },
            zIndex: open ? 402 : 1,
            borderRight: {
                xs: open ? '1px solid #e0e0e0' : 'none',
                md: 'relative',
                lg: "none",
            },
            backgroundColor: '#fff',
            minWidth: open ? 280 : 72,
            width: open ? { xs: 0, lg: 280 } : { xs: 0, lg: 72 },
            transition: 'all 0.3s linear',
            height: "100vh",
        }}>
            <SidebarBox p={2} sx={{p: open ? 2 : 1, py: 1, transition: 'all 0.3s linear', }} >
                <Stack direction="row" spacing={0}
                    sx={{
                        alignItems: 'center',
                        justifyContent: open ? 'space-between' : 'center',
                        height: 48,
                    }}
                >
                    <Link className='' to={"/"} style={{ textDecoration: "none", }}>
                        <Typography variant="h6" component="h1" sx={{ flexGrow: 1, p: 1, whiteSpace: "nowrap", color: "#000", fontWeight: "bold", display: open ? "block" : "none" }}>
                            My Map App
                        </Typography>
                    </Link>

                    <MenuIcon sx={{ display: open ? "none" : "block", color: "#000", fontSize: 28, cursor: "pointer" }} onClick={handleClickOpen} />
                    <MenuOpenIcon sx={{ display: open ? "block" : "none", color: "#000", fontSize: 28, cursor: "pointer" }} onClick={handleClickClose} />
                </Stack>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    <ListItemButton
                        component={Link}
                        to={"/"}
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}

                    >
                        <ListItemIcon>
                            <PublicIcon />
                        </ListItemIcon>
                        <ListItemText primary="Map" sx={{ display: open ? "block" : "none" }} />
                    </ListItemButton>
                    <ListItemButton
                        component={Link}
                        to={"/dashboard"}
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}
                    >
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" sx={{ display: open ? "block" : "none" }} />
                    </ListItemButton>
                    <ListItemButton
                        component={Link}
                        to={"/vehicles"}
                        selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2)}
                    >
                        <ListItemIcon>
                            <LocalShippingIcon />
                        </ListItemIcon>
                        <ListItemText primary="Vehicles" sx={{ display: open ? "block" : "none" }} />
                    </ListItemButton>
                    <ListItemButton
                        component={Link}
                        to={"/drivers"}
                        selected={selectedIndex === 3}
                        onClick={(event) => handleListItemClick(event, 3)}
                    >
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Drivers" sx={{ display: open ? "block" : "none" }} />
                    </ListItemButton>
                    <ListItemButton
                        component={Link}
                        to={"/bins"}
                        selected={selectedIndex === 4}
                        onClick={(event) => handleListItemClick(event, 4)}
                    >
                        <ListItemIcon>
                            <DeleteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Bins" sx={{ display: open ? "block" : "none" }} />
                    </ListItemButton>

                </List>
            </SidebarBox>
        </Stack>
    )
}

export default Sidebar