import React from 'react';
import ReactPlayer from 'react-player';

interface Props {
  lightVideo: any;
  url: any;
  playingVideo: any;
  setLightVideo: any;
  setPlayingVideo: any;
  height?: any;
}

const VideoPreview = ({
  lightVideo,
  url,
  playingVideo,
  setLightVideo,
  setPlayingVideo,
  height,
}: Props) => {
  return (
    <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
      <ReactPlayer
        light={lightVideo}
        url={url}
        controls={true}
        width="100%"
        height={height}
        playing={playingVideo}
        onClickPreview={() => {
          setLightVideo(false);
          setPlayingVideo(true);
        }}
        onPause={() => {
          setPlayingVideo(false);
        }}
        onPlay={() => {
          setPlayingVideo(true);
        }}
      />
    </div>
  );
};

export default VideoPreview;
