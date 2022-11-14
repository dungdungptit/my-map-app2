import { Box, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Stack, styled, Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import InboxIcon from '@mui/icons-material/Inbox';
import { useNavigate } from 'react-router-dom';

const SidebarBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
})

const Sidebar = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const navigate = useNavigate();


    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        if(index === 0) {
            console.log("index = 0");
            navigate('/');
        }
        else if(index === 1) {
            console.log("index = 1");
            navigate('/map2');
        }
        else if(index === 2) {
            console.log("index = 2");
            navigate('/map3');
        }
        else if(index === 3) {
            console.log("index = 3");
            navigate('/map4');
        }
        // else if(index === 4) {
        //     console.log("index = 4");
        //     navigate('/map5');
        // }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <SidebarBox p={1}>
                <Link className='' to={"/"}>
                    <Stack direction="row" spacing={0} alignItems="center">
                        <Typography variant="h6" component="h1" sx={{ flexGrow: 1, p: 1, color: "#000", fontWeight: "bold" }}>
                            My Map App
                        </Typography>
                        <MenuOpenIcon />
                    </Stack>
                </Link>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    // subheader={
                    //     <ListSubheader component="div" id="nested-list-subheader">
                    //         Nested List Items
                    //     </ListSubheader>
                    // }
                >
                    <ListItemButton
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}
                    >
                        <ListItemIcon>
                            <SendIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home Map" />
                    </ListItemButton>
                    <ListItemButton
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}
                    >
                        <ListItemIcon>
                            <SendIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                    <ListItemButton
                        selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2)}
                    >
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Drivers" />
                    </ListItemButton>
                    <ListItemButton
                        selected={selectedIndex === 3}
                        onClick={(event) => handleListItemClick(event, 3)}
                    >
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Bins" />
                    </ListItemButton>
                    <ListItemButton
                        component={Link}
                        to={"/map5"}
                        selected={selectedIndex === 4}
                        onClick={(event) => handleListItemClick(event, 4)}
                    >
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Vehicles" />
                    </ListItemButton>
                </List>
            </SidebarBox>
        </Box>
    )
}

export default Sidebar