import PreviewDetailClass from '@/components/class/PreviewDetailClass';
import classAPI from '@/services/api/class';
import styles from '../../styles/classes.module.scss';

interface Props {
  classes: any;
  categories: any;
}

const Classes = ({ classes, categories }: Props) => {
  return (
    <>
      <main className={styles.page_content}>
        <section>
          <PreviewDetailClass classes={classes} categories={categories} />
        </section>
        <section className={styles.container}></section>
      </main>
    </>
  );
};

Classes.getInitialProps = async (ctx: any) => {
  const { id } = ctx?.query;

  const payload = {
    webName: id,
  };

  const payloadCategory = {
    page: 1,
    limit: 100,
  };

  try {
    const response: any = await classAPI.getDetailByWebName(payload);
    const categories: any = await classAPI.getListCategory(payloadCategory);

    return {
      classes: response.data,
      categories: categories.data,
    };
  } catch (error) {
    console.error(error);
  }
};

export default Classes;
