import { Box, Container } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import SlickCarousel from '../share/SlickCarousel';
import Typography from '../share/Typography';
import styles from './PopularCourse/popularCourse.module.scss';

interface Props {
  newCourse?: any;
}

const NewClass = ({ newCourse }: Props) => {
  return (
    <Container sx={{ color: '#fff', my: 10 }}>
      <Box>
        <Typography variant="h4" component={'h2'} color="#fff" sx={{ mb: 3, fontSize: '32px' }}>
          New Classes
        </Typography>
        <div>
          <SlickCarousel courses={newCourse} />
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

export default NewClass;
