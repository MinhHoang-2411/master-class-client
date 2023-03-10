import { useAppDispatch } from '@/store/hooks';
import { isMappable } from '@/utils/helper';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import styles from './../../../styles/classes.module.scss';
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
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const [listCategory, setListCategory] = useState<any>([]);
  const [playingVideo, setPlayingVideo] = useState(false);
  const [lightVideo, setLightVideo] = useState<any>(false);

  useEffect(() => {
    setListCategory(categories?.filter((item: any) => classes?.categories?.includes(item?._id)));
    setLightVideo(classes?.videoPreview?.thumbnail)
  }, [classes]);

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
          <h2>{t('about-this-class')}</h2>
        </Box>
        <Grid
          container
          columnSpacing={2}
          sx={{ display: 'flex', alignItems: 'center', height: '100%' }}
        >
          <Grid item lg={8} md={8} xs={12}>
            <Box className={!playingVideo && !lightVideo ? styles.videoPreview : ''}>
              <VideoPreview
                lightVideo={lightVideo}
                url={classes?.videoPreview?.url}
                playingVideo={playingVideo}
                setLightVideo={setLightVideo}
                setPlayingVideo={setPlayingVideo}
              />
              {/* {!playingVideo && !lightVideo ? (
                <div className={styles.videoPreviewContent}>
                  <div className={styles.textHeading}>
                    <p>Original Series Trailer</p>
                  </div>
                  <div className={styles.textMain}>
                    <div className={styles.contentMain}>
                      <h5>Subscribe to MasterClass to continue watching</h5>
                      <p>Starting at $15/month (billed annually)</p>
                      <button onClick={() => dispatch(authActions.openSignUpModal())}>
                        Sign Up
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )} */}
            </Box>
          </Grid>

          <Grid item lg={4} md={4} xs={12} className={styles.accondionParent}>
            <div className={styles.accondionItem}>
              <div>
                <VideoTrailer
                  playing={playingVideo}
                  setPlaying={setPlayingVideo}
                  setLight={setLightVideo}
                />
              </div>

              <div className="">
                <Typography
                  variant="body2"
                  component={'h3'}
                  sx={{ color: '#fff', fontWeight: 'bold', mt: 2, mb: 1 }}
                >
                  {t('browse-lesson-plan')}
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
              </div>
            </div>
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
                {`${t('instructor')}:`}
              </Typography>
              <Typography sx={{ fontWeight: 'bold', fontSize: '14px', pl: 1 }} component="p">
                {classes?.authorName}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', pb: '8px' }}>
              <Typography sx={{ opacity: '.6', fontSize: '14px' }} component="p">
                {`${t('class-length')}:`}
              </Typography>
              <Typography sx={{ fontWeight: 'bold', fontSize: '14px', pl: 1 }} component="p">
                {`${classes?.lessons?.length} video lessons (${TimeConvert()})`}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', pb: '8px' }}>
              <Typography sx={{ opacity: '.6', fontSize: '14px' }} component="p">
                {`${t('category')}:`}
              </Typography>
              <Typography sx={{ fontWeight: 'bold', fontSize: '14px', pl: 1 }} component="p">
                {isMappable(listCategory)
                  ? listCategory.map((cate: any, index: number) => (
                      <>{`${cate.name}${index + 1 !== listCategory.length ? ', ' : ''}`}</>
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
