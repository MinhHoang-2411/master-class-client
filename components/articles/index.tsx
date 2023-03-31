import { Box, Container, Grid, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Button from '../share/Button';
import ArticlesItem from './ArticlesItem';
import ArticlesLatest from './ArticlesLatest';
import ArticlesPopular from './ArticlesPopular';

interface IProps {}
const ArticlesComponent = ({}: IProps) => {
  return (
    <Container sx={{ backgroundColor: '#fff', color: '#262626', paddingTop: '48px' }}>
      <ArticlesItem />
      <Container>
        <Grid
          container
          columnSpacing={2}
          sx={{ display: 'flex', alignItems: 'flex-start', height: '100%', mt: 10 }}
        >
          <Grid item lg={8} md={8} xs={12}>
            <ArticlesLatest />
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
            <ArticlesPopular />
            <Box sx={{ mt: 4.5, backgroundColor: '#f3f3f3', p: '20px 24px' }}>
              <Typography component={'p'} variant={'h4'} sx={{ fontSize: '24px', mt: 1 }}>
                Stay Up To Date With Us
              </Typography>
              <Typography
                component={'p'}
                variant={'h4'}
                sx={{ fontSize: '16px', fontWeight: 'normal', mt: 1.5 }}
              >
                Be the first to know about new class launches and announcements.
              </Typography>
              <Typography component={'p'} variant={'h4'} sx={{ fontSize: '12px', mt: 2 }}>
                Your email address*
                <TextField
                  label={`Your email address`}
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 1.5 }}
                />
              </Typography>
              <Typography
                component={'p'}
                variant={'h4'}
                sx={{ fontSize: '12px', fontWeight: 'normal', mt: 1.5, mb: 2, opacity: '.6' }}
              >
                By sharing your email, you agree to our Terms of Service and Privacy Policy.
              </Typography>

              <Box sx={{ width: '100%' }}>
                <Button
                  sx={{
                    backgroundColor: '#43454C',
                    p: '12px 24px',
                    color: '#fff',
                    width: '100%',
                    borderRadius: '8px',
                    fontSize: '16px',
                    letterSpacing: '1px',
                    '&:hover': {
                      backgroundColor: '#303136 !important',
                    },
                  }}
                >
                  Subcribe
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default ArticlesComponent;
