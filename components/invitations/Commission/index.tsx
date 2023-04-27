import Typography from '@/components/share/Typography';
import { Box } from '@mui/material';

const Commission = () => {
  return (
    <Box sx={{ mt: 5 }}>
      <Box sx={{ background: '#232627', p: 5, borderRadius: '16px' }}>
        <Typography component={'h2'} variant={'h6'} sx={{ color: '#fff', fontSize: '18px' }}>
          My commission
        </Typography>
      </Box>
    </Box>
  );
};

export default Commission;
