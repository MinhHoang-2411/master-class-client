import { Box, Button } from '@mui/material';
import React, { useState } from 'react';

import { displayCenter } from '@/declares/modal';

import PauseIcon from '../../../public/icons/classes/pause.svg';
import PlayIcon from '../../../public/icons/classes/playVideo.svg';
import Image from 'next/image';
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
          bgcolor: '#fff',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={onClickPlayVideo}
      >
        {playing ? (
          <Image width={30} height={30} alt="pause-video" src={PauseIcon} />
        ) : (
          <Image width={30} height={30} alt="play-video" src={PlayIcon} />
        )}

        <Box sx={{ ml: '12px', color: 'rgba(44, 44, 44, 1)' }}>Class trailer</Box>
      </Box>
    </>
  );
};

export default VideoTrailer;
