import { ErrorMessage } from '@/components/share/ErrorMessage';
import { displayCenter } from '@/declares/modal';
import { Box, FormControl, Grid } from '@mui/material';
import { useEffect } from 'react';
import ReactCodeInput from 'react-code-input';
import style from './style.module.scss';

interface Iprops {
  onChange: any;
  setFieldValue: any;
  codeOTP: any;
}

const InputCodeComponent = ({ onChange, setFieldValue, codeOTP }: Iprops) => {
  useEffect(() => {
    setFieldValue('arrayCode', codeOTP);
  }, [codeOTP]);
  return (
    <Grid item xs={12}>
      <FormControl sx={{ mb: 1, mt: 1 }} fullWidth>
        <Box sx={displayCenter}>
          <ReactCodeInput
            type="number"
            className={style.reactCodeInput}
            fields={6}
            onChange={onChange}
            name="arrayCode"
            inputMode="numeric"
            inputStyle={{
              border: '1px solid',
              boxShadow: '0px 0px 10px 0px rgba(0,0,0,.10)',
              margin: '0 6px',
              paddingLeft: '11px',
              width: '42px',
              height: '42px',
              fontSize: '32px',
              boxSizing: 'border-box',
              color: '#262626',
              backgroundColor: '#fff',
              borderColor: 'lightgrey',
              borderRadius: '4px',
            }}
          />
        </Box>
      </FormControl>
      <Box sx={{ ml: 1 }}>
        <ErrorMessage name={`arrayCode`} />
      </Box>
    </Grid>
  );
};

export default InputCodeComponent;
