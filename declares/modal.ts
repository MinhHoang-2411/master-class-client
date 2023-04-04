import bg from '../public/images/bground.svg';

export const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 570,
  backgroundImage: `url(${bg.src})`,
  backgroundSize: 'contain',
  boxShadow: 24,
  p: 4,
  borderRadius: 8,
  color: '#fff',
  outline: '2px solid #ccc',
  '&:focus': {
    outline: '2px solid #ccc',
    boxShadow: 'none',
  },
};

export const styleModalSetting = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  borderRadius: 8,
};

export const displayCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
