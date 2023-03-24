import LessonDetailPageComponent from '@/components/class/LessonDetailPage';
import classAPI from '@/services/api/class';
import { classActions } from '@/store/class/classSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getAuth } from '@/utils/auth';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Props {
  categories: any;
}

const ChaptersPage = ({ categories }: Props) => {
  const indexSelectedLesson = useAppSelector((state) => state.class.indexSelectedLesson);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [lesson, setLesson] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isPayment, setIsPayment] = useState(false);

  const payload = {
    webName: router.query.id,
  };

  const fetchDataCourse = async () => {
    try {
      let responseClasses: any;
      responseClasses = await classAPI.getDetailByWebNameV1(payload);
      if (responseClasses?.data) {
        setClasses(responseClasses?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLessonDetail = async () => {
    try {
      let responseLesson: any;
      responseLesson = await classAPI.getDetailLesson(router?.query?.lessonsId);
      if (responseLesson?.data) {
        setLesson(responseLesson?.data);
        setIsPayment(true);
      }
    } catch (error) {
      setIsPayment(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataCourse();
    fetchLessonDetail();
  }, [router.query.lessonsId]);

  const handleChangeLesson = (lessonId: string, index: number) => {
    dispatch(classActions.setIndexSelectedLesson(index));
    const query = router.query;
    router.push(`/classes/${query.id}/lessons/${lessonId}`, undefined, { shallow: true });
  };

  return (
    <LessonDetailPageComponent
      categories={categories}
      lesson={lesson}
      classes={classes}
      indexSelectedLesson={indexSelectedLesson}
      handleChangeLesson={handleChangeLesson}
      isPayment={isPayment}
    />
  );
};

export async function getServerSideProps(context: any) {
  const { locale } = context;
  try {
    const payloadCategory = {
      page: 1,
      limit: 100,
    };
    const categories: any = await classAPI.getListCategory(payloadCategory);

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

export default ChaptersPage;
