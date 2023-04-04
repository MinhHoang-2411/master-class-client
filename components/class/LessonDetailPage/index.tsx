import PrimaryButton from '@/components/share/PrimaryButton';
import { authActions } from '@/store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { paymentActions } from '@/store/payment/paymentSlice';
import { watchingActions } from '@/store/watching/watchingSlice';
import { getAuth } from '@/utils/auth';
import { isMappable } from '@/utils/helper';
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import LockIcon from '@mui/icons-material/Lock';

import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
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
  //payment

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const loadingCheckPayment = useAppSelector((state) => state.payment.loadingCheckPayment);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const [listCategory, setListCategory] = useState<any>([]);
  const [playingVideo, setPlayingVideo] = useState(false);
  const [lightVideo, setLightVideo] = useState<any>(false);
  const playedRef = useRef<any>(null);
  const [playedEnded, setPlayedEnded] = useState(false);

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

  const handleClickPreviewVideo = () => {
    if (isLoggedIn) {
      if (!isPayment) {
        dispatch(paymentActions.openModalChoosePayment());
      }
    } else {
      localStorage.setItem('SubscribePopup', 'true');
      dispatch(authActions.openSignInModal());
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUser = JSON.parse(localStorage.getItem('ACCESS_TOKEN') as string);
      if (currentUser) {
        const valueWatching: any = localStorage.getItem('myWatching');
        const params: any = JSON.parse(valueWatching);
        if (params?.secondLastView > 0) {
          dispatch(watchingActions.handleCreateAndUpdateMyWatching(params));
        }
      }
    }
    const handleBackButton = (event: any) => {
      const params = JSON.parse(event.currentTarget.localStorage.myWatching);
      if (params?.secondLastView > 0) {
        dispatch(watchingActions.handleCreateAndUpdateMyWatching(params));
      }
    };
    window.addEventListener('popstate', handleBackButton);
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  useEffect(() => {
    setListCategory(categories?.filter((item: any) => classes?.categories?.includes(item?._id)));
    setLightVideo(lesson?.thumbnail);
  }, [lesson, classes]);

  const onSavedValueWacthing = useCallback(
    (playedSeconds: number, lessonId: string, playedEnded: boolean, hisId: string) => {
      const params = {
        lessonId: lessonId,
        secondLastView: playedSeconds,
        isFinished: playedEnded,
        historyLessonId: hisId,
      };
      localStorage.setItem('myWatching', JSON.stringify(params));
    },
    []
  );

  const onChangeVideoLesson = (lessonId: string, index: number) => {
    handleChangeLesson(lessonId, index);
    const myWatching: any = localStorage.getItem('myWatching');
    const _value = JSON.parse(myWatching);
    if (playingVideo) {
      dispatch(watchingActions.handleCreateAndUpdateMyWatching(_value));
    }
    setPlayingVideo(false);
  };

  const onPauseVideo = () => {
    const myWatching: any = localStorage.getItem('myWatching');
    const _value = JSON.parse(myWatching);
    const params = {
      lessonId: lesson?._id,
      secondLastView: _value?.secondLastView,
      isFinished: false,
      historyLessonId: lesson?.historylessons?._id,
    };
    setPlayedEnded(false);
    dispatch(watchingActions.handleCreateAndUpdateMyWatching(params));
    setPlayingVideo(false);
  };

  const onEndedVideo = () => {
    const myWatching: any = localStorage.getItem('myWatching');
    const _value = JSON.parse(myWatching);
    const params = {
      lessonId: lesson?._id,
      secondLastView: _value?.secondLastView,
      isFinished: true,
      historyLessonId: lesson?.historylessons?._id,
    };
    setPlayedEnded(true);
    dispatch(watchingActions.handleCreateAndUpdateMyWatching(params));
    setPlayingVideo(false);
  };

  return (
    <main className={styles.page_content}>
      <Container>
        <Grid
          container
          spacing={2}
          sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}
          className={styles.bodyChapter}
        >
          <Grid item xs={12}>
            <Typography
              sx={{ color: '#fff', fontWeight: 600, textTransform: 'none' }}
              variant="h3"
              component="h1"
            >
              {classes?.lessons?.[indexSelectedLesson]?.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ color: '#ccc' }}>
              {classes?.lessons?.[indexSelectedLesson]?.description}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}
          className={styles.bodyChapter}
          spacing={2}
        >
          <Grid item lg={8} md={8} xs={12} className={styles.lessonVideo}>
            {loadingCheckPayment ? (
              <div className={styles.lessonOverlay}>
                <div className={styles.contentOverlay}>
                  <h2>Loading...</h2>
                </div>
              </div>
            ) : isPayment ? (
              <></>
            ) : (
              <div className={styles.lessonOverlay}>
                <div className={styles.contentOverlay}>
                  <h2>{t('Subscribe to TheRaisedHands to watch lessons')}</h2>
                  <span>
                    {t('Starting at $24.99/month (billed annually) for all classes and sessions')}
                  </span>
                  <PrimaryButton onClick={handleClickPreviewVideo}>{t('Subscribe')}</PrimaryButton>
                </div>
              </div>
            )}
            <PlayVideoLesson
              lightVideo={
                isPayment ? lightVideo : classes?.lessons?.[indexSelectedLesson]?.thumbnail
              }
              url={isPayment ? lesson?.videoUrl : classes?.videoPreview?.url}
              playingVideo={playingVideo}
              setLightVideo={setLightVideo}
              setPlayingVideo={setPlayingVideo}
              height={`400px`}
              onSavedValueWacthing={onSavedValueWacthing}
              lesson={lesson}
              playedRef={playedRef}
              onPauseVideo={onPauseVideo}
              onEndedVideo={onEndedVideo}
              setPlayedEnded={setPlayedEnded}
              playedEnded={playedEnded}
            />
          </Grid>

          <Grid item lg={4} md={4} xs={12}>
            <Box className={styles.lessonPlan}>
              <h2>{t('LESSON PLAN')}</h2>
              <Box sx={{ p: 2 }}>
                <List
                  component="nav"
                  aria-label="secondary mailbox folder"
                  className={styles.navLesson}
                >
                  <Stack spacing={1}>
                    {isMappable(classes.lessons) ? (
                      classes?.lessons?.map((lesson: any, index: number) => (
                        <ListItemButton
                          selected={indexSelectedLesson === index}
                          onClick={() => {
                            onChangeVideoLesson(lesson?._id, index);
                          }}
                          key={lesson?._id}
                          sx={{
                            transition: 'all 0s ease-in',
                            borderRadius: '8px',
                            backgroundColor: '#fff',
                            color: '#444444',
                            '&.Mui-selected': {
                              background: '#5c5c5c',
                              color: '#fff',
                            },
                            '&.Mui-selected:hover': {
                              background: '#5c5c5c',
                              color: '#fff',
                            },
                            ':hover': {
                              background: '#5c5c5c',

                              color: '#fff',
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: '30px',
                              width: '30px',
                              height: '30px',
                              borderRadius: '100%',
                              background: isPayment ? 'rgba(203, 132, 97, 1)' : '#ccc',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              mr: 2,
                            }}
                            onClick={(e) => {
                              if (indexSelectedLesson === index && isPayment) {
                                e.stopPropagation();
                                setLightVideo(false);
                                setPlayingVideo(!playingVideo);
                                console.log({ playingVideo });
                              }
                            }}
                          >
                            {!isPayment ? (
                              <LockIcon />
                            ) : indexSelectedLesson === index ? (
                              playingVideo && !lightVideo ? (
                                <PauseIcon sx={{ color: 'white' }} />
                              ) : (
                                <PlayArrowIcon sx={{ color: 'white' }} />
                              )
                            ) : (
                              <PlayArrowIcon sx={{ color: 'white' }} />
                            )}
                          </ListItemIcon>
                          <ListItemText primary={`${index + 1}. ${lesson?.title}`} />
                        </ListItemButton>
                      ))
                    ) : (
                      <></>
                    )}
                  </Stack>
                </List>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          sx={{ display: 'flex', height: '100%', width: '100%' }}
          className={styles.bodyChapter}
        >
          <Grid item xs={8}>
            <Box sx={{ pb: 2 }}>
              <Typography variant="h3" sx={{ color: '#fff', fontSize: '32px', fontWeight: '600' }}>
                {t('About the Instructor')}
              </Typography>
              <p style={{ color: '#ccc' }}>{classes?.overview?.description}</p>
            </Box>
            <Button
              sx={{
                color: '#000000',
                background: '#fff',
                borderRadius: '100px',
                textTransform: 'capitalize',
                padding: '24px 48px',
                fontWeight: 600,
                transition: 'all 0s ease',
                '&:hover': {
                  background: 'linear-gradient(94.87deg, #FFB7E4 20.12%, #34DBEB 87.72%)',
                },
              }}
              onClick={() => router.push(`/classes/${router.query.id}`)}
            >
              {t('Explore the class')}
            </Button>
          </Grid>
          <Grid
            item
            xs={4}
            // sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
              <Avatar alt="avatar" src={classes.thumbnail} sx={{ width: 60, height: 60 }} />
              <Stack direction="column">
                <span
                  style={{ fontWeight: 'bold', cursor: 'pointer', letterSpacing: '.2px' }}
                  onClick={() => router.push(`/classes/${router.query.id}`)}
                >
                  {classes?.authorName}
                </span>
                <span style={{ color: '#ccc', fontSize: '12px' }}>{`${
                  classes.lessons.length
                } videos (${TimeConvert(
                  classes?.lessons?.[indexSelectedLesson]?.duration
                )})`}</span>
              </Stack>
            </Stack>
            <Typography sx={{ fontWeight: 'bold', fontSize: '12px', pl: 0.2 }} component="p">
              <span style={{ color: '#ccc', fontSize: '12px' }}>Categories:</span>{' '}
              {isMappable(listCategory)
                ? listCategory.map((cate: any, index: number) => cate?.name).join(', ')
                : ''}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default LessonDetailPageComponent;
