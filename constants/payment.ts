import cardAmex from '@/public/images/card-amex.svg';
import cardDiscover from '@/public/images/card-discover.svg';
import cardMastercard from '@/public/images/card-mastercard.svg';
import cardVisa from '@/public/images/card-visa.svg';
import cardDiners from '@/public/images/card-diners.png';
import cardJcb from '@/public/images/card-jcb.png';
import cardUnionPay from '@/public/images/card-unionpay.png';

export const paymentMethod = {
  Visa: 'Visa',
  MasterCard: 'Mastercard',
  'American Express': 'AMEX',
  Discover: 'Discover',
  'Diners Club': 'Diners Club',
  JCB: 'JCB',
  UnionPay: 'UnionPay',
};

export const cardImagePayment = {
  Visa: cardVisa,
  MasterCard: cardMastercard,
  'American Express': cardAmex,
  Discover: cardDiscover,
  'Diners Club': cardDiners,
  JCB: cardJcb,
  UnionPay: cardUnionPay,
};
