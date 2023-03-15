import { authActions } from '@/store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../styles/classes.module.scss';
import ModalVideo from '../trailer/modal-video';
import AboutClass from './AboutClass';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import bookmarkApi from '@/services/api/bookmark';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';

interface PreviewDetailClassModel {}

interface Props {
  classes: any;
  categories: any;
  isFavourite: any;
  setIsFavourite: any;
}

const PreviewDetailClass = ({ classes, categories, isFavourite, setIsFavourite }: Props) => {
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
            <div
              color="0,0,0"
              className={`${styles['mc-tile__component']} ${styles['mc-tile-overlay']} ${styles['mc-tile-overlay--gradient-bottom']}`}
              style={{
                background:
                  'linear-gradient(to top, rgb(0, 0, 0) 0px, rgba(0, 0, 0, 0.6) 25%, rgba(0, 0, 0, 0) 45%) center center no-repeat',
              }}
            />
            <div
              className={`${styles['mc-tile__component']} ${styles['mc-tile-caption']} ${styles['mc-tile-caption--x-left']} ${styles['mc-tile-caption--y-bottom']}`}
            >
              <div className={`${styles['mc-tile-caption__content']} ${styles['mc-p-3']}`}>
                <div className={`${styles['container']} ${styles['mc-text--center']}`}>
                  <div className={`${styles['row']} ${styles['justify-content-center']}`}>
                    <div
                      className={`${styles['col-8']} ${styles['col-sm-6']} ${styles['col-md-3']} ${styles['py-2']}`}
                    >
                      <div
                        className={`${styles['mc-nameplate--small']} ${styles['mc-text--center']}`}
                        data-testid="nameplate"
                      >
                        <div className={`${styles['mc-nameplate__inner']}`}>
                          <h1 className={`${styles['Hero_nameplateImageContainer']}`}>
                            {classes?.authorName}
                          </h1>
                          <div className={`${styles['mc-nameplate__separator']}`} />
                          <p
                            className={`${styles['nameplate__sub-text']} ${styles['mc-text-h6']}`}
                            data-testid="nameplate__sub-text"
                          >
                            {classes?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${styles['row']} ${styles['d-flex']} ${styles['mc-mt-3']} ${styles['justify-content-center']}`}
                  >
                    <div
                      className={`${styles['row']} ${styles['col-12']} ${styles['col-md-8']} ${styles['col-lg-6']} ${styles['justify-content-center']}`}
                    >
                      {classes?.title}
                    </div>
                  </div>

                  <div
                    className={`${styles['row']} ${styles['justify-content-center']} ${styles['mc-mt-4']}`}
                  >
                    <div className={styles['col-auto']}>
                      <button
                        type="button"
                        onClick={handlePlayVideoTrailer}
                        className={`${styles['c-button']} ${styles['c-button--link']} ${styles['c-button--md']} ${styles['d-inline-flex']} ${styles['flex-column']}`}
                      >
                        <svg
                          width={24}
                          height={25}
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          role="img"
                          className={`${styles['mc-icon']} ${styles['mc-icon--lg']} ${styles['mc-icon--4']} ${styles['mc-mb-4']}`}
                        >
                          <path
                            d="M7.791 2.695a1.25 1.25 0 0 0-1.92 1.055v17.5a1.25 1.25 0 0 0 1.92 1.055l13.75-8.75a1.25 1.25 0 0 0 0-2.11l-13.75-8.75Z"
                            fill="currentColor"
                          />
                        </svg>
                        {t('trailer')}
                      </button>
                      <button
                        type="button"
                        className={`${styles['c-button']} ${styles['c-button--link']} ${styles['c-button--md']} ${styles['d-inline-flex']} ${styles['flex-column']}`}
                        onClick={handlePlayVideoTrailer}
                      >
                        <svg
                          width={24}
                          height={25}
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          role="img"
                          className={`${styles['mc-icon']} ${styles['mc-icon--lg']} ${styles['mc-icon--4']} ${styles['mc-mb-4']}`}
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.16 6.429a.647.647 0 0 0-.651.642V7.5c0 .394-.345.714-.77.714-.424 0-.769-.32-.769-.714v-.429C6.97 5.947 7.93 5 9.16 5h10.65C21.04 5 22 5.947 22 7.071v6.108c0 1.124-.96 2.071-2.19 2.071h-.502c-.425 0-.77-.32-.77-.714 0-.395.345-.715.77-.715h.503c.338 0 .65-.268.65-.642V7.07a.647.647 0 0 0-.65-.642H9.16ZM2 11.82c0-1.124.96-2.071 2.19-2.071h10.65c1.23 0 2.19.947 2.19 2.071v6.108c0 1.124-.96 2.071-2.19 2.071H4.19C2.96 20 2 19.053 2 17.929V11.82Zm2.19-.642a.647.647 0 0 0-.652.642v6.108c0 .374.313.642.651.642H14.84c.339 0 .651-.268.651-.642V11.82a.647.647 0 0 0-.65-.642H4.188Z"
                            fill="currentColor"
                          />
                        </svg>
                        {t('sample')}
                      </button>
                      <button
                        type="button"
                        className={`${styles['c-button']} ${styles['c-button--link']} ${styles['c-button--md']} ${styles['d-inline-flex']} ${styles['flex-column']}`}
                      >
                        <svg
                          width={24}
                          height={25}
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          role="img"
                          className={`${styles['mc-icon']} ${styles['mc-icon--lg']} ${styles['mc-icon--4']} ${styles['mc-mb-4']}`}
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6.77 8.843a1.111 1.111 0 0 0 1.571 0L12 5.183l3.659 3.66A1.111 1.111 0 1 0 17.23 7.27l-4.444-4.444a1.111 1.111 0 0 0-1.572 0L6.77 7.27a1.111 1.111 0 0 0 0 1.572Z"
                            fill="currentColor"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 16.945c.613 0 1.11-.497 1.11-1.11V4.167a1.111 1.111 0 0 0-2.221 0v11.666c0 .614.497 1.111 1.11 1.111Z"
                            fill="currentColor"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.111 16.945c.614 0 1.111.498 1.111 1.111v1.111c0 .614.498 1.112 1.111 1.112h13.334c.613 0 1.11-.498 1.11-1.111v-1.112a1.111 1.111 0 1 1 2.223 0v1.111a3.333 3.333 0 0 1-3.333 3.334H5.333A3.333 3.333 0 0 1 2 19.167v-1.11c0-.614.497-1.112 1.111-1.112Z"
                            fill="currentColor"
                          />
                        </svg>
                        {t('share')}
                      </button>

                      {isLoggedIn ? (
                        <button
                          type="button"
                          className={`${styles['c-button']} ${styles['c-button--link']} ${styles['c-button--md']} ${styles['d-inline-flex']} ${styles['flex-column']}`}
                        >
                          {isFavourite ? (
                            <BookmarkIcon
                              className={`${styles['mc-icon']} ${styles['mc-icon--lg']} ${styles['mc-icon--4']} ${styles['mc-mb-4']}`}
                              onClick={() => onDeleteBookmarkClass(classes._id)}
                            />
                          ) : (
                            <BookmarkBorderIcon
                              className={`${styles['mc-icon']} ${styles['mc-icon--lg']} ${styles['mc-icon--4']} ${styles['mc-mb-4']}`}
                              onClick={() => onBookmarkClass(classes._id)}
                            />
                          )}
                          {t('bookmark')}
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.container}>
                  <div
                    className={`${styles['row']} ${styles['mc-text--center']} ${styles['justify-content-center']}`}
                  >
                    <div
                      className={`${styles['col-md-5']} ${styles['col-lg-3']} ${styles['pd-btn-signup']}`}
                    >
                      <span
                        className={`${styles['c-button']} ${styles['c-button--full-width']} ${styles['c-button--primary']} ${styles['c-button--md']}`}
                        onClick={() => dispatch(authActions.openSignUpModal())}
                      >
                        {t('sign-up')}
                      </span>
                      <p
                        className={`${styles['mc-text-small']} ${styles['mc-opacity--hinted']} ${styles['mc-mt-3']}`}
                      >
                        <span>{t('starting-at-15-for-all-classes-and-sessions')}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
