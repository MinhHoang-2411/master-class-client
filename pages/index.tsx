import Layout from '@/components/layouts';
import ProductHero from '@/components/share/ProductHero';
import bannerApi from '@/services/api/home-page';

interface HomePageModel {
  listBanners: string[];
}

function HomePage(props: HomePageModel) {
  const { listBanners } = props;

  return (
    <>
      <ProductHero listBanners={listBanners} />
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
