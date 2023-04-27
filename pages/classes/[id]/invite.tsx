import LessonDetailPageComponent from '@/components/class/LessonDetailPage';
import InvitationsComponent from '@/components/invitations';
import categoriesAPI from '@/services/api/categories';
import classAPI from '@/services/api/class';
import { classActions } from '@/store/class/classSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { paymentActions } from '@/store/payment/paymentSlice';
import { Container } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../../styles/classes.module.scss';

interface Props {
  classes: any;
  categories: any;
}

const InvitePage = ({ classes }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [lesson, setLesson] = useState(classes);

  const fetchData = async () => {
    try {
      let response: any;
      const payload = {
        webName: router.query.id,
      };
      response = await classAPI.getDetailByWebNameV1(payload);
      if (response?.data) {
        setLesson(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [router.query.id]);

  return (
    <main className={styles.page_content}>
      <InvitationsComponent lesson={lesson} />
    </main>
  );
};

export async function getServerSideProps(context: any) {
  const { locale } = context;
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

export default InvitePage;
