import { Box } from '@mui/material';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styles from './../../styles/slick-carousel.module.scss';

interface Props {
  courses: any;
}

function SampleNextArrow(props: any) {
  const { className, onClick } = props;

  return (
    <div
      className={`${className} ${styles['slick-next']}  ${
        className.includes('slick-disabled') ? styles['slick-disabled'] : ''
      }`}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: any) {
  const { className, onClick } = props;

  return (
    <div
      className={`${className} ${styles['slick-prev']}  ${
        className.includes('slick-disabled') ? styles['slick-disabled'] : ''
      }`}
      onClick={onClick}
    />
  );
}

const SlickCarousel = ({ courses }: Props) => {
  const settings = {
    dots: true,
    dotsClass: styles.slick_thumb,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: (dots: any) => (
      <ul>
        {dots.map((item: any, index: number) => {
          return (
            <li
              key={index}
              className={item.props.className === 'slick-active' ? styles.slick_active : ''}
            >
              {item.props.children}
            </li>
          );
        })}
      </ul>
    ),
    customPaging: function () {
      return (
        <div className={`${styles.custom_dots}`}>
          <span className={styles.custom_dots_item}></span>
        </div>
      );
    },
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const TimeConvert = (lessons: any) => {
    const totalTime = lessons?.reduce(
      (accumulator: any, currentValue: any) => accumulator + currentValue?.duration,
      0
    );
    const duration = Math.floor(totalTime);
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration - hours * 3600) / 60);
    const remainingSeconds = duration - hours * 3600 - minutes * 60;
    return `${hours > 0 ? `${hours.toString().padStart(2, '0')} hours ` : ''}${
      minutes > 0 ? `${minutes.toString().padStart(2, '0')} minutes ` : ''
    }${remainingSeconds > 0 ? `${remainingSeconds.toString().padStart(2, '0')} seconds` : ''}`;
  };
  return (
    <>
      <Slider {...settings}>
        {courses?.map((course: any) => (
          <div className={styles.card} key={course?._id}>
            <Link className={styles['button-view']} href={`/classes/${course?.webName}` || '#'}>
              <div className={styles.card_top}>
                <img src={course?.thumbnail} alt={course?.name} />
              </div>
              <div className={styles.card_bottom}>
                <h3>{course?.authorName}</h3>
                <div className={styles.lineBreak}></div>
                <div className={styles['nameplate__sub-text']}>
                  <p>{course?.name}</p>
                  <span>{TimeConvert(course?.lessons)}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default SlickCarousel;
