import Typography from '@/components/share/Typography';
import { displayCenter } from '@/declares/modal';
import { Box } from '@mui/material';
import { useTranslation } from 'next-i18next';
import LoginFacebook from './LoginFacebook';
import LoginGoogle from './LoginGoogle';
import styles from './styles.module.scss';

interface credentialResponseProps {
  clientId?: string;
  credential?: string;
  select_by?: string;
}

const LoginWithSocial = () => {
  const { t } = useTranslation();

  return (
    <>
      <Box className={styles.OrSignIn}>
        <Box sx={{ mb: 1.5 }} className={styles.headingText}>
          <Typography
            variant="body2"
            component="span"
            sx={{ textAlign: 'center' }}
            color="primary.light"
          >
            {t('Or Sign in with')}
          </Typography>
        </Box>
        <Box sx={{ ...displayCenter }}>
          <Box sx={{ mr: 2 }}>
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
