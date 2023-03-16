import { CategoryModel } from '@/declares/models/Categories';
import useGetAllList from '@/hooks/useGetAllList';
import { authActions } from '@/store/auth/authSlice';
import { classActions } from '@/store/class/classSlice';
import { useAppDispatch } from '@/store/hooks';
import { cleanText } from '@/utils/convert/string';
import _, { isArray } from 'lodash';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'next-i18next';
import styles from '../../styles/dropdown.module.scss';

interface SearchModel {
  setShowSearch: (show: boolean) => void;
  listCategories?: Array<CategoryModel>;
  showMenu?: boolean;
}

interface ParamsModel {
  page: number;
  limit: number;
  search: null | string;
  categories: null | string;
  name_category?: string;
}

const ModalSearch: React.FC<SearchModel> = (props) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('common');
  const { setShowSearch, listCategories, showMenu } = props;
  const [search, setSearch] = useState('');
  const [params, setParams] = useState<ParamsModel>({
    page: 1,
    limit: 100,
    search: null,
    categories: null,
    name_category: '',
  });
  const { listData: listClass, loading } = useGetAllList(classActions, 'class', params);

  const debounceSearch = useCallback(
    _.debounce(
      (value) =>
        setParams((prevState) => {
          const newState = { ...prevState };
          if (value && value.trim() !== '') {
            newState.search = value;
            newState.categories = null;
          } else newState.search = null;
          return { ...newState, page: 1 };
        }),
      500
    ),
    []
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    debounceSearch(value);
  };

  const handleSelectCategory = (id: string, name: string) => {
    if (id) {
      setParams((prevState) => ({
        ...prevState,
        categories: id,
        search: null,
        name_category: name,
      }));
    }
  };
  const handleRemoveCategory = () => {
    setParams((prevState) => ({ ...prevState, categories: null, name_category: undefined }));
  };

  const handleCancelSearch = () => {
    setParams((prevState) => ({ ...prevState, search: null }));
    setSearch('');
  };

  const renderListCategory = useCallback(() => {
    return listCategories?.map((item, index) => {
      return (
        <button
          key={index}
          className={styles.dropdown_item}
          role="option"
          onClick={() => handleSelectCategory(item?._id, item?.name)}
        >
          <p className={styles.dropdown_text_search}>
            <span className="d-block">{item?.name}</span>
            <svg
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className={`${styles['mc-icon']} ${styles['mc-icon--2']}`}
              role="img"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.845 5.47a.75.75 0 011.06 0l6 6a.75.75 0 010 1.06l-6 6a.75.75 0 01-1.06-1.06l5.47-5.47-5.47-5.47a.75.75 0 010-1.06z"
                fill="currentColor"
              />
            </svg>
          </p>
        </button>
      );
    });
  }, [listCategories]);

  const renderListClass = useCallback(() => {
    return listClass.map((item: any, index: number) => {
      return (
        <button key={index} className={styles.dropdown_item} role="option">
          <Link
            data-role="search-hit"
            href={`/classes/${item?.webName || '#'}`}
            onClick={() => setShowSearch(false)}
            className={`${styles.Instructor_wrapper} ${styles['d-flex']} ${styles['mc-p-4']}`}
          >
            <img
              src={item?.thumbnail}
              className={`${styles.Instructor_image} ${styles['mc-corners--rounded']}`}
            />
            <div
              className={`${styles.Instructor_textWrapper} ${styles['d-flex']} ${styles['mc-pl-4']}`}
            >
              <span className={styles['mc-text-h6']}>
                <span className={styles['ais-Highlight']}>
                  <Highlighter
                    sanitize={(text: string) => cleanText(text)}
                    highlightClassName={styles.high_light}
                    searchWords={[params?.search as string]}
                    autoEscape={true}
                    textToHighlight={item?.authorName || ''}
                    highlightTag="span"
                  />
                </span>
              </span>
              <span className={`${styles.Instructor_headline} ${styles['mc-text-small']}`}>
                <span className={styles['ais-Highlight']}>
                  <Highlighter
                    sanitize={(text: string) => cleanText(text)}
                    highlightClassName={styles.high_light}
                    searchWords={[params?.search as string]}
                    autoEscape={true}
                    textToHighlight={item?.name || ''}
                    highlightTag="span"
                  />
                </span>
              </span>
            </div>
          </Link>
        </button>
      );
    });
  }, [listClass]);

  return (
    <>
      <div className={styles.dropdown_search}>
        <h1 id="mobile-dropdown" className={styles.sr_only}>
          Dropdown search
        </h1>
        <div
          className={`${styles.mc_backdrop} ${styles.backdrop_dark} ${styles.dropdown_backdrop}`}
        ></div>

        <div className={`${styles.dropdown} ${styles.content_container}`}>
          <div className={styles.dropdown_close}>
            <button
              type="button"
              className={styles.button_close}
              onClick={() => setShowSearch(false)}
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
          <div className={`${styles['mc-dropdown__header']} ${styles['mc-p-4']}`}>
            <div>
              {params?.categories ? (
                <div
                  className={`${styles['d-flex']} ${styles['justify-content-between']} ${styles['align-items-center']} ${styles['mc-w-100']}`}
                >
                  <p className={styles['mc-opacity--hinted']}>{params?.name_category}</p>
                  <span className={styles['mc-sr-only']}>Clear search input</span>
                  <svg
                    width={24}
                    height={25}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    role="img"
                    className={`${styles['mc-icon']} ${styles['mc-icon--sm']} ${styles['mc-opacity--muted']} ${styles['mc-clickable']}`}
                    data-testid="clear search"
                    onClick={() => handleRemoveCategory()}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.418 2.918a1.429 1.429 0 0 1 2.02 0L12 10.48l7.561-7.562a1.429 1.429 0 0 1 2.02 2.02l-7.56 7.562 7.56 7.561a1.429 1.429 0 1 1-2.02 2.02L12 14.522l-7.561 7.56a1.429 1.429 0 1 1-2.02-2.02l7.56-7.561-7.56-7.561a1.429 1.429 0 0 1 0-2.02Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              ) : (
                <div
                  className={`${styles['d-flex']} ${styles['align-items-center']} ${styles['mc-w-100']}`}
                >
                  <label htmlFor="search-bar" className={styles['mc-sr-only']}>
                    {t('search-instructors-classes-topics-and-more')}
                  </label>
                  <div
                    className={`${styles['mc-form-input']} ${styles['mc-form-element']} ${styles['mc-form-element--default']} ${styles['mc-text-medium']}`}
                  >
                    <div className={styles['mc-form-prepend']}>
                      <svg
                        width={24}
                        height={25}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        role="img"
                        className={`${styles['mc-icon']} ${styles['mc-icon--md']} `}
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
                      className={`${styles['mc-form-element__element']}`}
                      placeholder={`${t('search-instructors-classes-topics-and-more')}`}
                      spellCheck="false"
                      autoCorrect="false"
                      aria-invalid="false"
                      value={search}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                    {search && search !== '' && (
                      <div className={styles['mc-form-append']}>
                        <svg
                          width={24}
                          height={25}
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          role="img"
                          className={`${styles['mc-icon']} ${styles['mc-icon--md']} ${styles['SearchBar_close']} ${styles['mc-clickable']}`}
                          data-testid="clear search"
                          onClick={() => handleCancelSearch()}
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2.418 2.918a1.429 1.429 0 0 1 2.02 0L12 10.48l7.561-7.562a1.429 1.429 0 0 1 2.02 2.02l-7.56 7.562 7.56 7.561a1.429 1.429 0 1 1-2.02 2.02L12 14.522l-7.561 7.56a1.429 1.429 0 1 1-2.02-2.02l7.56-7.561-7.56-7.561a1.429 1.429 0 0 1 0-2.02Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div id="nav-search-dropdown" className={styles.dropdown_content}>
            <div className={styles.dropdown_body}>
              {(params?.search !== null && params?.search !== '') || params?.categories !== null ? (
                Array(isArray(listClass)) && listClass?.length > 0 ? (
                  renderListClass()
                ) : (
                  <div
                    className={`${styles['Results_wrapper']} ${styles['Results_showHighlight']}`}
                  >
                    <div className={`${styles['mc-p-1']} ${styles['mc-text--center']}`}>
                      {`${t('no-results-found-for')} "${params?.name_category ? params?.name_category : params?.search}"`}
                    </div>
                  </div>
                )
              ) : (
                Array(isArray(listCategories) && renderListCategory())
              )}
              {showMenu && (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalSearch;
