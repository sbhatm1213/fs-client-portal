import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Typography, Box, Divider } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Person from '@mui/icons-material/Person';
import { PersonOutline } from '@mui/icons-material';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useNavigate } from 'react-router-dom';
import theme from '../theme.js';


const ProfileIconComponent = ({ userInfo, msspOrMspInfo, logout, handleUserMgmt }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
  };


  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

    const openUserMgmt = async () => {
        handleMenuClose();
        handleUserMgmt();
  };

  return (
    <div>
      <IconButton
        edge="end"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {/* Display user info */}
        <MenuItem  sx={{ display: 'flex',
                         justifyContent: 'left',
                         alignItems: 'left',
                         '&:hover': {
                                backgroundColor: 'transparent',
                                cursor: 'default',
                              }
                         }}>
                      <Person fontSize="small" sx={{ mr: 1 }} />
             <Typography variant="caption"  sx={{ textAlign: 'left' }}>{userInfo.name} ({userInfo.email})</Typography>
        </MenuItem>
        <MenuItem  sx={{ display: 'flex',
                         justifyContent: 'left',
                         alignItems: 'left',
                         '&:hover': {
                                backgroundColor: 'transparent',
                                cursor: 'default',
                              }
                         }} >
              <BusinessCenterIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="caption"  sx={{ textAlign: 'left' }}>{msspOrMspInfo}</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={openUserMgmt} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
                                    '&:hover': {
                                        backgroundColor: 'transparent'
                                      }
                                  }}>
               <ManageAccountsIcon fontSize="medium" sx={{ mr: 1 }} />
               <Typography variant="button"  sx={{ textAlign: 'center' }}>User Management</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
                                    '&:hover': {
                                        backgroundColor: 'transparent'
                                      }
                                  }}>
               <LogoutIcon fontSize="medium" sx={{ mr: 1 }} />
               <Typography variant="button"  sx={{ textAlign: 'center' }}>Sign Out</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileIconComponent;