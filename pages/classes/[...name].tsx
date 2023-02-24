import PreviewDetailClass from '@/components/class/PreviewDetailClass';
import { useRouter } from 'next/router';
import styles from '../../styles/classes.module.scss';

interface ClassesModel {}

const Classes: React.FC<ClassesModel> = (props) => {
  const router = useRouter();
  const nameCategory = router?.query?.name?.[0];

  const {} = props;
  return (
    <>
      <main className={styles.page_content}>
        <section>
          <PreviewDetailClass />
        </section>
        <section className={styles.container}></section>
      </main>
    </>
  );
};

// export async function getStaticProps() {
//   try {
//     const res: any = await ;
//     return {
//       props: {
//         listBanners: res?.data?.images || [],
//       },
//       revalidate: 10,
//     };
//   } catch (error) {
//     console.error(error);
//   }
//   return {
//     props: {},
//   };
// }

export default Classes;
