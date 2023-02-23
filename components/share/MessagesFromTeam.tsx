import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';

import Video from '../trailer/video';

const styleDescription = {
  display: 'flexbox',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  width: '100%',
  borderRadius: '8px',
  border: 'none',
  background: '#222326',
  padding: '16px',
};

const styleBtnSignUp = {
  backgroundColor: '#e32652',
  padding: '12px 24px',
  cursor: 'pointer',
  width: '200px',
  height: '45px',
  borderRadius: '8px',
  fontSize: '18px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  margin: 'auto',
  marginTop: '20px',
  '&:hover': {
    backgroundColor: '#d61a46',
  },
};

interface MessagesFromTeamModel {
  listBanners?: string[];
}

const MessagesFromTeam: React.FC<MessagesFromTeamModel> = ({}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#fff',
        maxWidth: {
          xs: '100%',
          sm: '100%',
          md: '100%',
          lg: '100%',
          xl: '1600px',
        },
        margin: 'auto',
      }}
    >
      <Box>
        <h2>Messages from the Team</h2>
      </Box>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ width: '100% !important', color: '#f4f4f5 !important', margin: '0 !important' }}
      >
        <Grid item xs={6} sm={6} md={6} sx={{ padding: '20px !important' }}>
          <Video />
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          sx={{
            padding: '20px !important',
          }}
        >
          <Video />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          width: '100% !important',
          color: '#f4f4f5 !important',
          margin: '0 !important',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Grid item xs={8} sm={8} md={8} sx={{ padding: '20px !important' }}>
          <Video />
        </Grid>
      </Grid>
    </Box>
  );
};
export default MessagesFromTeam;
