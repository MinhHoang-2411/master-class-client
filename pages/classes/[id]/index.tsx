import classAPI from '@/services/api/class';
import { useAppSelector } from '@/store/hooks';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../../styles/classes.module.scss';

interface Props {
  classes: any;
  categories: any;
}

const PreviewDetailClass = dynamic(() => import('@/components/class/PreviewDetailClass'), {
  ssr: false,
});

const Classes = ({ classes, categories }: Props) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const isPayment = useAppSelector((state) => state.payment.isPayment);
  const [lesson, setLesson] = useState(classes);
  const [isFavourite, setIsFavourite] = useState<any>(null);
  const router = useRouter();
  const fetchData = async () => {
    try {
      let response: any;
      const payload = {
        webName: router.query.id,
      };
      response = await classAPI.getDetailByWebNameV1(payload);
      if (response?.data) {
        setLesson(response?.data);
        setIsFavourite(response?.data?.isFavourite);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [router.query.id]);

  return (
    <>
      <main className={styles.page_content}>
        <section>
          <PreviewDetailClass
            classes={lesson}
            isFavourite={isFavourite}
            setIsFavourite={setIsFavourite}
            categories={categories}
            isPayment={isPayment}
          />
        </section>
        <section className={styles.container}></section>
      </main>
    </>
  );
};

export async function getServerSideProps({ locale }: any) {
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

export default Classes;
