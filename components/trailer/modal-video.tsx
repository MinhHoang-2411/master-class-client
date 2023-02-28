import { authActions } from '@/store/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';
import { useState } from 'react';
import styles from '../../styles/classes.module.scss';
import PlayVideo from '../class/AboutClass/PlayVideo';

interface ModalVideoModel {
  openModal?: boolean;
  setOpenModal: (show: boolean) => void;
  classes: any;
  categories: any;
}

const ModalVideo: React.FC<ModalVideoModel> = ({
  openModal,
  setOpenModal,
  classes,
  categories,
}) => {
  const dispatch = useAppDispatch();
  const [playing, setPlaying] = useState(false);
  const [pauseVideo, setPauseVideo] = useState(false);

  return (
    <>
      <div className={`${styles['mc-modal']} ${styles['mc-modal--full']}`}>
        <div
          className={`${styles['mc-backdrop']} ${styles['mc-backdrop--extra-dark']} ${styles['mc-modal__backdrop']}`}
        />
        <div className={styles['mc-modal__viewport']}>
          <div id="dialog-container" tabIndex={-1} className={styles['container']}>
            <button
              type="button"
              className={`${styles['c-button']} ${styles['c-button--link']} ${styles['c-button--md']} ${styles['mc-modal__close']} ${styles['mc-p-0']}`}
              data-testid="modal-close-button"
              onClick={() => setOpenModal(false)}
            >
              <span className={styles['mc-sr-only']}>Close</span>
              <svg
                width={24}
                height={25}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="img"
                className={`${styles['mc-icon']} ${styles['mc-icon--md']} ${styles['mc-icon--scale-4']} ${styles['mc-m-2']}`}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.418 2.918a1.429 1.429 0 0 1 2.02 0L12 10.48l7.561-7.562a1.429 1.429 0 0 1 2.02 2.02l-7.56 7.562 7.56 7.561a1.429 1.429 0 1 1-2.02 2.02L12 14.522l-7.561 7.56a1.429 1.429 0 1 1-2.02-2.02l7.56-7.561-7.56-7.561a1.429 1.429 0 0 1 0-2.02Z"
                  fill="currentColor"
                />
              </svg>
            </button>

            <div
              className={styles['mc-modal__content']}
              role="dialog"
              aria-modal="true"
              aria-labelledby="trailer-modal-heading"
            >
              <div
                className={`${styles['row']} ${styles['justify-content-between']} ${styles['align-items-center']} ${styles['mc-mb-2']} ${styles['mc-overflow--hidden']}`}
                data-testid="trailer-modal"
              >
                <div
                  className={`${styles['d-none']} ${styles['d-md-block']} ${styles['col-2']} ${styles['col-md-1']}`}
                >
                  <div className={`${styles['mc-tile']} ${styles['mc-tile--1x1']}`}>
                    <div className={`${styles['mc-tile__content']} ${styles['content']}`}>
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
                          className={`${styles['mc-tile-image']} ${styles['mc-corners--circle']}`}
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
                  </div>
                </div>
                <div className={styles['col']}>
                  <h1
                    id="trailer-modal-heading"
                    className={`${styles['mc-text-h5']} ${styles['mc-text--1-line-max']} `}
                  >
                    Trailer for {classes?.authorName}
                  </h1>
                  <p className={styles['mc-mt-1']}>{classes?.name}</p>
                </div>
                <div className={styles['col-auto']}>
                  <span
                    className={`${styles['c-button']} ${styles['c-button--primary']} ${styles['c-button--md']} `}
                    onClick={() => dispatch(authActions.openSignUpModal())}
                  >
                    Sign Up
                  </span>
                </div>
              </div>
              <div className={styles['bc-player']}>
                <div id="video-wrapper" className={styles['bc-player__wrapper']}>
                  <div
                    id="vjs_video_30812"
                    className={`${styles['bc-player__video']}`}
                    data-application-id="true"
                    tabIndex={-1}
                    lang="en"
                    translate="no"
                    role="region"
                    aria-label="Video Player"
                  >
                    {/* {pauseVideo && (
                      <div>
                        <div
                          className={`${styles['bc-player__screen']} ${styles['bc-player__screen--pausescreen']} ${styles['bc-player__screen--enter-done']} `}
                        >
                          <div className={`${styles['mc-tile']} ${styles['mc-tile--16x9']}`}>
                            <div className={`${styles['mc-tile__content']} ${styles['content']}`}>
                              <div
                                className={`${styles['mc-tile__component']} ${styles['mc-tile-overlay']} ${styles['mc-tile-overlay--solid']}`}
                              />
                              <div
                                className={`${styles['mc-tile__component']} ${styles['mc-tile-caption']} ${styles['mc-tile-caption--x-left']} ${styles['mc-tile-caption--y-top']}`}
                              >
                                <div
                                  className={`${styles['mc-tile-caption__content']} ${styles['mc-p-3']}`}
                                >
                                  <p className={`${styles['mc-text-small']} ${styles['mc-p-5']}`}>
                                    Class Trailer
                                  </p>
                                </div>
                              </div>
                              <div
                                className={`${styles['mc-tile__component']} ${styles['mc-tile-caption']} ${styles['mc-tile-caption--x-center']} ${styles['mc-tile-caption--y-center']}`}
                              >
                                <div
                                  className={`${styles['mc-tile-caption__content']} ${styles['mc-p-3']}`}
                                >
                                  <div>
                                    <div className={styles['row']}>
                                      <div
                                        className={`${styles['col-12']} ${styles['col-md-8']} ${styles['offset-md-2']} ${styles['col-lg-6']} ${styles['offset-lg-3']}`}
                                      >
                                        <h5 className={styles['mc-text-h5']}>
                                          Subscribe to MasterClass to continue watching
                                        </h5>
                                        <p
                                          className={`${styles['d-none']} ${styles['d-md-block']} ${styles['mc-mt-3']}`}
                                        >
                                          <span>Starting at $15/month (billed annually)</span>
                                        </p>
                                        <span
                                          className={`${styles['c-button']} ${styles['c-button--primary']} ${styles['c-button--md']} ${styles['mc-mt-3']}`}
                                        >
                                          Sign Up
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )} */}
                    <PlayVideo
                      videoPreview={classes.videoPreview}
                      playing={playing}
                      setPlaying={setPlaying}
                      setPauseVideo={setPauseVideo}
                      height="600px"
                    />
                    {/* <div
                      className="vjs-poster"
                      tabIndex={-1}
                      aria-disabled="false"
                      style={{
                        backgroundImage:
                          'url("https://cf-images.us-east-1.prod.boltdns.net/v1/jit/5344802162001/b1ff9874-e6f8-41a9-9761-5226f23367f3/main/1920x1080/41s824ms/match/image.jpg")',
                      }}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ModalVideo;
