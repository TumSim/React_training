import { useState } from 'react'
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';

function NavigationDrawerbar() {
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const pageLocation = useLocation();

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleDrawerOpen}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {pageLocation.pathname === "/customers" ? "Customers" : "Trainings"}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                open={open}
                onClose={handleDrawerClose}
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <List>
                    <ListItemButton component={Link} to="/customers" onClick={handleDrawerClose}>
                        <ListItemText primary="Customers" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/trainings" onClick={handleDrawerClose}>
                        <ListItemText primary="Trainings" />
                    </ListItemButton>
                </List>
            </Drawer>
        </Box>
    );
}

export default NavigationDrawerbar;
