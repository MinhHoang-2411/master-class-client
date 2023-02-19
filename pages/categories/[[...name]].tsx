import ListClass from '@/components/categories/ListClass';
import SubMenuCategories from '@/components/categories/subMenuCategories';
import { CategoryModel } from '@/declares/models/Categories';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import styles from '../../styles/categories.module.scss';

interface CategoriesModel {}

const Categories: React.FC<CategoriesModel> = (props) => {
  const router = useRouter();
  const nameCategory = router?.query?.name?.[0] || 'all-classes';
  const listCategories = useAppSelector((state) => state?.categories?.listData);

  const getTitleCategory = () => {
    if (nameCategory === 'all-classes')
      return {
        name: 'Browse Classes and Original Series',
        _id: null,
      };
    return listCategories?.find((element) => element?.url === nameCategory) as CategoryModel;
  };

  const {} = props;
  return (
    <>
      <main className={styles.page_content}>
        <section className={styles.container}>
          <h1 className={styles.text_h1}>{getTitleCategory()?.name || ''}</h1>
          <div
            className={`${styles.row} ${styles.Courses_CoursesSectionContent} ${styles.mc_mx_0}`}
          >
            <SubMenuCategories nameCategory={nameCategory} listCategories={listCategories} />
            <ListClass idCategory={getTitleCategory()?._id} />
          </div>
        </section>
      </main>
    </>
  );
};

export default Categories;
