import React from 'react';
import ReactPlayer from 'react-player';

interface Props {
  videoPreview: any;
  playing: any;
  setPlaying: any;
  setPauseVideo?: any;
  height?: string;
}
const PlayVideo = ({
  videoPreview,
  playing,
  setPlaying,
  setPauseVideo,
  height = '350px',
}: Props) => {
  return (
    <>
      <ReactPlayer
        url={videoPreview.url}
        width="100%"
        height={height}
        controls={true}
        playing={playing}
        onPause={() => {
          setPlaying(false);
          setPauseVideo && setPauseVideo(true);
        }}
        onPlay={() => {
          setPauseVideo && setPauseVideo(false);
          setPlaying(true);
        }}
        light={videoPreview.thumbnail}
      />
    </>
  );
};

export default PlayVideo;
