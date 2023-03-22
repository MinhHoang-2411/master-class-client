import cardAmex from '@/public/images/card-amex.svg';
import cardDiscover from '@/public/images/card-discover.svg';
import cardMastercard from '@/public/images/card-mastercard.svg';
import cardVisa from '@/public/images/card-visa.svg';
import cardDiners from '@/public/images/card-diners.png';
import cardJcb from '@/public/images/card-jcb.png';
import cardUnionPay from '@/public/images/card-unionpay.png';

export const paymentMethod = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  amex: 'AMEX',
  discover: 'Discover',
  diners: 'Diners Club',
  jcb: 'JCB',
  unionpay: 'UnionPay',
};

export const cardImagePayment = {
  visa: cardVisa,
  mastercard: cardMastercard,
  amex: cardAmex,
  discover: cardDiscover,
  diners: cardDiners,
  jcb: cardJcb,
  unionpay: cardUnionPay,
};
