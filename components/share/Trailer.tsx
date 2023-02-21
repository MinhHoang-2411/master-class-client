import Grid from '@mui/material/Grid';

import { useRef } from 'react';
import videojs from 'video.js';
import Video from '../trailer/video';

interface TrailerModel {
  listBanners?: string[];
}

const Trailer: React.FC<TrailerModel> = ({}) => {
  const playerRef = useRef(null);
  const videoJsOptions = {
    autoplay: false,
    playbackRates: [0.5, 1, 1.25, 1.5, 2],
    controls: true,
    sources: [
      {
        src: '//vjs.zencdn.net/v/oceans.mp4',
        type: 'video/mp4',
      },
    ],
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      sx={{ width: '100% !important', color: '#fff !important', margin: '0 !important' }}
    >
      <Grid item xs={4} sm={4} md={4} sx={{ padding: '24px !important' }}>
        <Video options={videoJsOptions} onReady={handlePlayerReady} />
      </Grid>
      <Grid item xs={4} sm={4} md={4} sx={{ padding: '24px !important' }}></Grid>
      <Grid item xs={4} sm={4} md={4} sx={{ padding: '24px !important' }}></Grid>
    </Grid>
  );
};
export default Trailer;
