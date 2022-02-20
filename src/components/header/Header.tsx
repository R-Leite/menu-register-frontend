import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
// import ListItemIcon from '@mui/material/ListItemIcon';

function Header() {
  // drawer
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

  return (
    <Box sx={{ paddingBottom: 8 }}>
      <AppBar color="secondary" title="Menu" position="fixed">
        <Toolbar>
          <IconButton size="small" edge="start" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          MenuRegister
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <MenuList>
          <MenuItem component={Link} to="/menu">
            <ListItemText>献立</ListItemText>
          </MenuItem>
          <MenuItem component={Link} to="/dishes">
            <ListItemText>メニューリスト</ListItemText>
          </MenuItem>
        </MenuList>
      </SwipeableDrawer>
    </Box>
  );
}

export default Header;
