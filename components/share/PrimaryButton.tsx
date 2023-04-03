import { Button, SxProps, Theme } from '@mui/material';
import React from 'react';

const styleBtnSignUp = {
  padding: '8px 16px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  textTransform: 'capitalize',
  '&:disabled': {
    color: '#fff',
    backgroundColor: '#a0a0a0',
  },
  color: '#262626',
  background: 'linear-gradient(94.87deg, #FFB7E4 20.12%, #34DBEB 87.72%)',
  borderRadius: '100px',
  mt: 1,
  transition: 'all .4s ease-in-out',
  '&:hover': {
    boxShadow: '0 4px 15px 0 rgba(236, 116, 149, 0.75)',
  },
};

const PrimaryButton = ({
  children,
  onClick,
  style,
  type,
  disabled,
  fullWidth,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  style?: any;
  type?: any;
  disabled?: any;
  fullWidth?: any;
}) => {
  return (
    <Button
      disableElevation
      disableRipple
      disableFocusRipple
      type={type}
      disabled={disabled}
      sx={{ ...styleBtnSignUp, ...style }}
      onClick={onClick}
      fullWidth={fullWidth}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
