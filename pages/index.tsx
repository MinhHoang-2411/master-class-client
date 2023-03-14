import Layout from '@/components/layouts';
import ProductHero from '@/components/share/ProductHero';
import bannerApi from '@/services/api/home-page';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Trailer = dynamic(() => import('@/components/share/Trailer'), { ssr: false });
const MessagesFromTeam = dynamic(() => import('@/components/share/MessagesFromTeam'), {
  ssr: false,
});
const NewCourse = dynamic(() => import('@/components/homes/NewCourse'), { ssr: false });
const PopularCourse = dynamic(() => import('@/components/homes/PopularCourse'), { ssr: false });
interface HomePageModel {
  listBanners: string[];
  layoutPage: any;
  newCourse: any;
  popularCourse: any;
}

function HomePage(props: HomePageModel) {
  const { listBanners, layoutPage, newCourse, popularCourse } = props;
  const router = useRouter();
  const { t, i18n } = useTranslation(['common'], { bindI18n: 'languageChanged loaded' });

  useEffect(() => {
    i18n.reloadResources(i18n.resolvedLanguage, ['common']);
  }, []);

  return (
    <>
      <ProductHero listBanners={listBanners} />
      <Trailer layoutPage={layoutPage} />
      <MessagesFromTeam layoutPage={layoutPage} />
      <PopularCourse popularCourse={popularCourse} />
      <NewCourse newCourse={newCourse} />
    </>
  );
}
export async function getServerSideProps({ locale }: any) {
  try {
    const res: any = await bannerApi.getAll();
    const layout: any = await bannerApi.getHomeLayout();
    const newCourse: any = await bannerApi.getHomeNewCourse();
    const popularCourse: any = await bannerApi.getHomePopularCourse();
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        listBanners: res?.data?.images || [],
        layoutPage: layout?.data,
        newCourse: newCourse?.data,
        popularCourse: popularCourse?.data,
      },
      // revalidate: 10,
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

HomePage.Layout = Layout;
export default HomePage;
