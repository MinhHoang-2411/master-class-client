import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import styles from '../../styles/categories.module.scss';

interface SubMenuCategoriesModel {}

const SubMenuCategories: React.FC<SubMenuCategoriesModel> = (props) => {
  const {} = props;
  return (
    <>
      <div className={`${styles['col-md-4']} ${styles['mc-p-0']} ${styles['col-lg-3']}`}>
        <div className={styles.fresnel_container}>
          <nav aria-label="Categories">
            <div className={styles['mb-4']} data-testid="sidebar-filter">
              <a className={styles['mb-4']} href="#">
                <div className={`${styles['align-items-baseline']} ${styles['d-inline-flex']}`}>
                  <hr
                    className={`${styles['mr-1 ']} ${styles['my-0']} ${styles['Nav_separator']}`}
                  />
                  <span className={styles['text-h6']}>All</span>
                  <span className={styles.sr_only}>category{/* */} selected</span>
                </div>
              </a>
            </div>
            <div className={styles['mb-4']} data-testid="sidebar-filter">
              <a className={styles['mb-4']} href="#">
                <div className={`${styles['align-items-baseline']} ${styles['d-inline-flex']}`}>
                  <span className={`${styles['text-h6']} ${styles['opacity-hinted']}`}>
                    Coming Soon
                  </span>
                  <span className={styles.sr_only}>category</span>
                </div>
              </a>
            </div>
            <div className={styles['mb-4']} data-testid="sidebar-filter">
              <a className={styles['mb-4']} href="#">
                <div className={`${styles['align-items-baseline']} ${styles['d-inline-flex']}`}>
                  <span className={`${styles['text-h6']} ${styles['opacity-hinted']}`}>
                    Just Added
                  </span>
                  <span className={styles.sr_only}>category</span>
                </div>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default SubMenuCategories;
