import React from 'react';
import Image from 'next/image';

interface ICardImageProps {
  src: string;
  alt: string;
}

const styledCard = {
  maxWidth: '42px',
  height: '28px',
  border: '1px solid #d1d7dc',
  borderRadius: '4px',
  background: '#fff',
  margin: '0 2px 0 0',
};

const CardImage = ({ src, alt }: ICardImageProps) => {
  return <Image style={styledCard} src={src} alt={alt} width={300} height={112} />;
};

export default CardImage;
