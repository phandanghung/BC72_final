import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, IconButton, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import WorkIcon from '@mui/icons-material/Work';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../routes/path';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menu = [
    {
      href: PATH.HOME,
      icon: <OtherHousesIcon />,
      title: 'Trang chủ',
    },
    {
      href: PATH.ADMIN.USERS,
      icon: <DashboardIcon />,
      title: 'Quản lý người dùng',
    },
    {
      href: PATH.ADMIN.ROOMS,
      icon: <EventIcon />,
      title: 'Quản lý rooms',
    },
    {
      href: PATH.ADMIN.BOOKING,
      icon: <WorkIcon />,
      title: 'Quản lý bookings',
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: isCollapsed ? 60 : 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: isCollapsed ? 60 : 240,
            boxSizing: 'border-box',
            transition: 'width 0.3s',
          },
        }}
      >
        <Toolbar
          sx={{
            p: 0, 
            minHeight: 'auto', 
            display: 'flex', 
            justifyContent: isCollapsed ? 'center' : 'start',
          }}
        >
          <IconButton onClick={toggleSidebar}>
            {isCollapsed ? <MenuIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Toolbar>


        <List>
          {menu.map((item) => (
            <ListItem key={item.href} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={() => navigate(item.href)}
                sx={{
                  justifyContent: isCollapsed ? 'center' : 'center',

                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isCollapsed ? 'auto' : 1,
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!isCollapsed && <ListItemText primary={item.title} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

    </Box>
  );
};

export default Sidebar;
