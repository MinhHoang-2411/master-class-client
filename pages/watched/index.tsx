import Layout from '@/components/layouts';
import WatchedComponent from '@/components/watched';
import bookmarkApi from '@/services/api/bookmark';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { watchingActions } from '@/store/watching/watchingSlice';
import { isMappable } from '@/utils/helper';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import styles from '../../styles/categories.module.scss';

interface BookmarkPageModel {
  courses: any;
}

const WatchedPage = ({}: BookmarkPageModel) => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const myWatching = useAppSelector((state) => state.watching.myWatching);


  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    dispatch(watchingActions.getMyWatching(params));
  }, []);

  const onShowAll = () => {
    const _params = {
      ...params,
      page: params.page + 1,
    };
    setParams(_params);
    dispatch(watchingActions.onFetchMore(_params));
  };

  return (
    <>
      <main className={styles.page_content}>
        <section className={`${styles.container} ${styles['pt-3']} ${styles['pb-6']} `}>
          <h1 className={`${styles.text_h1}`}>{t('Watched')}</h1>
          <div
            className={`${styles.row} ${styles.Courses_CoursesSectionContent} ${styles.mc_mx_0}`}
          >
            {isMappable(myWatching) ? (
              <WatchedComponent myWatching={myWatching} onShowAll={onShowAll} params={params} />
            ) : (
              <>{t('There are no videos')}</>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export async function getStaticProps({ locale }: any) {
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
WatchedPage.Layout = Layout;
export default WatchedPage;
