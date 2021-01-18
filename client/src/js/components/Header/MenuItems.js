import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { MenuItem, ListItemIcon, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthCtx';
import { logoutHandler } from '../../actions/login-signup';

const MenuItems = (props) => {
  const { activeUser, logout, setError, setLoading } = useAuth();
  const history = useHistory();
  const HomeMenuItems = (props) => {
    return (
      <>
        <MenuItem
          onClick={() => {
            props.handleClose('/signup');
          }}
        >
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Sign up</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.handleClose('/login');
          }}
        >
          <ListItemIcon>
            <LockOpenIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Login</Typography>
        </MenuItem>
      </>
    );
  };

  const UserMenuItems = () => {
    return (
      <>
        <MenuItem
          onClick={(event) => {
            logoutHandler(event, logout, setError, setLoading, history);
          }}
        >
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Logout</Typography>
        </MenuItem>
      </>
    );
  };

  return <>{activeUser ? <UserMenuItems {...props} /> : <HomeMenuItems {...props} />}</>;
};

export default MenuItems;
