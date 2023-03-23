import ChaptersPageComponent from '@/components/class/ChaptersPage';
import classAPI from '@/services/api/class';
import { useAppSelector } from '@/store/hooks';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  categories: any;
}

const ChaptersPage = ({ categories }: Props) => {
  const router = useRouter();
  const indexSelectedLesson = useAppSelector((state) => state.class.indexSelectedLesson);
  const [idxSelectedLesson, setIdxSelectLesson] = useState(indexSelectedLesson);
  const [selectedLesson, setSelectedLesson] = useState([]);
  const [classes, setClasses] = useState<any>([]);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const fetchData = async () => {
    try {
      let response: any;
      const payload = {
        webName: router.query.id,
      };
      if (isLoggedIn) {
        response = await classAPI.getDetailByWebName(payload);
      } else {
        response = await classAPI.getDetailByWebNameV1(payload);
      }
      if (response?.data) {
        setClasses(response?.data);
        setSelectedLesson(response?.data?.lessons?.[idxSelectedLesson]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeLesson = (index: number) => {
    setSelectedLesson(classes?.lessons?.[index]);
    setIdxSelectLesson(index);
  };

  useEffect(() => {
    fetchData();
  }, [router.query.id]);

  return (
    <ChaptersPageComponent
      selectedLesson={selectedLesson}
      classes={classes}
      categories={categories}
      idxSelectedLesson={idxSelectedLesson}
      onChangeLesson={onChangeLesson}
    />
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

export default ChaptersPage;
