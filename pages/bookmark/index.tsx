import BookmarkComponent from '@/components/bookmark';
import Layout from '@/components/layouts';
import bannerApi from '@/services/api/home-page';
import styles from '../../styles/categories.module.scss';

interface BookmarkPageModel {
  courses: any;
}

const BookmarkPage = ({ courses }: BookmarkPageModel) => {
  return (
    <>
      <main className={styles.page_content}>
        <section className={styles.container}>
          <h1 className={styles.text_h1}>Bookmark</h1>

          <div
            className={`${styles.row} ${styles.Courses_CoursesSectionContent} ${styles.mc_mx_0}`}
          >
            <BookmarkComponent courses={courses} />
          </div>
        </section>
      </main>
    </>
  );
};

BookmarkPage.getInitialProps = async (ctx: any) => {
  let _courses: any = [];
  try {
    const responese: any = await bannerApi.getHomePopularCourse();
    if (responese) {
      _courses = responese?.data;
    }
  } catch (error) {
    console.error(error);
  }
  return {
    courses: _courses,
  };
};

BookmarkPage.Layout = Layout;
export default BookmarkPage;
