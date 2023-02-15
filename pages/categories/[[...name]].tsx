import SubMenuCategories from '@/components/categories/subMenuCategories';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import styles from '../../styles/categories.module.scss';

interface CategoriesModel {}

const Categories: React.FC<CategoriesModel> = (props) => {
  const router = useRouter();
  const nameCategory = router?.query?.name?.[0] || 'all-classes';

  const {} = props;
  return (
    <>
      <main className={styles.page_content}>
        <section className={styles.container}>
          <h1 className={styles.text_h1}>Browse Classes and Original Series</h1>
          <div
            className={`${styles.row} ${styles.Courses_CoursesSectionContent} ${styles.mc_mx_0}`}
          >
            <SubMenuCategories />
          </div>
        </section>
      </main>
    </>
  );
};

export default Categories;
