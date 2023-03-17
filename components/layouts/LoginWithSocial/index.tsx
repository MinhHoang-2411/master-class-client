import Typography from '@/components/share/Typography';
import { displayCenter } from '@/declares/modal';
import { Box } from '@mui/material';
import { useTranslation } from 'next-i18next';
import LoginFacebook from './LoginFacebook';
import LoginGoogle from './LoginGoogle';

interface credentialResponseProps {
  clientId?: string;
  credential?: string;
  select_by?: string;
}

const LoginWithSocial = () => {
  const { t } = useTranslation();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          pt: 2,
          pb: 0.5,
          borderRadius: 1,
        }}
      >
        <Box sx={{ mb: 1.5 }}>
          <Typography
            variant="body2"
            component="span"
            sx={{ textAlign: 'center' }}
            color="primary.light"
          >
            {t('Login with another account')}
          </Typography>
        </Box>
        <Box sx={{ ...displayCenter }}>
          <Box sx={{ mr: 2}}>
            <LoginGoogle />
          </Box>
          <Box className="">
            <LoginFacebook />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LoginWithSocial;
