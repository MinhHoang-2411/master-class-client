import { Button, SxProps, Theme } from '@mui/material';
import React from 'react';

const styleBtnSignUp = {
  backgroundColor: '#e32652',
  padding: '8px 16px',
  cursor: 'pointer',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: 'bold',
  textTransform: 'capitalize',
  '&:hover': {
    backgroundColor: '#d61a46',
  },
  color: '#fff',
};

const PrimaryButton = ({
  children,
  onClick,
  style,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  style?: any;
}) => {
  return (
    <Button
      disableElevation
      disableRipple
      disableFocusRipple
      sx={{ ...styleBtnSignUp, ...style }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
