import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { isMappable } from '@/utils/helper';
import { Avatar, Box, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
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
  const listCategories = useAppSelector((state) => state.categories.listData);
  const router = useRouter();
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const [listCategory, setListCategory] = useState<any>([]);
  const [playingVideo, setPlayingVideo] = useState(false);
  const [lightVideo, setLightVideo] = useState<any>(false);

  useEffect(() => {
    setListCategory(
      listCategories?.filter((item: any) =>
        classes?.categories?.some((cl: any) => cl === item?.name)
      )
    );
    setLightVideo(classes?.videoPreview?.thumbnail);
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
        <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
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

          <Grid item lg={4} md={4} xs={12}>
            <Box className={styles.accondionParent}>
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
                        lessonId={lesson?.id}
                      />
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </Box>
          </Grid>
        </Grid>
        <Grid container columnSpacing={2} sx={{ mt: 2 }}>
          <Grid item lg={8} md={8} xs={12}>
            <Box>
              <Typography sx={{ opacity: '.6', fontSize: '14px' }} component="p">
                {classes?.overview?.description}
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Avatar alt="avatar" src={classes?.thumbnail} sx={{ width: 80, height: 80 }} />
              <Stack direction="column">
                <span
                  style={{
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '20px',
                    letterSpacing: '.2px',
                  }}
                  onClick={() => router.push(`/classes/${router.query.id}`)}
                >
                  {classes?.authorName}
                </span>
                <span style={{ color: '#808080', fontSize: '14px' }}>{`${
                  classes?.lessons?.length
                } video lessons (${TimeConvert()})`}</span>
              </Stack>
            </Stack>
            <Divider sx={{ border: '.8px solid #343839' }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 3 }}>
              <Box sx={{ mb: '20px' }}>
                <Typography
                  sx={{
                    color: '#fff',
                    fontSize: '20px',
                    fontWeight: '600',
                    textTransform: 'capitalize',
                  }}
                  component="p"
                >
                  {`${t('categories')}`}
                </Typography>
              </Box>

              <Box sx={{ display: 'inline-flex', flexWrap: 'wrap', gap: '12px' }}>
                {isMappable(listCategory) ? (
                  listCategory.map((cate: any, index: number) => (
                    <Box
                      onClick={() => router.push(`/categories/${cate?.url}`)}
                      key={cate?.id || index}
                      sx={{
                        cursor: 'pointer',
                        p: '8px 16px',
                        color: '#6C7275',
                        border: '1px solid #343839',
                        borderRadius: '6px',
                        background: 'transparent',
                        fontSize: '12px',
                        '&: hover': {
                          background: '#FFEA7C',
                          color: '#232627',
                        },
                      }}
                    >
                      {cate.name}
                    </Box>
                  ))
                ) : (
                  <></>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AboutClass;
