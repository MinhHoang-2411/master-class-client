import { authActions } from '@/store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../styles/classes.module.scss';
import ModalVideo from '../trailer/modal-video';
import AboutClass from './AboutClass';

import bookmarkApi from '@/services/api/bookmark';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import { Box, Container, Grid, Stack } from '@mui/material';
import Image from 'next/image';
import PlayIcon from '../../public/icons/classes/play.svg';
import SampleIcon from '../../public/icons/classes/sample.svg';
import ShareIcon from '../../public/icons/classes/share.svg';
import BookmarkIcon from '../../public/icons/classes/bookmark.svg';
import BookmarkSelectedIcon from '../../public/icons/classes/bookmarkSelected.svg';

import Typography from '../share/Typography';
import PrimaryButton from '../share/PrimaryButton';

interface PreviewDetailClassModel {}

interface Props {
  classes: any;
  categories: any;
  isFavourite: any;
  setIsFavourite: any;
  isPayment: any;
}

const PreviewDetailClass = ({
  classes,
  categories,
  isFavourite,
  setIsFavourite,
  isPayment,
}: Props) => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();
  const nameCategory = router?.query?.name?.[0];
  const [modalVideo, setModalVideo] = useState(false);

  const onBookmarkClass = async (classId: string) => {
    const params = {
      modelId: classId,
      modelType: 'CLASSES',
    };
    const response: any = await bookmarkApi.postMyFavorite(params);
    if (response.data) {
      setIsFavourite(true);
      toast.success(t('add-lesson-bookmark'));
    }
  };

  const onDeleteBookmarkClass = async (classId: string) => {
    const params = {
      modelId: classId,
      modelType: 'CLASSES',
    };
    const response: any = await bookmarkApi.deleteMyFavorite(params);
    if (response.data) {
      setIsFavourite(false);
      toast.success(t('delete-lesson-bookmark'));
    }
  };

  const handlePlayVideoTrailer = () => {
    setModalVideo(true);
  };

  return (
    <>
      <div className={styles.Hero_tileContainer}>
        <div className={`${styles['mc-tile']} ${styles['mc-tile--auto']}`}>
          <div className={`${styles['mc-tile__content']} ${styles['content']}`}>
            <div className={`${styles['fresnel-container']} ${styles['fresnel-lessThan-md']}`} />
            <div
              className={`${styles['fresnel-container']} ${styles['fresnel-greaterThanOrEqual-md']}`}
            >
              <span
                style={{
                  boxSizing: 'border-box',
                  display: 'block',
                  overflow: 'hidden',
                  width: 'initial',
                  height: 'initial',
                  background: 'none',
                  opacity: 1,
                  border: 0,
                  margin: 0,
                  padding: 0,
                  position: 'absolute',
                  inset: 0,
                }}
              >
                <img
                  alt=""
                  sizes="100vw"
                  src={classes?.thumbnail}
                  decoding="async"
                  data-nimg="fill"
                  className={styles['mc-tile-image']}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    boxSizing: 'border-box',
                    padding: 0,
                    border: 'none',
                    margin: 'auto',
                    display: 'block',
                    width: 0,
                    height: 0,
                    minWidth: '100%',
                    maxWidth: '100%',
                    minHeight: '100%',
                    maxHeight: '100%',
                  }}
                />
              </span>
            </div>
            <Box
              className={`${styles['mc-tile__component']} ${styles['mc-tile-overlay']} ${styles['mc-tile-overlay--gradient-bottom']}`}
              sx={{
                background: {
                  md: 'linear-gradient(270deg, rgba(9, 10, 11, 0) 23.96%, #090A0B 65.03%)',
                  xs: 'rgba(0,0,0,0.7 )',
                },
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Stack sx={{ width: '100%' }}>
                <Container>
                  <Grid container>
                    <Grid item xs={12} md={5}>
                      <Stack alignItems="center">
                        <Box
                          sx={{
                            alignSelf: {
                              md: 'flex-start',
                            },
                            maxWidth: '400px',
                            textAlign: { md: 'start', xs: 'center' },
                          }}
                        >
                          <Typography
                            variant="h2"
                            sx={{ fontWeight: 700, fontSize: '40px', color: '#fff' }}
                          >
                            {classes?.name}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ fontSize: '20px', color: '#fff', fontWeight: 700 }}
                            data-testid="nameplate__sub-text"
                          >
                            {classes?.authorName}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: { md: '#808080', xs: '#bebebe' }, fontSize: '14px' }}
                          >
                            {classes?.title}
                          </Typography>
                        </Box>

                        <Stack
                          direction="row"
                          spacing={5}
                          sx={{ my: '40px', alignSelf: { md: 'flex-start' } }}
                        >
                          <Stack
                            alignItems="center"
                            sx={{ cursor: 'pointer' }}
                            onClick={handlePlayVideoTrailer}
                          >
                            <Image alt="play-icon" src={PlayIcon} />
                            <Typography sx={{ marginTop: '6px' }} variant="body2">
                              Trailer
                            </Typography>
                          </Stack>
                          <Stack
                            alignItems="center"
                            sx={{ cursor: 'pointer' }}
                            onClick={handlePlayVideoTrailer}
                          >
                            <Image alt="play-icon" src={SampleIcon} />
                            <Typography sx={{ marginTop: '6px' }} variant="body2">
                              Sample
                            </Typography>
                          </Stack>
                          <Stack alignItems="center" sx={{ cursor: 'pointer' }}>
                            <Image alt="play-icon" src={ShareIcon} />
                            <Typography sx={{ marginTop: '6px' }} variant="body2">
                              Share
                            </Typography>
                          </Stack>
                          {isLoggedIn ? (
                            <Stack
                              alignItems="center"
                              sx={{ cursor: 'pointer' }}
                              onClick={() =>
                                isFavourite
                                  ? onDeleteBookmarkClass(classes.id)
                                  : onBookmarkClass(classes.id)
                              }
                            >
                              <Image
                                alt="play-icon"
                                src={isFavourite ? BookmarkIcon : BookmarkSelectedIcon}
                              />
                              <Typography sx={{ marginTop: '6px' }} variant="body2">
                                Bookmark
                              </Typography>
                            </Stack>
                          ) : (
                            <Stack
                              alignItems="center"
                              sx={{ cursor: 'pointer' }}
                              onClick={() => dispatch(authActions.openSignInModal())}
                            >
                              <Image alt="play-icon" src={BookmarkIcon} />
                              <Typography sx={{ marginTop: '6px' }} variant="body2">
                                Bookmark
                              </Typography>
                            </Stack>
                          )}
                        </Stack>
                        {isPayment ? (
                          <></>
                        ) : (
                          <Stack sx={{ width: '320px', alignSelf: { md: 'flex-start' } }}>
                            <PrimaryButton
                              onClick={() => dispatch(authActions.openSignUpModal())}
                              fullWidth
                            >
                              Signup
                            </PrimaryButton>
                            <Typography variant="body2" sx={{ textAlign: 'center', mt: '12px' }}>
                              {t(
                                'Starting at $24.99/month (billed annually) for all classes and sessions'
                              )}
                            </Typography>
                          </Stack>
                        )}
                      </Stack>
                    </Grid>
                  </Grid>
                </Container>
              </Stack>
            </Box>
          </div>
        </div>
      </div>

      <AboutClass classes={classes} categories={categories} />
      {modalVideo && (
        <ModalVideo openModal={modalVideo} setOpenModal={setModalVideo} classes={classes} />
      )}
    </>
  );
};

export default PreviewDetailClass;
