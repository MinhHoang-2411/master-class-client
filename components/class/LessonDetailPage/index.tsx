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
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import PauseIcon from '@mui/icons-material/Pause';
// import LockIcon from '@mui/icons-material/Lock';

import PlayIcon from '../../../public/icons/classes/playVideo.svg';
import PauseIcon from '../../../public/icons/classes/pause.svg';
import LockIcon from '../../../public/icons/classes/lock.svg';

import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from '../../../styles/lessons-page.module.scss';
import Image from 'next/image';
import { classActions } from '@/store/class/classSlice';

const PlayVideoLesson = dynamic(() => import('./PlayVideoLesson'), { ssr: false });

interface Iprops {
  classes: any;
  categories: any;
  lesson: any;
  indexSelectedLesson: number;
  handleChangeLesson: any;
  isPayment: boolean;
}

interface Category {
  exist?: boolean;
  createdAt?: string;
  isActive?: boolean;
  name?: string;
  priority?: number;
  updatedAt?: string;
  id?: string;
  url?: string;
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
  const categoriesRedux = useAppSelector((state) => state.categories.listData);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  //test
  const authName = useAppSelector((state) => state.class.authorName);

  const loadingCheckPayment = useAppSelector((state) => state.payment.loadingCheckPayment);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const listCategories = useAppSelector((state) => state.categories.listData);

  const [listCategory, setListCategory] = useState<any>([]);
  const [playingVideo, setPlayingVideo] = useState(false);
  const [lightVideo, setLightVideo] = useState<any>(false);
  const playedRef = useRef<any>(null);
  const [playedEnded, setPlayedEnded] = useState(false);

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

  const TimeMinConvert = (time: number) => {
    const duration = Math.floor(time);
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration - hours * 3600) / 60);
    const remainingSeconds = duration - hours * 3600 - minutes * 60;
    return `${hours > 0 ? `${hours.toString().padStart(2, '0')}h ` : ''}${
      minutes > 0 ? `${minutes.toString().padStart(2, '0')}m ` : ''
    }${remainingSeconds > 0 ? `${remainingSeconds.toString().padStart(2, '0')}s` : ''}`;
  };

  const handleClickPreviewVideo = () => {
    if (isLoggedIn) {
      if (!isPayment) {
        dispatch(paymentActions.openModalChoosePayment());
        dispatch(classActions.setAuthorName(classes?.authorName || ''));
      }
    } else {
      localStorage.setItem('SubscribePopup', 'true');
      dispatch(authActions.openSignInModal());
    }
  };

  useEffect(() => {
    // console.log({ classes });
    if (typeof window !== 'undefined') {
      const currentUser = JSON.parse(localStorage.getItem('ACCESS_TOKEN') as string);
      // const indexVideo = parseInt(JSON.parse(localStorage.getItem('indexVideo') as string));
      // if (indexVideo) {
      //   dispatch(classActions.setIndexSelectedLesson(indexVideo));
      // }
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
    setListCategory(
      listCategories?.filter((item: any) =>
        classes?.categories?.some((cl: any) => cl?.id === item?.id)
      )
    );
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
      lessonId: lesson?.id,
      secondLastView: _value?.secondLastView,
      isFinished: false,
      historyLessonId: lesson?.historyLesson?.id,
    };
    setPlayedEnded(false);
    dispatch(watchingActions.handleCreateAndUpdateMyWatching(params));
    setPlayingVideo(false);
  };

  const onEndedVideo = () => {
    const myWatching: any = localStorage.getItem('myWatching');
    const _value = JSON.parse(myWatching);
    const params = {
      lessonId: lesson?.id,
      secondLastView: _value?.secondLastView,
      isFinished: true,
      historyLessonId: lesson?.historyLesson?.id,
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
              {/* {classes?.lessons?.[indexSelectedLesson]?.title} */}
              {
                classes?.lessons.find(
                  (lesson: any) => lesson?.id.toString() === router.query?.lessonsId
                )?.title
              }
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ color: '#ccc' }}>
              {/* {classes?.lessons?.[indexSelectedLesson]?.description}
               */}
              {
                classes?.lessons.find(
                  (lesson: any) => lesson?.id.toString() === router.query?.lessonsId
                )?.description
              }
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
                isPayment
                  ? lightVideo
                  : classes?.lessons.find(
                      (lesson: any) => lesson?.id.toString() === router.query?.lessonsId
                    )?.thumbnail
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
                    {isMappable(classes?.lessons) ? (
                      classes?.lessons?.map((lesson: any, index: number) => (
                        <ListItemButton
                          selected={lesson?.id.toString() === router.query?.lessonsId}
                          onClick={() => {
                            onChangeVideoLesson(lesson?.id, index);
                            // localStorage.setItem('indexVideo', index.toString());
                          }}
                          key={lesson?.id}
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
                              color: '#fff !important',
                            },
                            ':hover': {
                              background: '#5c5c5c',

                              color: '#fff',
                            },
                          }}
                        >
                          <Image
                            style={{ marginRight: '8px' }}
                            width={30}
                            height={30}
                            src={
                              !isPayment
                                ? LockIcon
                                : lesson?.id.toString() === router.query?.lessonsId
                                ? playingVideo && !lightVideo
                                  ? PauseIcon
                                  : PlayIcon
                                : PlayIcon
                            }
                            alt=""
                            onClick={(e) => {
                              if (lesson?.id.toString() === router.query?.lessonsId && isPayment) {
                                e.stopPropagation();
                                setLightVideo(false);
                                setPlayingVideo(!playingVideo);
                                console.log({ playingVideo });
                              }
                            }}
                          />
                          <Stack
                            sx={{ width: '100%' }}
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Typography
                              sx={{
                                width: { xs: '180px', sm: '100%', md: '170px', lg: '230px' },
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                              }}
                              variant="body1"
                            >
                              {`${index + 1}. ${lesson?.title}`}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: '12px',
                                color: '#9b9b9b',
                              }}
                            >
                              {TimeMinConvert(lesson.duration)}
                            </Typography>
                            {/* <ListItemText
                              primaryTypographyProps={{
                                width: { md: '180px', lg: '230px' },
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                              }}
                              primary={`${index + 1}. ${lesson?.title}`}
                            />
                            <ListItemText
                              // sx={{ margin: 0 }}
                              primary={TimeMinConvert(lesson.duration)}
                              primaryTypographyProps={{ fontSize: '12px ' }}
                              sx={{
                                '&.MuiListItemText-root': {
                                  mt: '6px',
                                },
                              }}
                            /> */}
                          </Stack>
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
                padding: '12px 24px',
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
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Avatar alt="avatar" src={classes.thumbnail} sx={{ width: 80, height: 80 }} />
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
                  classes.lessons?.length
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
                        transition: 'all .5s ease',
                        textTransform: 'capitalize',
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
    </main>
  );
};

export default LessonDetailPageComponent;
