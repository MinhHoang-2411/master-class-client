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
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

interface IProfile {}
const Profile = ({}: any) => {
  const { t } = useTranslation('common');

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

  const DisplayNameUser = currentUser?.firstName
    ? `${currentUser?.firstName} ${currentUser?.lastName}`
    : currentUser?.name;
  const DisplayEmail = currentUser?.socialAccount
    ? currentUser?.socialAccount?.email
    : currentUser?.email;

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
          <Typography variant="subtitle2" noWrap sx={{ fontWeight: 'bold', maxWidth: "200px" }}>
            {DisplayNameUser}
          </Typography>
          <Typography variant="body2" sx={{ color: 'primary.secondary', maxWidth: "200px" }} noWrap>
            {DisplayEmail}
          </Typography>
        </Box>

        <Divider sx={{ border: '.5px solid #2B2B40' }} />

        <Stack>
          <MenuItem onClick={handleClose}>
            <Button
              onClick={() => router.push(`/`)}
              sx={{ color: '#fff', py: '2px', fontWeight: 'bold' }}
            >
              {t('home')}
            </Button>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <Button
              onClick={() => router.push(`/bookmark`)}
              sx={{ color: '#fff', py: '2px', fontWeight: 'bold' }}
            >
              {t('bookmark')}
            </Button>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <Button
              onClick={() => router.push(`/settings`)}
              sx={{ color: '#fff', py: '2px', fontWeight: 'bold' }}
            >
              {t('settings')}
            </Button>
          </MenuItem>
        </Stack>

        <Divider sx={{ border: '.5px solid #2B2B40' }} />

        <MenuItem onClick={handleClose}>
          <Button
            onClick={() => dispatch(authActions.logout({}))}
            sx={{ color: '#fff', fontWeight: 'bold' }}
          >
            {t('log-out')}
          </Button>
        </MenuItem>
      </Popover>
    </>
  );
};

export default Profile;
