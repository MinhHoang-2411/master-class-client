import useGetAllList from '@/hooks/useGetAllList';
import { classActions } from '@/store/class/classSlice';
import { useState } from 'react';
import styles from '../../styles/categories.module.scss';

interface ListClassModel {
  idCategory: string | null;
}

const ListClass: React.FC<ListClassModel> = (props) => {
  const [params, setParams] = useState({
    page: 1,
    limit: 100,
    search: null,
    categories: props?.idCategory || null,
  });
  const { listData: listClass, loading } = useGetAllList(classActions, 'class', params);

  // const renderList = useCallback(() => {
  //   return listClass.map((item: any, index: number) => {
  //     return (
  //       <div key={index} className={styles['mb-4']} data-testid="sidebar-filter">
  //         {item}
  //       </div>
  //     );
  //   });
  // }, [listClass]);

  return (
    <>
      <div className={`${styles['col-md-8']} ${styles['col-lg-9']} ${styles['lg-0']}`}>
        <div className={styles.row}>
          <div
            className={`${styles['col-12']} ${styles['col-md-6']} ${styles['col-lg-4']} ${styles['pb-4']} ${styles['px-0']} ${styles['py-0']}`}
            role="group"
            aria-label="Class"
          >
            <div
              className={styles['col-4']}
              data-testid="course-tile-terence-tao-teaches-mathematical-thinking"
            >
              <div className={styles['fresnel-container']}>
                <div
                  className={`${styles['overflow-hidden']} ${styles['corners-md']} ${styles['lg-0']}`}
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
                        <div className="mc-tile__component mc-tile-overlay mc-tile-overlay--gradient-bottom " />
                        <div className="mc-tile__component mc-tile-caption mc-tile-caption--x-center mc-tile-caption--y-bottom mc-tile-caption--flush">
                          <div className="mc-tile-caption__content mc-p-4">
                            <div className="mc-mb-2 CourseOverlaySlideUpContent_slideUp__7fhL2">
                              <div id="tile-desktop-nameplate-312">
                                <div
                                  className="mc-nameplate mc-nameplate--small"
                                  data-testid="nameplate"
                                >
                                  <div className="mc-nameplate__inner">
                                    <h2>
                                      <div className="NameplateImage_container___z3sm">
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
                                          <img
                                            alt="Gordon Ramsay"
                                            src="https://www.masterclass.com/course-images/attachments/M9gAFDV18n8Z1ULC54QB8YXH?width=3840&quality=75&format=webp"
                                            decoding="async"
                                            data-nimg="fill"
                                            className="NameplateImage_image__oGvmQ"
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
                                            sizes="220px"
                                          />
                                        </span>
                                      </div>
                                    </h2>
                                    <div className="mc-nameplate__separator" />
                                    <p
                                      className="mc-text--2-lines mc-text-h6"
                                      data-testid="nameplate__sub-text"
                                    >
                                      Teaches Mathematical Thinking
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="CourseOverlaySlideUpContent_buttons__9SVAg CourseOverlaySlideUpContent_fadeIn__wij7p">
                                <button
                                  type="button"
                                  className="c-button c-button--full-width c-button--play c-button--md mc-mb-3 mc-mt-6"
                                >
                                  <svg
                                    width={24}
                                    height={25}
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    role="img"
                                    className="mc-icon mc-icon--md mc-mr-3"
                                  >
                                    <path
                                      d="M7.791 2.695a1.25 1.25 0 0 0-1.92 1.055v17.5a1.25 1.25 0 0 0 1.92 1.055l13.75-8.75a1.25 1.25 0 0 0 0-2.11l-13.75-8.75Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                  Watch Sample
                                </button>
                                <a
                                  className="c-button c-button--secondary c-button--full-width"
                                  href="/classes/terence-tao-teaches-mathematical-thinking"
                                >
                                  <svg
                                    width={24}
                                    height={25}
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    role="img"
                                    className="mc-icon mc-icon--md mc-mr-3"
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
                                  View Class Info
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </span>
                </div>
              </div>
              <div className="fresnel-container fresnel-lessThan-md " />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListClass;
