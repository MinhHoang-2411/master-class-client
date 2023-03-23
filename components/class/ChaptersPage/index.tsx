import { authActions } from '@/store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { isMappable } from '@/utils/helper';
import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import styles from '../../../styles/chapters-page.module.scss';
import { useRouter } from 'next/router';

const PlayVideoLesson = dynamic(() => import('./PlayVideoLesson'), { ssr: false });

interface Iprops {
  classes: any;
  selectedLesson: any;
  categories: any;
  idxSelectedLesson: number;
  onChangeLesson: any;
}

const ChaptersPageComponent = ({
  classes,
  categories,
  selectedLesson,
  idxSelectedLesson,
  onChangeLesson,
}: Iprops) => {
  const { t } = useTranslation();
  const [listCategory, setListCategory] = useState<any>([]);
  const [playingVideo, setPlayingVideo] = useState(false);
  const [lightVideo, setLightVideo] = useState<any>(false);
  const router = useRouter();

  useEffect(() => {
    setListCategory(categories?.filter((item: any) => classes?.categories?.includes(item?._id)));
    setLightVideo(selectedLesson?.thumbnail);
  }, [selectedLesson]);

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

  const [overlayVideo, setOverlayVideo] = useState(false);

  const handleClickPreviewVideo = () => {
    if (isLoggedIn) {
      setOverlayVideo(false);
    } else {
      dispatch(authActions.openSignInModal());
    }
  };

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
            <h1>{selectedLesson?.title}</h1>

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
                  selectedLesson?.duration
                )}`}</span>
              </div>
            </div>
            <Divider sx={{ border: '.5px solid #D4D5D9' }} />

            <div className={styles?.title}>
              <span>{selectedLesson?.title}</span>
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
            <div
              onClick={handleClickPreviewVideo}
              className={`${overlayVideo ? styles.lessonOverlay : ''}`}
            ></div>
            <PlayVideoLesson
              lightVideo={lightVideo}
              url={selectedLesson?.videoUrl}
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
                          selected={idxSelectedLesson === index}
                          onClick={() => onChangeLesson(index)}
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
            <p>{classes?.title}</p>
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

export default ChaptersPageComponent;
