import { Box, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
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
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default ArticlesComponent;
