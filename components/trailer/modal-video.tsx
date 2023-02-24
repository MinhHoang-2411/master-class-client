import { useState } from 'react';

interface ModalVideoModel {
  openModal?: boolean;
  setOpenModal?: (show: boolean) => void;
}

const ModalVideo: React.FC<ModalVideoModel> = ({ openModal, setOpenModal }) => {
  return (
    <>
      <div className="mc-modal mc-modal--full">
        <div className="mc-backdrop mc-backdrop--extra-dark mc-modal__backdrop" />
        <div className="mc-modal__viewport">
          <div id="dialog-container" tabIndex={-1} className="container">
            <button
              type="button"
              className="c-button c-button--link c-button--md mc-modal__close mc-p-0 "
              data-testid="modal-close-button"
            >
              <span className="mc-sr-only">Close</span>
              <svg
                width={24}
                height={25}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="img"
                className="mc-icon mc-icon--md mc-icon--scale-4 mc-m-2"
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
              className="mc-modal__content"
              role="dialog"
              aria-modal="true"
              aria-labelledby="trailer-modal-heading"
            >
              <div
                className="row justify-content-between align-items-center mc-mb-2 mc-overflow--hidden"
                data-testid="trailer-modal"
              >
                <div className="d-none d-md-block col-2 col-md-1">
                  <div className="mc-tile mc-tile--1x1">
                    <div className="mc-tile__content content">
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
                          src="https://www.masterclass.com/course-images/attachments/TQbKGrpPvjK1Xu5iLdzZUaN1?width=3840&quality=75&format=webp"
                          decoding="async"
                          data-nimg="fill"
                          className="mc-tile-image mc-corners--circle"
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
                <div className="col">
                  <h1 className="mc-text-h5 mc-text--1-line-max" id="trailer-modal-heading">
                    Trailer for Gordon Ramsay
                  </h1>
                  <p className="mc-mt-1">Teaches Cooking I</p>
                </div>
                <div className="col-auto">
                  <a className="c-button c-button--primary c-button--md" href="/find-my-classes">
                    Sign Up
                  </a>
                </div>
              </div>
              <div className="bc-player">
                <div
                  id="video-wrapper-f4d9e2e2-5377-444f-84ce-c4a390845ca9"
                  className="bc-player__wrapper"
                >
                  <div
                    id="vjs_video_30812"
                    className="bc-player__video bc-player__video--default video-js vjs-tech vjs-subs-caps-button-mobile vjs-controls-enabled vjs-workinghover vjs-v7 vjs-layout-large bc-player-1cMNiwC9oQ_default bc-player-1cMNiwC9oQ_default-index-7 vjs-mouse vjs-plugins-ready vjs-player-info vjs-errors vjs-quality-menu vjs-has-started vjs-playing vjs-mux not-hover vjs-user-inactive"
                    data-application-id="true"
                    tabIndex={-1}
                    lang="en"
                    translate="no"
                    role="region"
                    aria-label="Video Player"
                  >
                    <div>
                      <div className="bc-player__screen bc-player__screen--pausescreen bc-player__screen--exit-done">
                        <div className="mc-tile mc-tile--16x9">
                          <div className="mc-tile__content content">
                            <div className="mc-tile__component mc-tile-overlay mc-tile-overlay--solid " />
                            <div className="mc-tile__component mc-tile-caption mc-tile-caption--x-left mc-tile-caption--y-top">
                              <div className="mc-tile-caption__content mc-p-3">
                                <p className="mc-text-small mc-p-5">Class Trailer</p>
                              </div>
                            </div>
                            <div className="mc-tile__component mc-tile-caption mc-tile-caption--x-center mc-tile-caption--y-center">
                              <div className="mc-tile-caption__content mc-p-3">
                                <div>
                                  <div className="row">
                                    <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                                      <h5 className="mc-text-h5">
                                        Subscribe to MasterClass to continue watching
                                      </h5>
                                      <p className="d-none d-md-block mc-mt-3">
                                        <span>Starting at $15/month (billed annually)</span>
                                      </p>
                                      <a
                                        className="c-button c-button--primary c-button--md mc-mt-3"
                                        href="/find-my-classes"
                                      >
                                        Sign Up
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bc-player__screen bc-player__screen--endscreen">
                        <div className="mc-tile mc-tile--16x9">
                          <div className="mc-tile__content content">
                            <div className="mc-tile__component mc-tile-overlay mc-tile-overlay--solid " />
                            <div className="mc-tile__component mc-tile-caption mc-tile-caption--x-left mc-tile-caption--y-top">
                              <div className="mc-tile-caption__content mc-p-3">
                                <p className="mc-text-small mc-p-5">Class Trailer</p>
                              </div>
                            </div>
                            <div className="mc-tile__component mc-tile-caption mc-tile-caption--x-center mc-tile-caption--y-center">
                              <div className="mc-tile-caption__content mc-p-3">
                                <div>
                                  <div className="row">
                                    <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                                      <h5 className="mc-text-h5">
                                        Subscribe to MasterClass to continue watching
                                      </h5>
                                      <p className="d-none d-md-block mc-mt-3">
                                        <span>Starting at $15/month (billed annually)</span>
                                      </p>
                                      <a
                                        className="c-button c-button--primary c-button--md mc-mt-3"
                                        href="/find-my-classes"
                                      >
                                        Sign Up
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <video
                        data-application-id="true"
                        className="bc-player__video bc-player__video--default video-js vjs-tech vjs-fill-height vjs-subs-caps-button-mobile"
                        data-embed="default"
                        data-account={5344802162001}
                        data-player-id="1cMNiwC9oQ"
                        data-video-id={5549438032001}
                        captions="Off"
                        id="vjs_video_30812_html5_api"
                        tabIndex={-1}
                        poster="https://cf-images.us-east-1.prod.boltdns.net/v1/jit/5344802162001/b1ff9874-e6f8-41a9-9761-5226f23367f3/main/1920x1080/41s824ms/match/image.jpg"
                        src="blob:https://www.masterclass.com/ea063a9d-a842-497c-b738-a3e92c097bd1"
                      /> */}
                    <div
                      className="vjs-poster"
                      tabIndex={-1}
                      aria-disabled="false"
                      style={{
                        backgroundImage:
                          'url("https://cf-images.us-east-1.prod.boltdns.net/v1/jit/5344802162001/b1ff9874-e6f8-41a9-9761-5226f23367f3/main/1920x1080/41s824ms/match/image.jpg")',
                      }}
                    />
                    <div
                      className="vjs-text-track-display"
                      translate="yes"
                      aria-live="off"
                      aria-atomic="true"
                    >
                      <div style={{ position: 'absolute', inset: 0, margin: '1.5%' }} />
                    </div>
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
