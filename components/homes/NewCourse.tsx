import { Box, Container } from '@mui/material';
import React from 'react';
import SlickCarousel from '../share/SlickCarousel';
import Typography from '../share/Typography';

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
      </Box>
    </Container>
  );
};

export default NewClass;
