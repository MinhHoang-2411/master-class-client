import { authActions } from '@/store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import ReactPlayer from 'react-player';
import styles from '../../styles/layout-page.module.scss';
import FeaturedPreview from '../trailer/featured-preview';
import { paymentActions } from '@/store/payment/paymentSlice';

const styleDescription = {
  display: 'flexbox',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  width: '100%',
  borderRadius: '8px',
  border: 'none',
  background: '#222326',
  padding: '16px',
  marginBottom: '15px',
};

const styleBtnSignUp = {
  color: '#262626',
  background: 'linear-gradient(94.87deg, #FFB7E4 20.12%, #34DBEB 87.72%)',
  padding: '10px',
  cursor: 'pointer',
  width: '160px',
  height: '32px',
  borderRadius: '8px',
  fontSize: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  margin: 'auto',
  marginTop: '8px',
  marginBottom: '8px',
  '&:hover': {
    boxShadow: '0 4px 15px 0 rgba(236, 116, 149, 0.75)',
  },
};

interface TrailerModel {
  listBanners?: string[];
  layoutPage?: any;
}

const Trailer: React.FC<TrailerModel> = ({ layoutPage }) => {
  const isPayment = useAppSelector((state) => state.payment.isPayment);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  // const { trailer, welcome } = layoutPage;
  const trailer = layoutPage?.trailer;
  const welcome = layoutPage?.welcome;
  const [lightTrailer, setLightTrailer] = useState(trailer?.thumbnail);
  const [playingTrailer, setPlayingTrailer] = useState(false);

  const [lightWelcome, setLightWelcome] = useState(welcome?.thumbnail);
  const [playingWelcome, setPlayingWelcome] = useState(false);

  return (
    <Box
      sx={{
        maxWidth: {
          xs: '100%',
          sm: '100%',
          md: '100%',
          lg: '100%',
          xl: '1600px',
        },
        margin: 'auto',
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          width: '100% !important',
          color: '#f4f4f5 !important',
          margin: '0 !important',
          display: 'flex',
          height: '100%',
        }}
      >
        <Grid item xs={4} sm={4} md={4} sx={{ padding: '24px !important' }}>
          <Box sx={{ borderRadius: '8px', overflow: 'hidden' }}>
            <ReactPlayer
              light={lightTrailer}
              url={trailer?.url}
              controls={true}
              width="100%"
              playing={playingTrailer}
              onClickPreview={() => {
                setLightTrailer(false);
                setPlayingTrailer(true);
              }}
            />
          </Box>

          <Box sx={{ ...styleDescription, marginTop: 2, marginBottom: '0px' }}>
            <span className={styles.description}>{trailer?.description}</span>
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          sm={4}
          md={4}
          sx={{
            padding: '24px !important',
            minHeight: {
              xs: '493px !important',
              sm: '515px !important',
            },
          }}
        >
          <Box
            sx={{
              ...styleDescription,
              height: '100%',
              cursor: 'initial',
              maxWidth: '600px !important',
              margin: 'auto',
            }}
          >
            <FeaturedPreview />
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          sm={4}
          md={4}
          sx={{
            padding: '24px !important',
          }}
        >
          <Box sx={styleDescription}>
            <span className={styles.description}>{welcome?.description}</span>
            {isLoggedIn && !isPayment ? (
              <Box
                sx={styleBtnSignUp}
                onClick={() => dispatch(paymentActions.openModalChoosePayment())}
              >
                {t('Subscribe')}
              </Box>
            ) : isLoggedIn ? (
              <></>
            ) : (
              <Box sx={styleBtnSignUp} onClick={() => dispatch(authActions.openSignUpModal())}>
                {t('sign-up-here')}
              </Box>
            )}
          </Box>
          <Box sx={{ borderRadius: '8px', overflow: 'hidden' }}>
            <ReactPlayer
              light={lightWelcome}
              url={welcome?.url}
              controls={true}
              width="100%"
              height={isPayment && isLoggedIn ? '405px' : '360px'}
              playing={playingWelcome}
              onClickPreview={() => {
                setLightWelcome(false);
                setPlayingWelcome(true);
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Trailer;
