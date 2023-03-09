import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import styles from '../../styles/categories.module.scss';
import stylesTrailer from '../../styles/layout-page.module.scss';

interface FeaturedPreviewModel {
  listBanners?: string[];
}

const FeaturedPreview: React.FC<FeaturedPreviewModel> = ({}) => {
  const { t } = useTranslation('common');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  function ValidateEmail(mail: string) {
    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(mail)) {
      setError(false);
    } else setError(true);
  }

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setEmail(value);
    ValidateEmail(value);
  };

  return (
    <div className={stylesTrailer.group_featured_preview}>
      <div className={stylesTrailer.group_featured_preview_text}>
        <p>Watch our 5 Featured Previews of the Month Absolutely free.</p>
      </div>
      <div className={stylesTrailer.featured_preview}>
        <div
          className={stylesTrailer['div-img-1']}
          data-testid="course-tile-terence-tao-teaches-mathematical-thinking"
        >
          <div className={`${styles['fresnel-container']} ${stylesTrailer['content-img']}`}>
            <div
              className={`${styles['overflow-hidden']} ${styles['corners-md']} ${styles['position-relative']}`}
              aria-labelledby="tile-desktop-nameplate-312"
            >
              <span>
                <div className={`${styles['tile']} ${styles['tile--9x16']}`}>
                  <div className={`${styles.tile_content}`}>
                    <span
                      style={{
                        boxSizing: 'border-box',
                        display: 'inline-block',
                        overflow: 'hidden',
                        width: 'initial',
                        height: 'initial',
                        background: 'none',
                        opacity: 1,
                        border: '0px',
                        margin: '0px',
                        padding: '0px',
                        position: 'relative',
                        maxWidth: '100%',
                      }}
                    >
                      <span
                        style={{
                          boxSizing: 'border-box',
                          display: 'block',
                          width: 'initial',
                          height: 'initial',
                          background: 'none',
                          opacity: 1,
                          border: '0px',
                          margin: '0px',
                          padding: '0px',
                          maxWidth: '100%',
                        }}
                      >
                        <img
                          style={{
                            display: 'block',
                            maxWidth: '100%',
                            width: 'initial',
                            height: 'initial',
                            background: 'none',
                            opacity: 1,
                            border: 0,
                            margin: 0,
                            padding: 0,
                          }}
                          alt=""
                          aria-hidden="true"
                          src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27395%27%20height=%27702%27/%3e"
                        />
                      </span>
                      <img
                        alt=""
                        src="https://www.masterclass.com/course-images/attachments/fae6JxtfQv1G3Dk2NVEN1BNA?width=1920&quality=75&format=webp"
                        className={`${styles['tile-image']} ${styles['animation-zoom']} ${styles['animation']}`}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
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
                    <div
                      className={`${styles['tile__component']} ${styles['tile-overlay']} ${styles['tile-overlay--gradient-bottom']}`}
                    />
                    <div
                      className={`${styles['tile__component']} ${styles['tile-caption']} ${styles['tile-caption--x-center']} ${styles['tile-caption--y-bottom']} ${styles['tile-caption--flush']}`}
                    >
                      <div className={`${styles['tile-caption__content']} ${styles['p-4']}`}>
                        <div
                          className={`${stylesTrailer['CourseOverlaySlideUpContent_slideUp__7fhL2']} ${styles['mb-2']}`}
                        >
                          <div id="tile-desktop-nameplate-312">
                            <div className={styles['nameplate']} data-testid="nameplate">
                              <div className={styles['nameplate__inner']}>
                                <div className={styles.NameplateImage_container___z3sm}>
                                  <span
                                    style={{
                                      boxSizing: 'border-box',
                                      display: 'block',
                                      overflow: 'hidden',
                                      width: 'initial',
                                      height: 'initial',
                                      background: 'none',
                                      opacity: 1,
                                      border: '0px',
                                      margin: '0px',
                                      padding: '0px',
                                      position: 'absolute',
                                      inset: '0px',
                                    }}
                                  >
                                    <span className={stylesTrailer['author-name']}>
                                      {'Frank Gehry'}
                                    </span>
                                  </span>
                                </div>
                                <div className={stylesTrailer.nameplate__separator} />
                                <p
                                  className={`${styles['text--2-lines']} ${stylesTrailer['text-h6']}`}
                                  data-testid="nameplate__sub-text"
                                >
                                  {'Teaches Design and Architecture'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </span>
            </div>
          </div>
          <div className={`${styles['fresnel-container']} ${styles['fresnel-lessThan-md']}`} />
        </div>

        <div
          className={stylesTrailer['div-img-2']}
          data-testid="course-tile-terence-tao-teaches-mathematical-thinking"
        >
          <div className={`${styles['fresnel-container']} ${stylesTrailer['content-img']}`}>
            <div
              className={`${styles['overflow-hidden']} ${styles['corners-md']} ${styles['position-relative']}`}
              aria-labelledby="tile-desktop-nameplate-312"
            >
              <span>
                <div className={`${styles['tile']} ${styles['tile--9x16']}`}>
                  <div className={`${styles.tile_content}`}>
                    <span
                      style={{
                        boxSizing: 'border-box',
                        display: 'inline-block',
                        overflow: 'hidden',
                        width: 'initial',
                        height: 'initial',
                        background: 'none',
                        opacity: 1,
                        border: '0px',
                        margin: '0px',
                        padding: '0px',
                        position: 'relative',
                        maxWidth: '100%',
                      }}
                    >
                      <span
                        style={{
                          boxSizing: 'border-box',
                          display: 'block',
                          width: 'initial',
                          height: 'initial',
                          background: 'none',
                          opacity: 1,
                          border: '0px',
                          margin: '0px',
                          padding: '0px',
                          maxWidth: '100%',
                        }}
                      >
                        <img
                          style={{
                            display: 'block',
                            maxWidth: '100%',
                            width: 'initial',
                            height: 'initial',
                            background: 'none',
                            opacity: 1,
                            border: 0,
                            margin: 0,
                            padding: 0,
                          }}
                          alt=""
                          aria-hidden="true"
                          src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27395%27%20height=%27702%27/%3e"
                        />
                      </span>
                      <img
                        alt=""
                        src="https://www.masterclass.com/course-images/attachments/ytDCxGh9USkRaFbphiuAdszK?width=828&quality=75&format=webp"
                        className={`${styles['tile-image']} ${styles['animation-zoom']} ${styles['animation']}`}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
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
                    <div
                      className={`${styles['tile__component']} ${styles['tile-overlay']} ${styles['tile-overlay--gradient-bottom']}`}
                    />
                    <div
                      className={`${styles['tile__component']} ${styles['tile-caption']} ${styles['tile-caption--x-center']} ${styles['tile-caption--y-bottom']} ${styles['tile-caption--flush']}`}
                    >
                      <div className={`${styles['tile-caption__content']} ${styles['p-4']}`}>
                        <div
                          className={`${stylesTrailer['CourseOverlaySlideUpContent_slideUp__7fhL2']} ${styles['mb-2']}`}
                        >
                          <div id="tile-desktop-nameplate-312">
                            <div className={styles['nameplate']} data-testid="nameplate">
                              <div className={styles['nameplate__inner']}>
                                <div className={styles.NameplateImage_container___z3sm}>
                                  <span
                                    style={{
                                      boxSizing: 'border-box',
                                      display: 'block',
                                      overflow: 'hidden',
                                      width: 'initial',
                                      height: 'initial',
                                      background: 'none',
                                      opacity: 1,
                                      border: '0px',
                                      margin: '0px',
                                      padding: '0px',
                                      position: 'absolute',
                                      inset: '0px',
                                    }}
                                  >
                                    <span className={stylesTrailer['author-name']}>
                                      {'Frank Gehry'}
                                    </span>
                                  </span>
                                </div>
                                <div className={stylesTrailer.nameplate__separator} />
                                <p
                                  className={`${styles['text--2-lines']} ${stylesTrailer['text-h6']}`}
                                  data-testid="nameplate__sub-text"
                                >
                                  {'Teaches Design and Architecture'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </span>
            </div>
          </div>
          <div className={`${styles['fresnel-container']} ${styles['fresnel-lessThan-md']}`} />
        </div>

        <div
          className={stylesTrailer['div-img-3']}
          data-testid="course-tile-terence-tao-teaches-mathematical-thinking"
        >
          <div className={`${styles['fresnel-container']} ${stylesTrailer['content-img']}`}>
            <div
              className={`${styles['overflow-hidden']} ${styles['corners-md']} ${styles['position-relative']}`}
              aria-labelledby="tile-desktop-nameplate-312"
            >
              <span>
                <div className={`${styles['tile']} ${styles['tile--9x16']}`}>
                  <div className={`${styles.tile_content}`}>
                    <span
                      style={{
                        boxSizing: 'border-box',
                        display: 'inline-block',
                        overflow: 'hidden',
                        width: 'initial',
                        height: 'initial',
                        background: 'none',
                        opacity: 1,
                        border: '0px',
                        margin: '0px',
                        padding: '0px',
                        position: 'relative',
                        maxWidth: '100%',
                      }}
                    >
                      <span
                        style={{
                          boxSizing: 'border-box',
                          display: 'block',
                          width: 'initial',
                          height: 'initial',
                          background: 'none',
                          opacity: 1,
                          border: '0px',
                          margin: '0px',
                          padding: '0px',
                          maxWidth: '100%',
                        }}
                      >
                        <img
                          style={{
                            display: 'block',
                            maxWidth: '100%',
                            width: 'initial',
                            height: 'initial',
                            background: 'none',
                            opacity: 1,
                            border: 0,
                            margin: 0,
                            padding: 0,
                          }}
                          alt=""
                          aria-hidden="true"
                          src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27395%27%20height=%27702%27/%3e"
                        />
                      </span>
                      <img
                        alt=""
                        src="https://www.masterclass.com/course-images/attachments/TQbKGrpPvjK1Xu5iLdzZUaN1?width=828&quality=75&format=webp"
                        className={`${styles['tile-image']} ${styles['animation-zoom']} ${styles['animation']}`}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
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
                    <div
                      className={`${styles['tile__component']} ${styles['tile-overlay']} ${styles['tile-overlay--gradient-bottom']}`}
                    />
                    <div
                      className={`${styles['tile__component']} ${styles['tile-caption']} ${styles['tile-caption--x-center']} ${styles['tile-caption--y-bottom']} ${styles['tile-caption--flush']}`}
                    >
                      <div className={`${styles['tile-caption__content']} ${styles['p-4']}`}>
                        <div
                          className={`${stylesTrailer['CourseOverlaySlideUpContent_slideUp__7fhL2']} ${styles['mb-2']}`}
                        >
                          <div id="tile-desktop-nameplate-312">
                            <div className={styles['nameplate']} data-testid="nameplate">
                              <div className={styles['nameplate__inner']}>
                                <div className={styles.NameplateImage_container___z3sm}>
                                  <span
                                    style={{
                                      boxSizing: 'border-box',
                                      display: 'block',
                                      overflow: 'hidden',
                                      width: 'initial',
                                      height: 'initial',
                                      background: 'none',
                                      opacity: 1,
                                      border: '0px',
                                      margin: '0px',
                                      padding: '0px',
                                      position: 'absolute',
                                      inset: '0px',
                                    }}
                                  >
                                    <span className={stylesTrailer['author-name']}>
                                      {'Frank Gehry'}
                                    </span>
                                  </span>
                                </div>
                                <div className={stylesTrailer.nameplate__separator} />
                                <p
                                  className={`${styles['text--2-lines']} ${stylesTrailer['text-h6']}`}
                                  data-testid="nameplate__sub-text"
                                >
                                  {'Teaches Design and Architecture'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </span>
            </div>
          </div>
          <div className={`${styles['fresnel-container']} ${styles['fresnel-lessThan-md']}`} />
        </div>

        <div
          className={stylesTrailer['div-img-4']}
          data-testid="course-tile-terence-tao-teaches-mathematical-thinking"
        >
          <div className={`${styles['fresnel-container']} ${stylesTrailer['content-img']}`}>
            <div
              className={`${styles['overflow-hidden']} ${styles['corners-md']} ${styles['position-relative']}`}
              aria-labelledby="tile-desktop-nameplate-312"
            >
              <span>
                <div className={`${styles['tile']} ${styles['tile--9x16']}`}>
                  <div className={`${styles.tile_content}`}>
                    <span
                      style={{
                        boxSizing: 'border-box',
                        display: 'inline-block',
                        overflow: 'hidden',
                        width: 'initial',
                        height: 'initial',
                        background: 'none',
                        opacity: 1,
                        border: '0px',
                        margin: '0px',
                        padding: '0px',
                        position: 'relative',
                        maxWidth: '100%',
                      }}
                    >
                      <span
                        style={{
                          boxSizing: 'border-box',
                          display: 'block',
                          width: 'initial',
                          height: 'initial',
                          background: 'none',
                          opacity: 1,
                          border: '0px',
                          margin: '0px',
                          padding: '0px',
                          maxWidth: '100%',
                        }}
                      >
                        <img
                          style={{
                            display: 'block',
                            maxWidth: '100%',
                            width: 'initial',
                            height: 'initial',
                            background: 'none',
                            opacity: 1,
                            border: 0,
                            margin: 0,
                            padding: 0,
                          }}
                          alt=""
                          aria-hidden="true"
                          src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27395%27%20height=%27702%27/%3e"
                        />
                      </span>
                      <img
                        alt=""
                        src="https://www.masterclass.com/course-images/attachments/k8QdbZh1XHfJdzb6i8Hz4Xre?width=828&quality=75&format=webp"
                        className={`${styles['tile-image']} ${styles['animation-zoom']} ${styles['animation']}`}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
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
                    <div
                      className={`${styles['tile__component']} ${styles['tile-overlay']} ${styles['tile-overlay--gradient-bottom']}`}
                    />
                    <div
                      className={`${styles['tile__component']} ${styles['tile-caption']} ${styles['tile-caption--x-center']} ${styles['tile-caption--y-bottom']} ${styles['tile-caption--flush']}`}
                    >
                      <div className={`${styles['tile-caption__content']} ${styles['p-4']}`}>
                        <div
                          className={`${stylesTrailer['CourseOverlaySlideUpContent_slideUp__7fhL2']} ${styles['mb-2']}`}
                        >
                          <div id="tile-desktop-nameplate-312">
                            <div className={styles['nameplate']} data-testid="nameplate">
                              <div className={styles['nameplate__inner']}>
                                <div className={styles.NameplateImage_container___z3sm}>
                                  <span
                                    style={{
                                      boxSizing: 'border-box',
                                      display: 'block',
                                      overflow: 'hidden',
                                      width: 'initial',
                                      height: 'initial',
                                      background: 'none',
                                      opacity: 1,
                                      border: '0px',
                                      margin: '0px',
                                      padding: '0px',
                                      position: 'absolute',
                                      inset: '0px',
                                    }}
                                  >
                                    <span className={stylesTrailer['author-name']}>
                                      {'Frank Gehry'}
                                    </span>
                                  </span>
                                </div>
                                <div className={stylesTrailer.nameplate__separator} />
                                <p
                                  className={`${styles['text--2-lines']} ${stylesTrailer['text-h6']}`}
                                  data-testid="nameplate__sub-text"
                                >
                                  {'Teaches Design and Architecture'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </span>
            </div>
          </div>
          <div className={`${styles['fresnel-container']} ${styles['fresnel-lessThan-md']}`} />
        </div>

        <div
          className={stylesTrailer['div-img-5']}
          data-testid="course-tile-terence-tao-teaches-mathematical-thinking"
        >
          <div className={`${styles['fresnel-container']} ${stylesTrailer['content-img']}`}>
            <div
              className={`${styles['overflow-hidden']} ${styles['corners-md']} ${styles['position-relative']}`}
              aria-labelledby="tile-desktop-nameplate-312"
            >
              <span>
                <div className={`${styles['tile']} ${styles['tile--9x16']}`}>
                  <div className={`${styles.tile_content}`}>
                    <span
                      style={{
                        boxSizing: 'border-box',
                        display: 'inline-block',
                        overflow: 'hidden',
                        width: 'initial',
                        height: 'initial',
                        background: 'none',
                        opacity: 1,
                        border: '0px',
                        margin: '0px',
                        padding: '0px',
                        position: 'relative',
                        maxWidth: '100%',
                      }}
                    >
                      <span
                        style={{
                          boxSizing: 'border-box',
                          display: 'block',
                          width: 'initial',
                          height: 'initial',
                          background: 'none',
                          opacity: 1,
                          border: '0px',
                          margin: '0px',
                          padding: '0px',
                          maxWidth: '100%',
                        }}
                      >
                        <img
                          style={{
                            display: 'block',
                            maxWidth: '100%',
                            width: 'initial',
                            height: 'initial',
                            background: 'none',
                            opacity: 1,
                            border: 0,
                            margin: 0,
                            padding: 0,
                          }}
                          alt=""
                          aria-hidden="true"
                          src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27395%27%20height=%27702%27/%3e"
                        />
                      </span>
                      <img
                        alt=""
                        src="https://www.masterclass.com/course-images/attachments/RPwDtwKperk61tCR418yoCtH?width=828&quality=75&format=webp"
                        className={`${styles['tile-image']} ${styles['animation-zoom']} ${styles['animation']}`}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
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
                    <div
                      className={`${styles['tile__component']} ${styles['tile-overlay']} ${styles['tile-overlay--gradient-bottom']}`}
                    />
                    <div
                      className={`${styles['tile__component']} ${styles['tile-caption']} ${styles['tile-caption--x-center']} ${styles['tile-caption--y-bottom']} ${styles['tile-caption--flush']}`}
                    >
                      <div className={`${styles['tile-caption__content']} ${styles['p-4']}`}>
                        <div
                          className={`${stylesTrailer['CourseOverlaySlideUpContent_slideUp__7fhL2']} ${styles['mb-2']}`}
                        >
                          <div id="tile-desktop-nameplate-312">
                            <div className={styles['nameplate']} data-testid="nameplate">
                              <div className={styles['nameplate__inner']}>
                                <div className={styles.NameplateImage_container___z3sm}>
                                  <span
                                    style={{
                                      boxSizing: 'border-box',
                                      display: 'block',
                                      overflow: 'hidden',
                                      width: 'initial',
                                      height: 'initial',
                                      background: 'none',
                                      opacity: 1,
                                      border: '0px',
                                      margin: '0px',
                                      padding: '0px',
                                      position: 'absolute',
                                      inset: '0px',
                                    }}
                                  >
                                    <span className={stylesTrailer['author-name']}>
                                      {'Frank Gehry'}
                                    </span>
                                  </span>
                                </div>
                                <div className={stylesTrailer.nameplate__separator} />
                                <p
                                  className={`${styles['text--2-lines']} ${stylesTrailer['text-h6']}`}
                                  data-testid="nameplate__sub-text"
                                >
                                  {'Teaches Design and Architecture'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </span>
            </div>
          </div>
          <div className={`${styles['fresnel-container']} ${styles['fresnel-lessThan-md']}`} />
        </div>
      </div>
      <div className={`${stylesTrailer.divEmail}`}>
        <span>{t('enter-email-for-this-amazing-monthly-gift')}</span>
        <div className={`${stylesTrailer.inputEmail} ${error && stylesTrailer.inputEmailError}`}>
          <input
            value={email}
            type="email"
            onChange={(e) => handleChangeEmail(e)}
            placeholder={`${t('your-email-address')}`}
          />
          {error && (
            <span className={stylesTrailer.textError}>
              {' '}
              <svg
                width={16}
                height={15}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="img"
                className="mc-icon mc-icon--md mc-icon--scale-4"
              >
                <path
                  d="m21.809 19.416-8.33-15.341a1.637 1.637 0 0 0-.614-.631 1.706 1.706 0 0 0-1.722 0c-.26.152-.472.37-.614.63L2.2 19.418a1.575 1.575 0 0 0 .05 1.614c.152.233.362.424.612.555.249.132.529.2.813.196h16.66c.287 0 .57-.072.819-.208.25-.137.459-.334.607-.572a1.579 1.579 0 0 0 .049-1.585ZM11.17 9.671c0-.215.088-.42.244-.571a.847.847 0 0 1 .589-.237c.22 0 .433.085.59.237a.795.795 0 0 1 .243.57v4.845c0 .214-.088.42-.244.571a.847.847 0 0 1-.589.237.847.847 0 0 1-.589-.237.795.795 0 0 1-.244-.57V9.67Zm.875 9.285a1.295 1.295 0 0 1-.879-.347 1.219 1.219 0 0 1-.388-.84 1.164 1.164 0 0 1 .344-.868 1.264 1.264 0 0 1 1.76-.02c.236.221.374.522.387.84a1.163 1.163 0 0 1-.343.868 1.237 1.237 0 0 1-.881.367Z"
                  fill="currentColor"
                />
              </svg>
              &nbsp;Email is required
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
export default FeaturedPreview;
