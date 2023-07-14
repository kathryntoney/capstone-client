import React from 'react'
import { Box, List, ListItem, ListItemButton, ListItemText, Switch } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ModeNightIcon from '@mui/icons-material/ModeNight';

const Leftbar = () => {
    return (
        <Box
            flex={1}
            p={2}
            sx={{ display: { xs: "none", sm: "block" } }}>
            <Box position="fixed">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#">
                            <HomeIcon />
                            <ListItemText primary="Homepage" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#">
                            <SettingsIcon />
                            <ListItemText primary="Settings" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#">
                            <AccountBoxIcon />
                            <ListItemText primary="Profile" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#">
                            <ModeNightIcon />
                            <Switch />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Box >
    )
}

export default Leftbar
