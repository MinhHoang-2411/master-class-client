import ListClass from '@/components/categories/ListClass';
import SubMenuCategories from '@/components/categories/subMenuCategories';
import { CategoryModel } from '@/declares/models/Categories';
import { useAppSelector } from '@/store/hooks';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import styles from '../../styles/categories.module.scss';

interface CategoriesModel {}

const Categories = (props: CategoriesModel) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const nameCategory = router?.query?.name?.[0] || 'all-classes';
  const listCategories = useAppSelector((state) => state?.categories?.listData);

  const getTitleCategory = () => {
    if (nameCategory === 'all-classes')
      return {
        name: t('browse-classes-and-original-series'),
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

export async function getServerSideProps({ locale }: any) {
  try {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  } catch (error) {
    console.error(error);
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Categories;
