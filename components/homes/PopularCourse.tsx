import { Box, Container, Stack } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'next-i18next';
import SlickCarousel from '../share/SlickCarousel';
import Typography from '../share/Typography';
import styles from './PopularCourse/popularCourse.module.scss';
import { StackedBarChartSharp } from '@mui/icons-material';

interface Props {
  popularCourse?: any;
}

const PopularCourse = ({ popularCourse }: Props) => {
  const { t } = useTranslation('common');
  return (
    <Container sx={{ color: '#fff', my: 10 }}>
      <Box>
        <Stack direction="row" spacing={1} sx={{ mb: 3 }} alignItems="flex-end">
          <Typography variant="h4" component={'h2'} color="#fff" sx={{ fontSize: '32px' }}>
            {t('trending')}
          </Typography>
          <Link
            style={{ cursor: 'pointer', textDecoration: 'none' }}
            href="/categories/all-classes"
          >
            <Typography
              variant="h6"
              sx={{ color: '#9ea0a9', fontSize: '20px', textTransform: 'none' }}
            >
              {t('See all')}
            </Typography>
          </Link>
        </Stack>
        <div>
          <SlickCarousel courses={popularCourse} />
        </div>

        <div className={styles['button-explore']}>
          <Link href={'#'} className={styles['explore-classes']}>
            {t('explore-classes')}
          </Link>
        </div>
      </Box>
    </Container>
  );
};

export default PopularCourse;
