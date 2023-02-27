import React from 'react';
import ReactPlayer from 'react-player';

interface Props {
  videoPreview: any;
  playing: any;
  setPlaying: any;
}
const PlayVideo = ({ videoPreview, playing, setPlaying }: Props) => {
  return (
    <>
      <ReactPlayer
        url={videoPreview.url}
        width="100%"
        height="350px"
        controls={true}
        playing={playing}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        light={videoPreview.thumbnail}
      />
    </>
  );
};

export default PlayVideo;
