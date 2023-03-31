import { Box, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

const data = [
  {
    name: 'A Basic Guide to Media Literacy: How to Be Media Literate',
    srcImg: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__480.jpg',
    _id: 1,
  },
  {
    name: 'Double Declining Balance Method: Calculating DDB Depreciation',
    srcImg:
      'https://rewildingbritain.imgix.net/images/What-are-natural-processes.jpg?auto=format&crop=focalpoint&domain=rewildingbritain.imgix.net&fit=crop&fp-x=0.5&fp-y=0.5&h=1125&ixlib=php-3.3.1&q=82&usm=20&w=2000',
    _id: 2,
  },
  {
    name: 'How to Freeze Grapes: 5 Ways to Use Frozen Grapes',
    srcImg:
      'https://www.travelonline.com/news/5-natural-landscapes-so-incredible-you-wont-believe-theyre-real-72515-ws.jpg',
    _id: 3,
  },
  {
    name: 'Sound Art Guide: Understanding the Elements of Sound Art',
    srcImg:
      'https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2015/07/27/1331737542701_2/moon-hill-natural-bridge-in-china',
    _id: 4,
  },
];
const ArticlesPopular = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <Box sx={{ pb: 1.5, borderBottom: '1px solid rgb(212, 213,217)' }}>
        <Typography
          component={'h4'}
          variant={'h4'}
          sx={{ fontSize: '14px', textTransform: 'uppercase' }}
        >
          {t('POPULAR ARTICLES')}
        </Typography>
      </Box>

      {data.map((item: any) => (
        <Box
          key={item._id}
          sx={{
            mt: 2,
            mb: 3,
            pb: 1.5,
            borderBottom: '1px solid rgb(212, 213,217)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ flex: 4 }}>
            <Typography component={'h3'} variant={'h4'} sx={{ fontSize: '14px', mr: 2 }}>
              {item.name}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <img title="image" src={item.srcImg} style={{ width: '70px', height: '40px' }} />
          </Box>
        </Box>
      ))}
    </>
  );
};

export default ArticlesPopular;
