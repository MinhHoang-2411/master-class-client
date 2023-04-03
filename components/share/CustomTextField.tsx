import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const CustomeTextField = styled(TextField)(({ theme }) => ({
  color: 'white',
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#fff',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#fff',
    },
    '&:hover fieldset': {
      borderColor: '#fff',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#fff',
    },
  },
}));

export default CustomeTextField;
