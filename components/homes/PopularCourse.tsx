import { Box, Container } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import SlickCarousel from '../share/SlickCarousel';
import Typography from '../share/Typography';
import styles from './PopularCourse/popularCourse.module.scss';

interface Props {
  popularCourse?: any;
}

const PopularCourse = ({ popularCourse }: Props) => {
  return (
    <Container sx={{ color: '#fff', my: 10 }}>
      <Box>
        <Typography variant="h4" component={'h2'} color="#fff" sx={{ mb: 3, fontSize: '32px' }}>
          Trending
        </Typography>
        <div>
          <SlickCarousel courses={popularCourse} />
        </div>

        <div className={styles['button-explore']}>
          <Link href={'#'} className={styles['explore-classes']}>
            Explore Classes
          </Link>
        </div>
      </Box>
    </Container>
  );
};

export default PopularCourse;
