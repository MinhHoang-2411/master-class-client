import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import ReactPlayer from 'react-player';

import Video from '../trailer/video';
import Typography from './Typography';

const styleBigVideo = {
  objectFit: 'contain',
};

interface MessagesFromTeamModel {
  listBanners?: string[];
  layoutPage?: any;
}

const MessagesFromTeam: React.FC<MessagesFromTeamModel> = ({ layoutPage }) => {
  const { t } = useTranslation('common');
  const messagesTeam = layoutPage?.messagesTeam;
  console.log({ messagesTeam });

  const [lightVideoFounder, setLightVideoFounder] = useState(messagesTeam?.[0]?.thumbnail);
  const [playingVideoFounder, setPlayingVideoFounder] = useState(false);

  const [lightVideoCEO, setLightVideoCEO] = useState(messagesTeam?.[1]?.thumbnail);
  const [playingVideoCEO, setPlayingVideoCEO] = useState(false);

  const [lightVideoTrainer, setLightVideoTrainer] = useState(messagesTeam?.[2]?.thumbnail);
  const [playingVideoTrainer, setPlayingVideoTrainer] = useState(false);

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
        margin: '32px auto',
      }}
    >
      <Box>
        <Typography variant="h4" component={'h2'} color="#fff" sx={{ mb: 3, fontSize: '32px' }}>
          {t('messages-from-the-team')}
        </Typography>
      </Box>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ width: '100% !important', color: '#f4f4f5 !important', margin: '0 !important' }}
      >
        <Grid item xs={6} sm={6} md={6} sx={{ padding: '20px !important' }}>
          <ReactPlayer
            light={lightVideoFounder}
            url={messagesTeam?.[0]?.url}
            controls={true}
            width="100%"
            playing={playingVideoFounder}
            onClickPreview={() => {
              setLightVideoFounder(false);
              setPlayingVideoFounder(true);
            }}
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
            light={lightVideoCEO}
            url={messagesTeam?.[1]?.url}
            controls={true}
            width="100%"
            playing={playingVideoCEO}
            onClickPreview={() => {
              setLightVideoCEO(false);
              setPlayingVideoCEO(true);
            }}
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
            light={lightVideoTrainer}
            url={messagesTeam?.[2]?.url}
            controls={true}
            width="100%"
            playing={playingVideoTrainer}
            onClickPreview={() => {
              setLightVideoTrainer(false);
              setPlayingVideoTrainer(true);
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default MessagesFromTeam;
