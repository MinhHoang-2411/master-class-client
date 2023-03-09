import { CategoryModel } from '@/declares/models/Categories';
import { isArray } from 'lodash';
import Link from 'next/link';
import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import styles from '../../styles/dropdown.module.scss';

interface CategoriesModel {
  setShowCategory: (show: boolean) => void;
  listCategories: Array<CategoryModel>;
}

const ModalCategories: React.FC<CategoriesModel> = (props) => {
  const { t } = useTranslation('common');
  const { setShowCategory, listCategories } = props;

  const renderList = useCallback(() => {
    return listCategories.map((item, index) => {
      return (
        <button key={index} className={styles.dropdown_item} role="option">
          <p className={styles.dropdown_text}>
            <Link
              className="d-block"
              href={`/categories/${item?.url}`}
              onClick={() => setShowCategory(false)}
            >
              {item?.name}
            </Link>
          </p>
        </button>
      );
    });
  }, [listCategories]);

  return (
    <>
      <div className={styles.dropdown}>
        <h1 id="mobile-dropdown" className={styles.sr_only}>
          Dropdown menu
        </h1>
        <div
          className={`${styles.mc_backdrop} ${styles.backdrop_dark} ${styles.dropdown_backdrop}`}
        ></div>

        <div className={`${styles.dropdown} ${styles.content_container}`}>
          <div className={styles.dropdown_close}>
            <button
              type="button"
              className={styles.button_close}
              onClick={() => setShowCategory(false)}
            >
              <span className={styles.sr_only}>Close</span>
              <svg
                className={styles.close_icon}
                width={24}
                height={25}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="img"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.418 2.918a1.429 1.429 0 0 1 2.02 0L12 10.48l7.561-7.562a1.429 1.429 0 0 1 2.02 2.02l-7.56 7.562 7.56 7.561a1.429 1.429 0 1 1-2.02 2.02L12 14.522l-7.561 7.56a1.429 1.429 0 1 1-2.02-2.02l7.56-7.561-7.56-7.561a1.429 1.429 0 0 1 0-2.02Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <div id="nav-categories-dropdown" className={styles.dropdown_content}>
            <div className={styles.dropdown_body}>
              {Array(isArray(listCategories) && renderList())}
            </div>
            <div className={styles.dropdown_footer}>
              <div style={{ padding: '12px 16px' }}>
                <a className={styles.button} href="#">
                  {t('discover')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCategories;
