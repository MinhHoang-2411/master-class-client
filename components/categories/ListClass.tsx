import useGetAllList from '@/hooks/useGetAllList';
import { classActions } from '@/store/class/classSlice';
import { isArray } from 'lodash';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import styles from '../../styles/categories.module.scss';
import { Skeleton } from '@mui/material';

interface ListClassModel {
  idCategory: string | null;
}

const ListClass: React.FC<ListClassModel> = (props) => {
  const { t } = useTranslation('common');
  const [params, setParams] = useState({
    page: 1,
    limit: 100,
    search: null,
    categories: props?.idCategory || null,
  });
  const { listData: listClass, loading } = useGetAllList(classActions, 'class', params);

  useEffect(() => {
    setParams((preState) => ({ ...preState, categories: props?.idCategory || null }));
  }, [props.idCategory]);

  const renderList = useCallback(() => {
    return listClass.map((item: any, index: number) => {
      return (
        <div
          key={index}
          className={`${styles['col-12']} ${styles['col-md-6']} ${styles['col-lg-4']} ${styles['pb-4']} ${styles['px-0']} ${styles['py-0']}`}
          role="group"
          aria-label="Class"
        >
          <div
            className={styles['pl-4']}
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
                          src={item?.thumbnail}
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
                                        {/* <img
                                          alt="Gordon Ramsay"
                                          src="https://www.masterclass.com/course-images/attachments/M9gAFDV18n8Z1ULC54QB8YXH?width=3840&quality=75&format=webp"
                                          decoding="async"
                                          data-nimg="fill"
                                          className={styles.NameplateImage_image__oGvmQ}
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
                                            width: '220px !important',
                                            minWidth: '100%',
                                          }}
                                        /> */}
                                        <span className={styles['author-name']}>
                                          {item?.authorName}
                                        </span>
                                      </span>
                                    </div>
                                  </h2>
                                  <div className={styles.nameplate__separator} />
                                  <p
                                    className={`${styles['text--2-lines']} ${styles['text-h6']}`}
                                    data-testid="nameplate__sub-text"
                                  >
                                    {item?.name}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div
                              className={`${styles['CourseOverlaySlideUpContent_buttons__9SVAg']} ${styles['CourseOverlaySlideUpContent_fadeIn__wij7p']}`}
                            >
                              <button type="button" className={styles['button-watch']}>
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
                                    d="M7.791 2.695a1.25 1.25 0 0 0-1.92 1.055v17.5a1.25 1.25 0 0 0 1.92 1.055l13.75-8.75a1.25 1.25 0 0 0 0-2.11l-13.75-8.75Z"
                                    fill="currentColor"
                                  />
                                </svg>
                                {t('watch-sample')}
                              </button>
                              <Link
                                className={styles['button-view']}
                                href={`/classes/${item?.webName}` || '#'}
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
    });
  }, [listClass]);

  return (
    <>
      <div className={`${styles['col-md-8']} ${styles['col-lg-9']} ${styles['pl-0']}`}>
        {!loading ? (
          <div className={styles.row}>{Array(isArray(listClass)) && renderList()}</div>
        ) : (
          <div className={styles.row}>
            <div
              className={`${styles['col-12']} ${styles['col-md-6']} ${styles['col-lg-4']} ${styles['pb-4']} ${styles['px-0']} ${styles['py-0']}`}
              role="group"
              aria-label="Class"
            >
              <div
                className={styles['pl-4']}
                data-testid="course-tile-terence-tao-teaches-mathematical-thinking"
              >
                <div className={styles['fresnel-container']}>
                  <div
                    className={`${styles['overflow-hidden']} ${styles['corners-md']} ${styles['position-relative']}`}
                    aria-labelledby="tile-desktop-nameplate-312"
                  >
                    <span>
                      <Skeleton
                        sx={{ bgcolor: 'grey.600' }}
                        variant="rounded"
                        width={350}
                        height={500}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`${styles['col-12']} ${styles['col-md-6']} ${styles['col-lg-4']} ${styles['pb-4']} ${styles['px-0']} ${styles['py-0']}`}
              role="group"
              aria-label="Class"
            >
              <div
                className={styles['pl-4']}
                data-testid="course-tile-terence-tao-teaches-mathematical-thinking"
              >
                <div className={styles['fresnel-container']}>
                  <div
                    className={`${styles['overflow-hidden']} ${styles['corners-md']} ${styles['position-relative']}`}
                    aria-labelledby="tile-desktop-nameplate-312"
                  >
                    <span>
                      <Skeleton
                        sx={{ bgcolor: 'grey.600' }}
                        variant="rounded"
                        width={350}
                        height={500}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`${styles['col-12']} ${styles['col-md-6']} ${styles['col-lg-4']} ${styles['pb-4']} ${styles['px-0']} ${styles['py-0']}`}
              role="group"
              aria-label="Class"
            >
              <div
                className={styles['pl-4']}
                data-testid="course-tile-terence-tao-teaches-mathematical-thinking"
              >
                <div className={styles['fresnel-container']}>
                  <div
                    className={`${styles['overflow-hidden']} ${styles['corners-md']} ${styles['position-relative']}`}
                    aria-labelledby="tile-desktop-nameplate-312"
                  >
                    <span>
                      <Skeleton
                        sx={{ bgcolor: 'grey.600' }}
                        variant="rounded"
                        width={350}
                        height={500}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ListClass;
