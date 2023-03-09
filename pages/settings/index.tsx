import Layout from '@/components/layouts';
import SettingComponent from '@/components/settings';
import styles from '../../styles/categories.module.scss';

interface SettingsModel {
  locale: any;
}

const SettingPage = (props: SettingsModel) => {

  return (
    <>
      <main className={styles.page_content}>
        <section className={`${styles.container} ${styles['pt-3']} ${styles['pb-6']} `}>
          <h1 className={`${styles.text_h1}`}>Settings</h1>
          <div
            className={`${styles.row} ${styles.Courses_CoursesSectionContent} ${styles.mc_mx_0}`}
          >
            <SettingComponent />
          </div>
        </section>
      </main>
    </>
  );
};

export async function getStaticProps({ locale }: any) {
  try {
    return {
      props: {},
    };
  } catch (error) {
    console.error(error);
  }
  return {
    props: {},
  };
}

SettingPage.Layout = Layout;
export default SettingPage;
