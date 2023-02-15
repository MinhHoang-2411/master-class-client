import { authActions } from '@/store/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';
import styles from '../../styles/dropdown.module.scss';

interface MenuModel {
  setShowMenu: (show: boolean) => void;
}

const ModalMenu: React.FC<MenuModel> = (props) => {
  const dispatch = useAppDispatch();
  const { setShowMenu } = props;
  return (
    <>
      <div className={styles.dropdown}>
        <h1 id="mobile-dropdown" className={styles.sr_only}>
          Dropdown menu
        </h1>
        <div
          className={`${styles.mc_backdrop} ${styles.backdrop_dark} ${styles.dropdown_backdrop}`}
        ></div>

        <div className={`${styles.dropdown} ${styles.content_container}`}>
          <div className={styles.dropdown_close}>
            <button
              type="button"
              className={styles.button_close}
              onClick={() => setShowMenu(false)}
            >
              <span className={styles.sr_only}>Close</span>
              <svg
                className={styles.close_icon}
                width={24}
                height={25}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="img"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.418 2.918a1.429 1.429 0 0 1 2.02 0L12 10.48l7.561-7.562a1.429 1.429 0 0 1 2.02 2.02l-7.56 7.562 7.56 7.561a1.429 1.429 0 1 1-2.02 2.02L12 14.522l-7.561 7.56a1.429 1.429 0 1 1-2.02-2.02l7.56-7.561-7.56-7.561a1.429 1.429 0 0 1 0-2.02Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>

          <div style={{ padding: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <label htmlFor="search-bar" className={styles.sr_only}>
                  Search Instructors, Classes, Topics...
                </label>
                <div className={styles.form_element}>
                  <div className={styles.form_prepend}>
                    <svg
                      width={24}
                      height={25}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      role="img"
                      className="mc-icon mc-icon--md "
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.518 4.722a6.296 6.296 0 1 0 0 12.593 6.296 6.296 0 0 0 0-12.593ZM2 11.018a8.519 8.519 0 1 1 17.037 0 8.519 8.519 0 0 1-17.037 0Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.66 16.157a1.111 1.111 0 0 1 1.57 0l4.445 4.445a1.111 1.111 0 0 1-1.571 1.571l-4.445-4.444a1.111 1.111 0 0 1 0-1.572Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <input
                    id="search-bar"
                    type="text"
                    className={styles.element}
                    placeholder="Search Instructors, Classes, Topics..."
                    spellCheck="false"
                    autoCorrect="false"
                    aria-invalid="false"
                  />
                </div>
              </div>
            </div>
          </div>

          <div id="nav-categories-dropdown" className={styles.dropdown_content}>
            <div className={styles.dropdown_body}>
              <button className={styles.dropdown_item} role="option">
                <p className={styles.dropdown_text_menu}>
                  <a className="d-block" href="#">
                    View Plans
                  </a>
                </p>
              </button>
              <button className={styles.dropdown_item} role="option">
                <p className={styles.dropdown_text_menu}>
                  <a className="d-block" href="#">
                    At Work
                  </a>
                </p>
              </button>
              <button className={styles.dropdown_item} role="option">
                <p className={styles.dropdown_text_menu}>
                  <a className="d-block" href="#">
                    Gifts
                  </a>
                </p>
              </button>
              <button className={styles.dropdown_item} role="option">
                <p className={styles.dropdown_text_menu}>
                  <a className="d-block" href="#">
                    Support
                  </a>
                </p>
              </button>
              <button className={styles.dropdown_item} role="option">
                <p className={styles.dropdown_text_menu}>
                  <a className="d-block" href="#">
                    Log in
                  </a>
                </p>
              </button>
            </div>
            <div className={styles.dropdown_footer}>
              <div
                style={{ padding: '12px 16px' }}
                onClick={() => dispatch(authActions.openSignUpModal())}
              >
                <a className={styles.button_menu} href="#">
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalMenu;
