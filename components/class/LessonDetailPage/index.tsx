import { authActions } from '@/store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { paymentActions } from '@/store/payment/paymentSlice';
import { isMappable } from '@/utils/helper';
import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../../styles/lessons-page.module.scss';

const PlayVideoLesson = dynamic(() => import('./PlayVideoLesson'), { ssr: false });

interface Iprops {
  classes: any;
  categories: any;
  lesson: any;
  indexSelectedLesson: number;
  handleChangeLesson: any;
  isPayment: boolean;
}

const LessonDetailPageComponent = ({
  classes,
  categories,
  lesson,
  indexSelectedLesson,
  handleChangeLesson,
  isPayment,
}: Iprops) => {
  const { t } = useTranslation();
  const [listCategory, setListCategory] = useState<any>([]);
  const [playingVideo, setPlayingVideo] = useState(false);
  const [lightVideo, setLightVideo] = useState<any>(false);
  const router = useRouter();

  useEffect(() => {
    setListCategory(categories?.filter((item: any) => classes?.categories?.includes(item?._id)));
    setLightVideo(lesson?.thumbnail);
    setOverlayVideo(!isPayment);
  }, [lesson, classes]);

  const TimeConvert = (time: number) => {
    const duration = Math.floor(time);
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration - hours * 3600) / 60);
    const remainingSeconds = duration - hours * 3600 - minutes * 60;
    return `${hours > 0 ? `${hours.toString().padStart(2, '0')} ${t('hours')} ` : ''}${
      minutes > 0 ? `${minutes.toString().padStart(2, '0')} ${t('minutes')} ` : ''
    }${
      remainingSeconds > 0 ? `${remainingSeconds.toString().padStart(2, '0')} ${t('seconds')}` : ''
    }`;
  };

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();

  const [overlayVideo, setOverlayVideo] = useState(!isPayment);

  const handleClickPreviewVideo = () => {
    if (isLoggedIn) {
      if (isPayment) {
        setOverlayVideo(false);
      } else {
        dispatch(paymentActions.openModalChoosePayment());
      }
    } else {
      dispatch(authActions.openSignInModal());
    }
  };

  // useEffect(() => {
  //   const handleUnload = (event: any) => {
  //     localStorage.setItem('lessonTime', '200');
  //     event.preventDefault();
  //     return (event.returnValue = 'Are you sure you want to leave?');
  //   };

  //   window.addEventListener('beforeunload', handleUnload);

  //   return () => {
  //     // cleanUpFunc
  //     window.removeEventListener('beforeunload', handleUnload);
  //   };
  // }, []);

  return (
    <main className={styles.page_content}>
      <Container>
        <Box className={styles.sectionChapter}>
          <div className={styles.sectionChapterHeader}>
            <Typography
              sx={{ fontWeight: 'bold', fontSize: '14px', pl: 0.2, textTransform: 'uppercase' }}
              component="p"
            >
              {isMappable(listCategory)
                ? listCategory.map((cate: any, index: number) => (
                    <>{`${cate.name}${index + 1 !== listCategory.length ? ', ' : ''}`}</>
                  ))
                : ''}
            </Typography>
            <h1>{classes?.lessons?.[indexSelectedLesson]?.title}</h1>

            <div className={styles.authorDes}>
              <Avatar alt="avatar" src={classes.thumbnail} sx={{ width: 60, height: 60 }} />
              <div className={styles.authorName}>
                <span
                  style={{ fontWeight: 'bold', cursor: 'pointer', letterSpacing: '.2px' }}
                  onClick={() => router.push(`/classes/${router.query.id}`)}
                >
                  {classes?.authorName}
                </span>
                <span className={styles.lessonTime}>{`${t('Lesson time')} ${TimeConvert(
                  classes?.lessons?.[indexSelectedLesson]?.duration
                )}`}</span>
              </div>
            </div>
            <Divider sx={{ border: '.5px solid #D4D5D9' }} />

            <div className={styles?.title}>
              <span>{classes?.lessons?.[indexSelectedLesson]?.description}</span>
            </div>
          </div>
        </Box>

        <Grid
          container
          sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}
          className={styles.bodyChapter}
          columnSpacing={2}
        >
          <Grid item lg={8} md={8} xs={12} className={styles.lessonVideo}>
            {overlayVideo ? (
              <div onClick={handleClickPreviewVideo} className={styles.lessonOverlay}>
                <div className={styles.contentOverlay}>
                  <h2>{t('Subscribe to TheRaisedHands to watch lessons')}</h2>
                  <span>
                    {t('Starting at $24.99/month (billed annually) for all classes and sessions')}
                  </span>
                  <button>{t('Subscribe')}</button>
                </div>
              </div>
            ) : (
              <></>
            )}
            <PlayVideoLesson
              lightVideo={
                isPayment ? lightVideo : classes?.lessons?.[indexSelectedLesson]?.thumbnail
              }
              url={isPayment ? lesson?.videoUrl : classes.videoPreview?.url}
              playingVideo={playingVideo}
              setLightVideo={setLightVideo}
              setPlayingVideo={setPlayingVideo}
              height={`400px`}
            />
          </Grid>

          <Grid item lg={4} md={4} xs={12}>
            <Box className={styles.lessonPlan}>
              <h2>{t('LESSON PLAN')}</h2>
              <Box>
                <List
                  component="nav"
                  aria-label="secondary mailbox folder"
                  className={styles.navLesson}
                >
                  {isMappable(classes.lessons) ? (
                    classes.lessons.map((lesson: any, index: number) => (
                      <>
                        <ListItemButton
                          selected={indexSelectedLesson === index}
                          onClick={() => handleChangeLesson(lesson?._id, index)}
                          key={lesson?._id}
                          sx={{
                            '&.Mui-selected': {
                              backgroundColor: 'rgb(48, 49, 54)',
                            },
                            ':hover': {
                              backgroundColor: 'rgb(48, 49, 54)',
                            },
                          }}
                        >
                          <ListItemText primary={`${index + 1}. ${lesson?.title}`} />
                        </ListItemButton>
                      </>
                    ))
                  ) : (
                    <></>
                  )}
                </List>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box>
          <Box sx={{ pb: 2, mt: 5 }}>
            <h2>{t('About the Instructor')}</h2>
            <p>{classes?.overview?.description}</p>
          </Box>
          <Divider sx={{ border: '.5px solid #D4D5D9' }} />
          <Box sx={{ mt: 5 }}>
            <div className={styles.exploreAuthor}>
              <div className={styles.exploreAuthorLeft}>
                <Avatar alt="avatar" src={classes?.thumbnail} sx={{ width: 128, height: 128 }} />
              </div>
              <div className={styles.exploreAuthorRight}>
                <h4>{t('FEATURED THERAISEDHANDS INSTRUCTOR')}</h4>
                <h2>{classes?.authorName}</h2>
                <p>{classes?.name}</p>
                <div className={styles.buttonExplore}>
                  <button onClick={() => router.push(`/classes/${router.query.id}`)}>
                    {t('Explore the class')}
                  </button>
                </div>
              </div>
            </div>
          </Box>
        </Box>
      </Container>
    </main>
  );
};

export default LessonDetailPageComponent;
