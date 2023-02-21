import Layout from '@/components/layouts';
import ProductHero from '@/components/share/ProductHero';
import Trailer from '@/components/share/Trailer';
import bannerApi from '@/services/api/home-page';

interface HomePageModel {
  listBanners: string[];
}

function HomePage(props: HomePageModel) {
  const { listBanners } = props;

  return (
    <>
      <ProductHero listBanners={listBanners} />
      <Trailer />
    </>
  );
}

export async function getStaticProps() {
  try {
    const res: any = await bannerApi.getAll();
    return {
      props: {
        listBanners: res?.data?.images || [],
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
