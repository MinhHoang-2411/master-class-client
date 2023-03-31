import { Box, CardMedia, Container, Grid, Typography } from '@mui/material';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

interface IProps {}
const ArticlesItem = ({}: IProps) => {
  return (
    <Container sx={{ backgroundColor: '#fff', color: '#262626', paddingTop: '48px' }}>
      <Box sx={{ borderBottom: '1px solid rgb(212, 213,217)', pb: 2 }}>
        <Typography component={'h2'} variant={'h4'}>
          Food
        </Typography>
      </Box>
      <Box>
        <Grid
          container
          columnSpacing={2}
          sx={{ display: 'flex', alignItems: 'flex-start', height: '100%', mt: 10 }}
        >
          <Grid item lg={7} md={7} xs={12}>
            <Box sx={{ pr: 4 }}>
              <Typography
                component={'h4'}
                variant={'h4'}
                sx={{ fontSize: '16px', textTransform: 'uppercase', opacity: '.6' }}
              >
                Food
              </Typography>
              <Typography component={'h2'} variant={'h4'} sx={{ fontSize: '48px', mt: 2.5 }}>
                How to Smoke Brisket With Barbeque Pitmaster Aaron Franklin
              </Typography>
              <Typography
                component={'h4'}
                variant={'h6'}
                sx={{ fontSize: '20px', mt: 2, fontWeight: 'normal' }}
              >
                Award-winning barbeque pitmaster Aaron Franklin shares his tips for how to smoke a
                brisket, including how to choose, prepare, and season this cut of beef.
              </Typography>
              <Typography
                component={'h4'}
                variant={'body1'}
                sx={{ fontSize: '12px', mt: 1, opacity: '.6' }}
              >
                Sep 10, 2021
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={5} md={5} xs={12}>
            <img
              title="image"
              src="http://static1.squarespace.com/static/53b839afe4b07ea978436183/53bbeeb2e4b095b6a428a13e/5fd2570b51740e23cce97919/1678505081247/traditional-food-around-the-world-Travlinmad.jpg?format=1500w"
              style={{ objectFit: 'cover', width: '460px', height: '460px' }}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ArticlesItem;
