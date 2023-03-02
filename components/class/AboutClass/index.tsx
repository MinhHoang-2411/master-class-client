import { isMappable } from '@/utils/helper';
import { Box, Container, Grid, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import CustomizedAccordions from './Accondion';
import VideoTrailer from './VideoTrailer';

const VideoPreview = dynamic(() => import('./VideoPreview'), {
  ssr: false,
});

interface Props {
  classes: any;
  categories: any;
}

const AboutClass = ({ classes, categories }: Props) => {
  const [listCategory, setListCategory] = useState<any>([]);

  useEffect(() => {
    setListCategory(categories?.filter((item: any) => classes?.categories?.includes(item?._id)));
  }, []);

  const [playingVideo, setPlayingVideo] = useState(false);
  const [lightVideo, setLightVideo] = useState(classes.videoPreview.thumbnail);

  const TimeConvert = () => {
    const totalTime = classes?.lessons?.reduce(
      (accumulator: any, currentValue: any) => accumulator + currentValue.duration,
      0
    );
    const duration = Math.floor(totalTime);
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration - hours * 3600) / 60);
    const remainingSeconds = duration - hours * 3600 - minutes * 60;
    return `${hours > 0 ? `${hours.toString().padStart(2, '0')} hours ` : ''}${
      minutes > 0 ? `${minutes.toString().padStart(2, '0')} minutes ` : ''
    }${remainingSeconds > 0 ? `${remainingSeconds.toString().padStart(2, '0')} seconds` : ''}`;
  };

  return (
    <>
      <Container sx={{ py: 3 }}>
        <Box>
          <h2>About this class</h2>
        </Box>
        <Grid
          container
          columnSpacing={2}
          sx={{ display: 'flex', alignItems: 'center', height: '100%' }}
        >
          <Grid item lg={8} md={8} xs={12}>
            <Box>
              <VideoPreview
                lightVideo={lightVideo}
                url={classes.videoPreview?.url}
                playingVideo={playingVideo}
                setLightVideo={setLightVideo}
                setPlayingVideo={setPlayingVideo}
              />
            </Box>
          </Grid>

          <Grid
            item
            lg={4}
            md={4}
            xs={12}
            sx={{
              height: '360px',
              overflow: 'scroll',
            }}
          >
            <VideoTrailer
              playing={playingVideo}
              setPlaying={setPlayingVideo}
              setLight={setLightVideo}
            />

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
                  duration={lesson?.duration}
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
