import Layout from '@/components/layouts';
import ProductHero from '@/components/share/ProductHero';
import bannerApi from '@/services/api/home-page';
import dynamic from 'next/dynamic';

interface HomePageModel {
  listBanners: string[];
  layoutPage: any;
}

const Trailer = dynamic(() => import('@/components/share/Trailer'), { ssr: false });
const MessagesFromTeam = dynamic(() => import('@/components/share/MessagesFromTeam'), { ssr: false });
function HomePage(props: HomePageModel) {
  const { listBanners, layoutPage } = props;
  return (
    <>
      <ProductHero listBanners={listBanners} />
      <Trailer layoutPage={layoutPage} />
      <MessagesFromTeam layoutPage={layoutPage}/>
    </>
  );
}

export async function getStaticProps() {
  try {
    const res: any = await bannerApi.getAll();
    const layout: any = await bannerApi.getHomeLayout();
    return {
      props: {
        listBanners: res?.data?.images || [],
        layoutPage: layout?.data,
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
