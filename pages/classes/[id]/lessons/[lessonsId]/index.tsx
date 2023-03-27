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
  resClasses: any;
}

const ChaptersPage = ({ categories, resClasses }: Props) => {

  const indexSelectedLesson = useAppSelector((state) => state.class.indexSelectedLesson);
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const [lesson, setLesson] = useState([]);
  const [isPayment, setIsPayment] = useState(false);

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
    if (typeof window !== 'undefined') {
      const currentUser = JSON.parse(localStorage.getItem('ACCESS_TOKEN') as string);
      if (currentUser) {
        fetchLessonDetail();
      }
    }
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
      classes={resClasses}
      indexSelectedLesson={indexSelectedLesson}
      handleChangeLesson={handleChangeLesson}
      isPayment={isPayment}
    />
  );
};

export async function getServerSideProps(context: any) {
  const { locale } = context;
  try {
    const categories: any = await classAPI.getListCategory({
      page: 1,
      limit: 100,
    });
    const resClasses: any = await classAPI.getDetailByWebNameV1({ webName: context.query.id });
    
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        categories: categories?.data,
        resClasses: resClasses?.data,
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
