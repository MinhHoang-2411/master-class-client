import { authActions } from '@/store/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';

import FeaturedPreview from '../trailer/featured-preview';
import Video from '../trailer/video';
import styles from '../../styles/layout-page.module.scss';
import ReactPlayer from 'react-player';

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
  const dispatch = useAppDispatch();
  const { trailer, welcome } = layoutPage;

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
        sx={{ width: '100% !important', color: '#f4f4f5 !important', margin: '0 !important' }}
      >
        <Grid item xs={4} sm={4} md={4} sx={{ padding: '24px !important' }}>
          <ReactPlayer light={trailer?.thumbnail} url={trailer?.url} controls={true} width="100%" />
          <Box sx={{ ...styleDescription, marginTop: 2 }}>
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
            height: {
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
              Sign Up Here
            </Box>
          </Box>

          <ReactPlayer light={welcome?.thumbnail} url={welcome?.url} controls={true} width="100%" />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Trailer;
