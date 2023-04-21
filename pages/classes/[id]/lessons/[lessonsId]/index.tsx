import LessonDetailPageComponent from '@/components/class/LessonDetailPage';
import categoriesAPI from '@/services/api/categories';
import classAPI from '@/services/api/class';
import { classActions } from '@/store/class/classSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { paymentActions } from '@/store/payment/paymentSlice';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Props {
  categories: any;
  resClasses: any;
}

const ChaptersPage = ({ categories, resClasses }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const indexSelectedLesson = useAppSelector((state) => state.class.indexSelectedLesson);

  const isPaymentState = useAppSelector((state) => state.payment.isPayment);
  const isCheckPayment = useAppSelector((state) => state.payment.loadingCheckPayment);

  const [lesson, setLesson] = useState([]);

  const fetchLessonDetail = async () => {
    try {
      let responseLesson: any;
      responseLesson = await classAPI.getDetailLesson(router?.query?.lessonsId);
      if (responseLesson?.data) {
        setLesson(responseLesson?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUser = JSON.parse(localStorage.getItem('ACCESS_TOKEN') as string);
      if (currentUser) {
        fetchLessonDetail();
      } else {
        dispatch(paymentActions.isNotPayment());
      }
    }
  }, [router.query.lessonsId, isPaymentState]);

  //test get last second view
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (
        `${router.query.id}/lessons/${router.query.lessonsId}` ===
        'st.vincentt-teaches-creativity-and-songwriting/lessons/5'
      ) {
        console.log('Set current time for video from localStorage');
        console.log('Remove localStorage & call api');
      } else {
        console.log('Remove localStorage & call api');
      }
    }
  }, [router.query.lessonsId]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUser = JSON.parse(localStorage.getItem('ACCESS_TOKEN') as string);
      const isOpenSubscribe = JSON.parse(localStorage.getItem('SubscribePopup') as string);
      if (currentUser) {
        if (!isCheckPayment && !isPaymentState && isOpenSubscribe) {
          dispatch(paymentActions.openModalChoosePayment());
          localStorage.removeItem('SubscribePopup');
        } else if (!isCheckPayment && isPaymentState && isOpenSubscribe) {
          localStorage.removeItem('SubscribePopup');
        }
      }
    }
  }, [isPaymentState, isCheckPayment]);

  //test
  // useEffect(() => {
  //   const clearLocalStorage = () => {
  //     localStorage.removeItem('SubscribePopup');
  //     localStorage.removeItem('openModalPayment');
  //   };
  //   window.addEventListener('beforeunload', clearLocalStorage);

  //   return () => {
  //     window.removeEventListener('beforeunload', clearLocalStorage);
  //   };
  // }, []);

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
      isPayment={isPaymentState}
    />
  );
};

export async function getServerSideProps(context: any) {
  const { locale } = context;
  try {
    const categories: any = await categoriesAPI.fetchData({
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
