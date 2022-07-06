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
import ListItemIcon from '@mui/material/ListItemIcon';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

function Header() {
  // drawer
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

  const menus = [
    { id: 1, path: 'menu', name: '献立', icon: <DateRangeIcon /> },
    { id: 2, path: 'dishes', name: 'メニューリスト', icon: <FormatListBulletedIcon /> },
  ];

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
          {menus.map((m) => (
            <MenuItem key={m.id} component={Link} to={m.path}>
              <ListItemIcon>{m.icon}</ListItemIcon>
              <ListItemText>{m.name}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </SwipeableDrawer>
    </Box>
  );
}

export default Header;
