import { authActions } from '@/store/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';
import { getAuth } from '@/utils/auth';
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Popover,
  Stack,
  Typography
} from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface IProfile {}
const Profile = ({  }: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentUser = getAuth()?.user;

  const [open, setOpen] = useState(null);

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Avatar alt="avatar" sx={{ bgcolor: 'secondary.dark' }}></Avatar>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            background: '#1e1e2d',
            color: '#fff',
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 2, px: 3 }}>
          <Typography variant="subtitle2" noWrap sx={{ fontWeight: 'bold' }}>
            {`${currentUser?.firstName} ${currentUser?.lastName}`}
          </Typography>
          <Typography variant="body2" sx={{ color: 'primary.secondary' }} noWrap>
            {currentUser?.email}
          </Typography>
        </Box>

        <Divider sx={{ border: '.5px solid #2B2B40' }} />

        <Stack>
          <MenuItem onClick={handleClose}>
            <Button
              onClick={() => router.push(`/`)}
              sx={{ color: '#fff', py: '2px', fontWeight: 'bold' }}
            >
              Home
            </Button>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <Button
              onClick={() => router.push(`/bookmark`)}
              sx={{ color: '#fff', py: '2px', fontWeight: 'bold' }}
            >
              Bookmark
            </Button>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <Button
              onClick={() => router.push(`/settings`)}
              sx={{ color: '#fff', py: '2px', fontWeight: 'bold' }}
            >
              Settings
            </Button>
          </MenuItem>
        </Stack>

        <Divider sx={{ border: '.5px solid #2B2B40' }} />

        <MenuItem onClick={handleClose}>
          <Button
            onClick={() => dispatch(authActions.logout({}))}
            sx={{ color: '#fff', fontWeight: 'bold' }}
          >
            Log out
          </Button>
        </MenuItem>
      </Popover>
    </>
  );
};

export default Profile;
