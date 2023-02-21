import { useCallback, useState } from 'react';
import ProductHeroLayout from '../../contents/home/ProductHeroLayout';
import styles from '../../styles/carousel.module.scss';

interface ProductHeroModel {
  listBanners: string[];
}

const handleConvertListBanners = (listBanners: string[]) => {
  const arrBanners = [];
  const isEven = listBanners?.length % 2 == 0;
  for (let i = 0; i < listBanners?.length; i++) {
    const objBanners = {
      itemFirst: listBanners[i],
      itemLast: listBanners[i + 1] || listBanners[0],
    };
    arrBanners.push(objBanners);
    i = i + 1;

    if (isEven && i === listBanners?.length - 1) {
      i = 0;
    } else if (!isEven && i === listBanners?.length) {
      i = 0;
    }
  }

  return arrBanners;
};

const ProductHero: React.FC<ProductHeroModel> = ({ listBanners }) => {
  const [playVideo, setPlayVideo] = useState(true);
  const listBannersConvert = handleConvertListBanners(listBanners);

  const renderList = useCallback(
    () =>
      listBannersConvert?.map((item, index) => (
        <div key={index} className={styles.loopItem}>
          <div className={styles.FirstRow}>
            <span
              className={styles.SpanImg}
              style={{
                boxSizing: 'border-box',
                display: 'inline-block',
                overflow: 'hidden',
                background: 'none',
                opacity: 1,
                border: 0,
                margin: 0,
                padding: 0,
                position: 'relative',
                maxWidth: '100%',
                width: '100%',
                height: '202px',
              }}
            >
              <span
                style={{
                  boxSizing: 'border-box',
                  display: 'block',
                  width: 'initial',
                  height: 'initial',
                  background: 'none',
                  opacity: 1,
                  border: 0,
                  margin: 0,
                  padding: 0,
                  maxWidth: '100%',
                }}
              >
                <img
                  style={{
                    display: 'block',
                    maxWidth: '100%',
                    width: 'initial',
                    height: 'initial',
                    background: 'none',
                    opacity: 1,
                    border: 0,
                    margin: 0,
                    padding: 0,
                  }}
                  width={1200}
                  alt=""
                  aria-hidden="true"
                  src={item?.itemFirst}
                />
              </span>
              <img
                alt=""
                src={item?.itemFirst}
                decoding="async"
                data-nimg="intrinsic"
                className={styles.Image}
                width={1200}
                style={{
                  position: 'absolute',
                  inset: '0px',
                  boxSizing: 'border-box',
                  padding: '0px',
                  border: 'none',
                  margin: 'auto',
                  display: 'block',
                  width: '0px',
                  height: '0px',
                  minWidth: '100%',
                  maxWidth: '100%',
                  minHeight: '100%',
                  maxHeight: '100%',
                }}
              />
            </span>
          </div>
          <div className={styles.SecondRow}>
            <span
              className={styles.SpanImg}
              style={{
                boxSizing: 'border-box',
                display: 'inline-block',
                overflow: 'hidden',
                background: 'none',
                opacity: 1,
                border: 0,
                margin: 0,
                padding: 0,
                position: 'relative',
                maxWidth: '100%',
                width: '100%',
                height: '202px',
              }}
            >
              <span
                style={{
                  boxSizing: 'border-box',
                  display: 'block',
                  width: 'initial',
                  height: 'initial',
                  background: 'none',
                  opacity: 1,
                  border: 0,
                  margin: 0,
                  padding: 0,
                  maxWidth: '100%',
                }}
              >
                <img
                  className={styles.Image}
                  style={{
                    display: 'block',
                    maxWidth: '100%',
                    width: 'initial',
                    height: 'initial',
                    background: 'none',
                    opacity: 1,
                    border: 0,
                    margin: 0,
                    padding: 0,
                  }}
                  width={1200}
                  alt=""
                  aria-hidden="true"
                  src={item?.itemLast}
                />
              </span>
              <img
                alt=""
                src={item?.itemLast}
                decoding="async"
                data-nimg="intrinsic"
                className={styles.Image}
                width={1200}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  boxSizing: 'border-box',
                  padding: 0,
                  border: 'none',
                  margin: 'auto',
                  display: 'block',
                  width: 0,
                  height: 0,
                  minWidth: '100%',
                  maxWidth: '100%',
                  minHeight: '100%',
                  maxHeight: '100%',
                }}
              />
            </span>
          </div>
        </div>
      )),
    [listBannersConvert]
  );

  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundPosition: 'center',
        backgroundColor: '#000',
      }}
    >
      <div className="fresnel-container fresnel-greaterThanOrEqual-xl ">
        <div className={styles.overFlowHidden}>
          <div
            id="hero-carousel"
            className={styles.imageLoopContent}
            style={{ animationPlayState: playVideo ? 'running' : 'paused' }}
          >
            {Array.isArray(listBannersConvert) && renderList()}
          </div>

          {/* BUTTON */}
          <button
            type="button"
            aria-label="Pause carousel"
            className={styles.playPauseButton}
            onClick={() => setPlayVideo((preState) => !preState)}
          >
            {playVideo ? (
              <svg
                width={24}
                height={25}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="img"
                className={styles.playPauseIcon}
              >
                <path d="M5.143 21.25V3.75h2.285v17.5H5.143Z" fill="currentColor" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 3.75c0-.69.512-1.25 1.143-1.25h2.286c.63 0 1.142.56 1.142 1.25v17.5c0 .69-.511 1.25-1.142 1.25H5.143C4.512 22.5 4 21.94 4 21.25V3.75Z"
                  fill="currentColor"
                />
                <path d="M16.571 21.25V3.75h2.286v17.5h-2.286Z" fill="currentColor" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.429 3.75c0-.69.511-1.25 1.143-1.25h2.285c.631 0 1.143.56 1.143 1.25v17.5c0 .69-.512 1.25-1.143 1.25h-2.285c-.632 0-1.143-.56-1.143-1.25V3.75Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg
                width={24}
                height={25}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="img"
                className={styles.playPauseIcon}
              >
                <path
                  d="M7.791 2.695a1.25 1.25 0 0 0-1.92 1.055v17.5a1.25 1.25 0 0 0 1.92 1.055l13.75-8.75a1.25 1.25 0 0 0 0-2.11l-13.75-8.75Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </ProductHeroLayout>
  );
};
export default ProductHero;
