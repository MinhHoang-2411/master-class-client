import InvitationsComponent from '@/components/invitations';
import Layout from '@/components/layouts';
import styles from '../../styles/invitations.module.scss';

interface ArticlesPageModel {
  categories: any;
}

const InvitationsPage = ({ categories }: ArticlesPageModel) => {
  return (
    <>
      <main className={styles.page_content}>
        <InvitationsComponent />
      </main>
    </>
  );
};

InvitationsPage.Layout = Layout;
export default InvitationsPage;
