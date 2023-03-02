import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import ReactPlayer from 'react-player';

import Video from '../trailer/video';

const styleBigVideo = {
  objectFit: 'contain',
};

interface MessagesFromTeamModel {
  listBanners?: string[];
  layoutPage?: any;
}

const MessagesFromTeam: React.FC<MessagesFromTeamModel> = ({ layoutPage }) => {
  const { messagesTeam } = layoutPage;
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
          <ReactPlayer
            light={messagesTeam[0]?.thumbnail}
            url={messagesTeam[0]?.url}
            controls={true}
            width="100%"
          />
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
          <ReactPlayer
            light={messagesTeam[1]?.thumbnail}
            url={messagesTeam[1]?.url}
            controls={true}
            width="100%"
          />
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
        <Grid item xs={7} sm={7} md={7} sx={{ padding: '20px !important' }}>
          <ReactPlayer
            light={messagesTeam[2]?.thumbnail}
            url={messagesTeam[2]?.url}
            controls={true}
            width="100%"
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default MessagesFromTeam;
