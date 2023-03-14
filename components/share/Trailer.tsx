import { authActions } from '@/store/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import ReactPlayer from 'react-player';
import styles from '../../styles/layout-page.module.scss';
import FeaturedPreview from '../trailer/featured-preview';

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
  backgroundColor: '#e32652',
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
    backgroundColor: '#d61a46',
  },
};

interface TrailerModel {
  listBanners?: string[];
  layoutPage?: any;
}

const Trailer: React.FC<TrailerModel> = ({ layoutPage }) => {
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
            <Box sx={styleBtnSignUp} onClick={() => dispatch(authActions.openSignUpModal())}>
              {t('sign-up-here')}
            </Box>
          </Box>

          <ReactPlayer
            light={lightWelcome}
            url={welcome?.url}
            controls={true}
            width="100%"
            playing={playingWelcome}
            onClickPreview={() => {
              setLightWelcome(false);
              setPlayingWelcome(true);
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Trailer;
