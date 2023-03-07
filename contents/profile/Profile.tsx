import { UserModel } from '@/declares/models';
import { authActions } from '@/store/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

interface IProfile {}
const Profile = ({ currentUser }: any) => {
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useAppDispatch();
  return (
    <>
      <Box sx={{ cursor: 'pointer' }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="avatar" sx={{ bgcolor: 'secondary.dark' }}>
              {/* {currentUser.firstName.slice(0, 1)} */}
            </Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseUserMenu} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Button onClick={() => dispatch(authActions.logout({}))}>Log out</Button>
            <Button onClick={() => router.push(`/bookmark`)}>Bookmark</Button>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default Profile;
