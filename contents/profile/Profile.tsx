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
import { displayCenter } from '@/declares/modal';
import Image from 'next/image';
import Watched from '@/public/icons/summary/watched.svg';
import User from '@/public/icons/summary/user.svg';
import Setting from '@/public/icons/summary/setting.svg';
import Heart from '@/public/icons/summary/heart.svg';

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

  const ButtonItems = [
    { id: 1, title: `${t('home')}`, url: '/', icon: User },
    { id: 2, title: `${t('bookmark')}`, url: '/bookmark', icon: User },
    { id: 3, title: `${t('Articles')}`, url: '/articles', icon: Watched },
    { id: 4, title: `${t('Watched')}`, url: '/watched', icon: Watched },
    { id: 5, title: `${t('settings')}`, url: '/settings', icon: Setting },
    { id: 5, title: `Spread the love`, url: '/invitations', icon: Heart },
  ];
  return (
    <Box>
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
            mt: 1,
            px: 0.5,
            background: '#fff',
            width: 290,
            color: '#262626',
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ ...displayCenter, flexDirection: 'column', mt: 3.5, px: 3 }}>
          <Avatar alt="avatar" sx={{ bgcolor: 'secondary.dark', width: 100, height: 100 }}></Avatar>

          <Box sx={{ ...displayCenter, flexDirection: 'column', mt: 1 }}>
            <Typography variant="subtitle2" noWrap sx={{ fontWeight: 'bold', maxWidth: '200px' }}>
              {DisplayNameUser}
            </Typography>
            <Typography variant="body2" sx={{ color: '#A6A9B9', maxWidth: '200px' }} noWrap>
              {DisplayEmail}
            </Typography>
          </Box>
        </Box>

        <Stack>
          {ButtonItems.map((item: any) => (
            <MenuItem
              onClick={handleClose}
              key={item.id}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Box
                sx={{ height: '30px', backgroundColor: '#f4f4f4', borderRadius: '50%', p: '4px' }}
              >
                <Image src={item.icon} alt={`icon`} width={20} height={20} />
              </Box>
              <Button
                onClick={() => router.push(item.url)}
                sx={{
                  fontWeight: 'bold',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                {item.title}
              </Button>
            </MenuItem>
          ))}
        </Stack>

        <Box sx={{ border: '1px solid #A6A9B9' }} />

        <MenuItem onClick={handleClose} sx={{ ...displayCenter, py: 1.5 }}>
          <Button
            onClick={() => dispatch(authActions.logout({}))}
            sx={{ fontWeight: 'bold', textTransform: 'none' }}
          >
            {t('log-out')}
          </Button>
        </MenuItem>
      </Popover>
    </Box>
  );
};

export default Profile;
