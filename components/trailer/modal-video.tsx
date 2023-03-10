import { authActions } from '@/store/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import styles from '../../styles/classes.module.scss';
import PlayVideo from '../class/AboutClass/PlayVideo';
import VideoPreview from '../class/AboutClass/VideoPreview';

interface ModalVideoModel {
  openModal?: boolean;
  setOpenModal: (show: boolean) => void;
  classes: any;
}

const ModalVideo: React.FC<ModalVideoModel> = ({
  openModal,
  setOpenModal,
  classes,
}) => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const [playingVideo, setPlayingVideo] = useState(true);
  const [lightVideo, setLightVideo] = useState(false);

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
              <span className={styles['mc-sr-only']}>{t('close')}</span>
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
                <div className={`${styles['col']} ${styles['py-2']}`}>
                  <h1
                    id="trailer-modal-heading"
                    className={`${styles['mc-text-h5']} ${styles['mc-text--1-line-max']} `}
                  >
                    {`${t('trailer-for')} ${classes?.authorName}`}
                  </h1>
                  <p className={styles['mc-mt-1']}>{classes?.name}</p>
                </div>
                <div className={styles['col-auto']}>
                  <span
                    className={`${styles['c-button']} ${styles['c-button--primary']} ${styles['c-button--md']} `}
                    onClick={() => dispatch(authActions.openSignUpModal())}
                  >
                    {t('sign-up')}
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
                    <VideoPreview
                      lightVideo={lightVideo}
                      url={classes?.videoPreview?.url}
                      playingVideo={playingVideo}
                      setLightVideo={setLightVideo}
                      setPlayingVideo={setPlayingVideo}
                      height={"600px"}
                    />
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
