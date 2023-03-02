import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { displayCenter } from '@/declares/modal';
import PauseIcon from '@mui/icons-material/Pause';
interface Props {
  playing: any;
  setPlaying: any;
  setLight: any;
}
const VideoTrailer = ({ playing, setPlaying, setLight }: Props) => {
  const onClickPlayVideo = () => {
    setPlaying(!playing);
    setLight(false);
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 2,
          bgcolor: '#303136',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={onClickPlayVideo}
      >
        {playing ? (
          <PauseIcon />
        ) : (
          <Box
            sx={{
              ...displayCenter,
              bgcolor: 'rgb(227,38,82)',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
            }}
          >
            <PlayArrowIcon sx={{ fontSize: '16px' }} />
          </Box>
        )}

        <Box sx={{ ml: '12px' }}>Class trailer</Box>
      </Box>
    </>
  );
};

export default VideoTrailer;
