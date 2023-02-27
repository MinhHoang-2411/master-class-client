import React, { useEffect, useState } from 'react';
import { Container, Box, Grid, Typography, Accordion } from '@mui/material';
import CustomizedAccordions from './Accondion';
import dynamic from 'next/dynamic';
import VideoTrailer from './VideoTrailer';

const PlayVideo = dynamic(() => import('./PlayVideo'), {
  ssr: false,
});

interface Props {
  classes: any;
  categories: any;
}

const isMappable = (array: object[]): boolean => {
  if (Array.isArray(array)) return array.length > 0;
  return false;
};

const AboutClass = ({ classes, categories }: Props) => {
  const [listCategory, setListCategory] = useState<any>([]);

  useEffect(() => {
    setListCategory(categories?.filter((item: any) => classes?.categories?.includes(item?._id)));
  }, []);

  const [playing, setPlaying] = useState(false);

  const TimeConvert = () => {
    const time = classes?.lessons?.reduce(
      (accumulator: any, currentValue: any) => accumulator + currentValue.duration,
      0
    );
    let hours = Math.floor(time / 60);
    let minutes = Math.floor(time % 60);
    return `${hours > 0 ? `${hours} hour` : ''} ${minutes > 0 ? `${minutes} minute` : ''}`;
  };

  return (
    <>
      <Container sx={{ py: 3 }}>
        <Box>
          <h2>About this class</h2>
        </Box>
        <Grid container columnSpacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
          <Grid item lg={8} md={8} xs={12}>
            <Box>
              <PlayVideo
                videoPreview={classes.videoPreview}
                playing={playing}
                setPlaying={setPlaying}
              />
            </Box>
          </Grid>

          <Grid
            item
            lg={4}
            md={4}
            xs={12}
            sx={{
              height: '350px',
              overflow: 'scroll',
            }}
          >
            <VideoTrailer playing={playing} setPlaying={setPlaying} />

            <Typography
              variant="body2"
              component={'h3'}
              sx={{ color: '#fff', fontWeight: 'bold', mt: 2, mb: 1 }}
            >
              Browse Lesson Plan
            </Typography>

            {isMappable(classes?.lessons) ? (
              classes?.lessons?.map((lesson: any, index: number) => (
                <CustomizedAccordions
                  title={lesson?.title}
                  description={lesson?.description}
                  index={index}
                  key={lesson?.index}
                />
              ))
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
        <Grid container columnSpacing={2} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Grid item lg={8} md={8} xs={12}>
            <Box>
              <Typography sx={{ opacity: '.6', fontSize: '14px' }} component="p">
                {classes?.overview?.description}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', pt: '24px', pb: '8px' }}>
              <Typography sx={{ opacity: '.6', fontSize: '14px' }} component="p">
                Instructor(s):
              </Typography>
              <Typography sx={{ fontWeight: 'bold', fontSize: '14px', pl: 1 }} component="p">
                {classes?.authorName}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', pb: '8px' }}>
              <Typography sx={{ opacity: '.6', fontSize: '14px' }} component="p">
                Class Length:
              </Typography>
              <Typography sx={{ fontWeight: 'bold', fontSize: '14px', pl: 1 }} component="p">
                {`${classes?.lessons?.length} video lessons (${TimeConvert()})`}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', pb: '8px' }}>
              <Typography sx={{ opacity: '.6', fontSize: '14px' }} component="p">
                Category:
              </Typography>
              <Typography sx={{ fontWeight: 'bold', fontSize: '14px', pl: 1 }} component="p">
                {isMappable(listCategory)
                  ? listCategory.map((cate: any, index: number) => (
                      <>{`${cate.name} ${index + 1 !== listCategory.length ? '||' : ''}`}</>
                    ))
                  : ''}
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={4} md={4} xs={12}></Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AboutClass;
