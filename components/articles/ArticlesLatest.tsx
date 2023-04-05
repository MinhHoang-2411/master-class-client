import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

const data = [
  {
    name: 'How to Eat Crawfish in 4 Steps',
    des: 'Learning how to eat crawfish only adds to the experience of sitting down at a table with piles of napkins and good friends and family.',
    time: 'Feb 21, 2023',
    id: 1,
  },
  {
    name: 'Simple Cinnamon Butter Recipe: How to Make Cinnamon Butter',
    des: 'Cinnamon butter is an easy-to-make spread for breakfast foods, like oatmeal, and on dinner sides, like candied sweet potatoes. Learn how to make and serve cinnamon butter. Jump',
    time: 'Feb 23, 2023',
    id: 2,
  },
  {
    name: 'Pumpkin Cinnamon Rolls Recipe With Maple Frosting',
    des: 'Mix pumpkin pie filling into classic cinnamon roll dough for a gooey fall dessert. Learn how to prepare homemade pumpkin cinnamon rolls with maple syrup frosting. Jump to recipe.',
    time: 'Jan 25, 2023',
    id: 3,
  },
  {
    name: 'How to Taste Wine: 7 Tips From James Suckling',
    des: 'Homemade pumpkin muffins are simple to prepare. Learn how to customize and bake this popular autumnal treat. Jump to recipe.',
    time: 'Feb 11, 2023',
    id: 4,
  },
];
const ArticlesLatest = () => {
  const { t } = useTranslation('common');
  return (
    <Box sx={{ mr: 5 }}>
      <Box sx={{ pb: 1.5, borderBottom: '1px solid rgb(212, 213,217)' }}>
        <Typography
          component={'h4'}
          variant={'h4'}
          sx={{ fontSize: '14px', textTransform: 'uppercase' }}
        >
          {t('LATEST')}
        </Typography>
      </Box>

      {data.map((item: any, index: number) => (
        <Box
          key={item.id}
          sx={{
            mt: 2,
            mb: 3,
            pb: 1.5,
            borderBottom: `${index !== 3 ? '1px solid rgb(212, 213,217)' : ''}`,
          }}
        >
          <Typography component={'h3'} variant={'h4'} sx={{ fontSize: '18px', mt: 3 }}>
            {item.name}
          </Typography>
          <Typography
            component={'p'}
            variant={'h4'}
            sx={{ fontSize: '16px', fontWeight: 'normal', mt: 1 }}
          >
            {item.des}
          </Typography>
          <Typography
            component={'p'}
            variant={'body1'}
            sx={{ fontSize: '12px', mt: 1, opacity: '.6' }}
          >
            {item.time}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ArticlesLatest;
