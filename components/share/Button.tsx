import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import MuiButton, { ButtonProps } from '@mui/material/Button';

const ButtonRoot = styled(MuiButton)(({ theme, size }) => ({
  borderRadius: 3,
  fontWeight: theme.typography.fontWeightBold,
  fontFamily: theme.typography.h1.fontFamily,
  padding: theme.spacing(2, 4),
  fontSize: theme.typography.pxToRem(14),
  textTransform: 'capitalize',
  boxShadow: 'none',
  '&:active, &:focus': {
    boxShadow: 'none',
  },
  ...(size === 'small' && {
    padding: theme.spacing(1, 1),
    fontSize: theme.typography.pxToRem(14),
  }),
  ...(size === 'large' && {
    padding: theme.spacing(2, 5),
    fontSize: theme.typography.pxToRem(16),
    borderRadius: 8,
  }),
}));

// See https://mui.com/guides/typescript/#usage-of-component-prop for why the types uses `C`.
function Button<C extends React.ElementType>(props: ButtonProps<C, { component?: C }>) {
  return <ButtonRoot {...props} />;
}

export default Button;
