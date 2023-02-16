import { CategoryModel } from '@/declares/models/Categories';
import { isArray } from 'lodash';
import Link from 'next/link';
import { useCallback } from 'react';
import styles from '../../styles/categories.module.scss';

interface SubMenuCategoriesModel {
  nameCategory: string;
  listCategories: Array<CategoryModel>;
}

const SubMenuCategories: React.FC<SubMenuCategoriesModel> = (props) => {
  const { nameCategory, listCategories } = props;
  const checkSelectCategory = (name: string) => {
    return nameCategory === name;
  };

  const renderList = useCallback(() => {
    return listCategories.map((item, index) => {
      return (
        <div key={index} className={styles['mb-4']} data-testid="sidebar-filter">
          <Link className={styles['mb-4']} href={`/categories/${item.url}`}>
            <div className={`${styles['align-items-baseline']} ${styles['d-inline-flex']}`}>
              {checkSelectCategory(item.url) && (
                <hr className={`${styles['mr-1 ']} ${styles['my-0']} ${styles['Nav_separator']}`} />
              )}
              <span
                className={`${styles['text-h6']} ${
                  !checkSelectCategory(item.url) ? styles['opacity-hinted'] : null
                }`}
              >
                {item?.name}
              </span>
              <span className={styles.sr_only}>category</span>
            </div>
          </Link>
        </div>
      );
    });
  }, [listCategories, nameCategory]);

  return (
    <>
      <div className={`${styles['col-md-4']} ${styles['mc-p-0']} ${styles['col-lg-3']}`}>
        <div className={styles.fresnel_container}>
          <nav aria-label="Categories">
            <div className={styles['mb-4']} data-testid="sidebar-filter">
              <Link className={styles['mb-4']} href="/categories/all-classes">
                <div className={`${styles['align-items-baseline']} ${styles['d-inline-flex']}`}>
                  {checkSelectCategory('all-classes') && (
                    <hr
                      className={`${styles['mr-1 ']} ${styles['my-0']} ${styles['Nav_separator']}`}
                    />
                  )}
                  <span
                    className={`${styles['text-h6']} ${
                      !checkSelectCategory('all-classes') ? styles['opacity-hinted'] : null
                    }`}
                  >
                    All
                  </span>
                  <span className={styles.sr_only}>category{/* */} selected</span>
                </div>
              </Link>
            </div>
            {Array(isArray(listCategories)) && renderList()}
          </nav>
        </div>
      </div>
    </>
  );
};

export default SubMenuCategories;
