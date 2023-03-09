import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import styles from '../../styles/categories.module.scss';

interface Props {
  courses: any;
  onDeleteBookmarkClass: any;
}

const BookmarkComponent = ({ courses, onDeleteBookmarkClass }: Props) => {
  const { t } = useTranslation('common');
  return (
    <div
      className={`${styles['col-12']} ${styles['col-md-6']} ${styles['col-lg-4']} ${styles['pb-4']} ${styles['px-0']} ${styles['py-0']}`}
      role="group"
      aria-label="Class"
    >
      <div
        className={`${styles['p-4']}`}
        data-testid="course-tile-terence-tao-teaches-mathematical-thinking"
      >
        <div className={styles['fresnel-container']}>
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
                      src={courses?.thumbnail}
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
                        className={`${styles['CourseOverlaySlideUpContent_slideUp__7fhL2']} ${styles['mb-2']}`}
                      >
                        <div id="tile-desktop-nameplate-312">
                          <div className={styles['nameplate']} data-testid="nameplate">
                            <div className={styles['nameplate__inner']}>
                              <h2>
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
                                    <span className={styles['author-name']}>
                                      {courses?.authorName}
                                    </span>
                                  </span>
                                </div>
                              </h2>
                              <div className={styles.nameplate__separator} />
                              <p
                                className={`${styles['text--2-lines']} ${styles['text-h6']}`}
                                data-testid="nameplate__sub-text"
                              >
                                {courses?.name}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`${styles['CourseOverlaySlideUpContent_buttons__9SVAg']} ${styles['CourseOverlaySlideUpContent_fadeIn__wij7p']}`}
                        >
                          <button
                            type="button"
                            className={styles['button-watch']}
                            onClick={() =>
                              onDeleteBookmarkClass({
                                modelId: courses._id,
                                modelType: 'CLASSES',
                              })
                            }
                          >
                            {t('remove-favourite')}
                          </button>
                          <Link
                            className={styles['button-view']}
                            href={`/classes/${courses?.webName}` || '#'}
                          >
                            <svg
                              width={24}
                              height={25}
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              role="img"
                              className={`${styles['icon--md']} ${styles['mr-3']}`}
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 4.722a7.778 7.778 0 1 0 0 15.556 7.778 7.778 0 0 0 0-15.556ZM2 12.5c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10Z"
                                fill="currentColor"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 11.965c.592 0 1.072.48 1.072 1.071v2.679a1.071 1.071 0 1 1-2.143 0v-2.679c0-.591.48-1.071 1.071-1.071Z"
                                fill="currentColor"
                              />
                              <path
                                d="M13.072 9.286a1.071 1.071 0 1 1-2.143 0 1.071 1.071 0 0 1 2.143 0Z"
                                fill="currentColor"
                              />
                            </svg>
                            {t('view-class-info')}
                          </Link>
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
  );
};

export default BookmarkComponent;
