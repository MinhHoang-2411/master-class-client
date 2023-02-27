import { authActions } from '@/store/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';

import FeaturedPreview from '../trailer/featured-preview';
import Video from '../trailer/video';
import styles from '../../styles/layout-page.module.scss';

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
          <Video
            imgPreview={
              'https://www.masterclass.com/course-images/attachments/ZToYAorFLp4Z3soMacJpXnCX?width=3840&quality=75&format=webp'
            }
          />
          <Box sx={styleDescription}>
            <span className={styles.description}>
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
            <span className={styles.description}>
              Enjoy Unlimited access to All videos from all trainers from every corner of the world.
              From as low as $10 per month.
            </span>
            <Box sx={styleBtnSignUp} onClick={() => dispatch(authActions.openSignUpModal())}>
              Sign Up Here
            </Box>
          </Box>

          <Video
            imgPreview={
              'https://www.masterclass.com/course-images/attachments/LwLc5ytE4B6CoNZKT6TjgXqL?width=3840&quality=75&format=webp'
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Trailer;
