import React from 'react';
import ReactPlayer from 'react-player';

interface Props {
  lightVideo: any;
  url: any;
  playingVideo: any;
  setLightVideo: any;
  setPlayingVideo: any;
}

const VideoPreview = ({ lightVideo, url, playingVideo, setLightVideo, setPlayingVideo }: Props) => {
  return (
    <>
      <ReactPlayer
        light={lightVideo}
        url={url}
        controls={true}
        width="100%"
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
    </>
  );
};

export default VideoPreview;
