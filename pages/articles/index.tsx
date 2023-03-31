import ArticlesComponent from '@/components/articles';
import ArticlesCategories from '@/components/articles/ArticlesCategories';
import Layout from '@/components/layouts';
import classAPI from '@/services/api/class';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styles from '../../styles/articles.module.scss';

interface ArticlesPageModel {
  categories: any;
}

const ArticlesPage = ({ categories }: ArticlesPageModel) => {
  const { t } = useTranslation('common');

  return (
    <>
      <main className={styles.page_content}>
        <ArticlesCategories categories={categories} />
        <ArticlesComponent />
      </main>
    </>
  );
};

export async function getStaticProps({ locale }: any) {
  try {
    const categories: any = await classAPI.getListCategory({
      page: 1,
      limit: 100,
    });

    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        categories: categories?.data,
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
ArticlesPage.Layout = Layout;
export default ArticlesPage;
