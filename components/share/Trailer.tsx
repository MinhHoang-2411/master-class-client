import { authActions } from '@/store/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';

import FeaturedPreview from '../trailer/featured-preview';
import Video from '../trailer/video';

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
};

const styleBtnSignUp = {
  backgroundColor: '#e32652',
  padding: '12px 24px',
  cursor: 'pointer',
  width: '180px',
  height: '40px',
  borderRadius: '8px',
  fontSize: '18px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  margin: 'auto',
  marginTop: '15px',
  marginBottom: '15px',
  '&:hover': {
    backgroundColor: '#d61a46',
  },
};

interface TrailerModel {
  listBanners?: string[];
}

const Trailer: React.FC<TrailerModel> = ({}) => {
  const dispatch = useAppDispatch();

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
          <Video />
          <Box sx={styleDescription}>
            <span>
              Experience, Absorb & Transform your Life, Relationships, Health, Business, Wealth &
              Spirituality in just 10 minutes a day with Life Changing Lessons in our short clip
              format to ensure you absorb and are able to use the skills Now!
            </span>
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
              xs: '500px !important',
              sm: '500px !important',
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
            <span>
              Enjoy Unlimited access to All videos from all trainers from every corner of the world.
              From as low as $10 per month.
            </span>
          </Box>
          <Box sx={styleBtnSignUp} onClick={() => dispatch(authActions.openSignUpModal())}>
            Sign Up Here
          </Box>
          <Video />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Trailer;
