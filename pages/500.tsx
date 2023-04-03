import PrimaryButton from '@/components/share/PrimaryButton';
import { Stack } from '@mui/system';
import Router from 'next/router';

export default function Custom500() {
  return (
    <Stack
      sx={{
        width: '100%',
        height: '100vh',
        // positon: 'fixed !important',
        // top: '50%',
        // transform: 'translateY(-50%)',
      }}
      justifyContent="center"
      alignItems="center"
    >
      <h1 style={{ color: 'white' }}>500 - Server-side error occurred</h1>
      <PrimaryButton
        onClick={() => {
          Router.push('/');
        }}
      >
        Home
      </PrimaryButton>
    </Stack>
  );
}
