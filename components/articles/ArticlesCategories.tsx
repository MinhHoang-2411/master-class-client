import React from 'react';
import styles from '../../styles/articles.module.scss';
import Slider from 'react-slick';
import { Box, Container } from '@mui/material';
import Typography from '../share/Typography';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

interface Category {
  _id: string;
  isActive: boolean;
  name: string;
  priority: number;
  createdAt?: string;
  updatedAt?: string;
}

interface IProps {
  categories: Category[];
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

const ArticlesCategories = ({ categories }: IProps) => {
  const settings = {
    dots: false,
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
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 3,
    autoplay: false,
    initialSlide: 0,
    variableWidth: true,
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

  return (
    <Box
      sx={{
        color: '#fff',
        backgroundColor: '#000',
        borderTop: '1px solid rgb(48,49,54)',
        padding: '16px 0',
      }}
    >
      <Container>
        <Box>
          <Slider {...settings}>
            {categories?.map((category: Category) => (
              <CategoryItem key={category._id} name={category.name} />
            ))}
          </Slider>
        </Box>
      </Container>
    </Box>
  );
};

export default ArticlesCategories;

const CategoryItem = ({ name }: any) => {
  return (
    <Box sx={{ m: '0px 6px' }} className={styles.categories}>
      <Typography
        sx={{
          color: '#fff',
          border: '1px solid #fff',
          textAlign: 'justify',
          width: '100%',
          padding: '4px 16px',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        {name}
      </Typography>
    </Box>
  );
};
