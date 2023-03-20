import { authActions } from '@/store/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';
import { getAuth } from '@/utils/auth';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Card, Divider, Grid, MenuItem, Popover, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Typography from '../share/Typography';
import LanguageIcon from '@mui/icons-material/Language';
import { useState } from 'react';
import FlagEn from '../../public/icons/flag-en.png';
import FlagVi from '../../public/icons/flag-vi.png';
import Image from 'next/image';
import Cookies from 'js-cookie';

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: FlagEn,
  },
  {
    value: 'vi',
    label: 'Vietnamese',
    icon: FlagVi,
  },
];

interface Props {}
const SettingComponent = ({}: Props) => {
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const dispatch = useAppDispatch();
  const user = getAuth()?.user;
  const router = useRouter();

  const [language, setLanguage] = useState(locale);

  const [open, setOpen] = useState(null);

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleChangeLanguage = (lang: string) => {
    router.push('/settings', undefined, { locale: lang });
    handleClose();
    Cookies.set('appLocale', lang);
    localStorage.setItem('appLocale', lang);
    setLanguage(lang);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <Stack spacing={3}>
            <Card sx={{ py: 2, px: 3.5 }}>
              <Typography variant="h6" component={'h2'}>
                {t('account')}
              </Typography>
              <Box sx={{ py: 2, my: 1 }}>
                <Box sx={{ my: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1" component={'h3'}>
                    {t('email')}
                  </Typography>
                </Box>
                <div className="">{user?.email}</div>
              </Box>
              <Divider sx={{ border: '.5px solid #D4D5D9' }} />
              <Box sx={{ py: 2, my: 1 }}>
                <Box
                  sx={{
                    my: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="subtitle1" component={'h3'}>
                    {t('password')}
                  </Typography>
                  {!user?.socialAccount ? (
                    <IconButton onClick={() => dispatch(authActions.openChangePassModal())}>
                      <EditIcon />
                    </IconButton>
                  ) : (
                    <></>
                  )}
                </Box>
                <div className="">••••••••</div>
              </Box>
            </Card>
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <Stack spacing={3}>
            <Card sx={{ py: 2, px: 3.5 }}>
              <Typography variant="h6" component={'h2'}>
                {t('app-language')}
              </Typography>
              <Box sx={{ py: 2, my: 1 }}>
                <Box
                  sx={{
                    my: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="subtitle1" component={'h3'}>
                    {t('change-default-language')}
                  </Typography>

                  <IconButton
                    onClick={handleOpen}
                    sx={{
                      padding: 0,
                      width: 44,
                      height: 44,
                    }}
                  >
                    <LanguageIcon />
                  </IconButton>

                  <Popover
                    open={Boolean(open)}
                    anchorEl={open}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    PaperProps={{
                      sx: {
                        p: 1,
                        mt: 1.5,
                        ml: 0.75,
                        width: 180,
                        '& .MuiMenuItem-root': {
                          px: 1,
                          typography: 'body2',
                          borderRadius: 0.75,
                        },
                      },
                    }}
                  >
                    <Stack spacing={0.75}>
                      {LANGS.map((option) => (
                        <MenuItem
                          key={option.value}
                          selected={option.value === language}
                          onClick={() => handleChangeLanguage(option.value)}
                        >
                          <Image
                            src={option.icon}
                            alt="flag"
                            height={44}
                            width={44}
                            style={{ marginRight: '8px' }}
                          />
                          {option.label}
                        </MenuItem>
                      ))}
                    </Stack>
                  </Popover>
                </Box>
              </Box>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default SettingComponent;
