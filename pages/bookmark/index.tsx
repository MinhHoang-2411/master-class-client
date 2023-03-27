import BookmarkComponent from '@/components/bookmark';
import Layout from '@/components/layouts';
import bookmarkApi from '@/services/api/bookmark';
import { getAuth } from '@/utils/auth';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styles from '../../styles/categories.module.scss';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

interface BookmarkPageModel {
  courses: any;
}

const BookmarkPage = ({}: BookmarkPageModel) => {
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation('common');
  const FetchingAllBookmark = async () => {
    try {
      setLoading(true);
      const paramsClasses = {
        modelType: 'CLASSES',
      };
      const paramsLessons = {
        modelType: 'LESSONS',
      };
      const responseClasses: any = await bookmarkApi.getAllFavourite(paramsClasses);
      const responseLesson: any = await bookmarkApi.getAllFavourite(paramsLessons);
      if (responseClasses?.data) {
        setCourses(responseClasses?.data);
        setLoading(false);
      }
      if (responseLesson?.data) {
        setLessons(responseLesson?.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    FetchingAllBookmark();
  }, []);

  const onDeleteBookmarkClass = async (params: any) => {
    const response: any = await bookmarkApi.deleteMyFavorite(params);
    if (response.data) {
      FetchingAllBookmark();
      toast.success(`${t('delete-lesson-bookmark')}`);
    }
  };

  return (
    <>
      <main className={styles.page_content}>
        <section className={`${styles.container} ${styles['pt-3']} ${styles['pb-6']} `}>
          <h1 className={`${styles.text_h1}`}>{t('my-favourites')}</h1>
          <div
            className={`${styles.row} ${styles.Courses_CoursesSectionContent} ${styles.mc_mx_0}`}
          >
            {!loading ? (
              <>
                {courses.map((data: any) => (
                  <>
                    <BookmarkComponent
                      courses={data.courses}
                      onDeleteBookmarkClass={onDeleteBookmarkClass}
                    />
                  </>
                ))}
                {lessons.map((data: any) => (
                  <>
                    <BookmarkComponent
                      courses={data.lessons}
                      onDeleteBookmarkClass={onDeleteBookmarkClass}
                    />
                  </>
                ))}
              </>
            ) : (
              <>
                <span style={{ fontSize: '24px' }}>Loading...</span>
              </>
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
BookmarkPage.Layout = Layout;
export default BookmarkPage;
