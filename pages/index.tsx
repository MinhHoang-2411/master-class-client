import Layout from '@/components/layouts';
import ProductHero from '@/components/share/ProductHero';
import bannerApi from '@/services/api/home-page';
import dynamic from 'next/dynamic';

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

export async function getStaticProps() {
  try {
    const res: any = await bannerApi.getAll();
    const layout: any = await bannerApi.getHomeLayout();
    const newCourse: any = await bannerApi.getHomeNewCourse();
    const popularCourse: any = await bannerApi.getHomePopularCourse();
    return {
      props: {
        listBanners: res?.data?.images || [],
        layoutPage: layout?.data,
        newCourse: newCourse?.data,
        popularCourse: popularCourse?.data,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error(error);
  }
  return {
    props: {},
  };
}

HomePage.Layout = Layout;
export default HomePage;
