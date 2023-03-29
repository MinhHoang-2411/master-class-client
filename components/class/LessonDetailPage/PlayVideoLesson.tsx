import ReactPlayer from 'react-player';

interface Props {
  lightVideo: any;
  url: any;
  playingVideo: any;
  setLightVideo: any;
  setPlayingVideo: any;
  height?: any;
  onSavedValueWacthing?: any;
  lesson?: any;
  playedRef?: any;
  onPauseVideo?: any;
  onEndedVideo?: any;
  setPlayedEnded?: any;
  playedEnded?: boolean;
}

const PlayVideoLesson = ({
  lightVideo,
  url,
  playingVideo,
  setLightVideo,
  setPlayingVideo,
  height,
  onSavedValueWacthing,
  lesson,
  playedRef,
  onPauseVideo,
  onEndedVideo,
  setPlayedEnded,
  playedEnded,
}: Props) => {
  const secondLastView = lesson?.historylessons?.history?.isFinished
    ? 0
    : lesson?.historylessons?.history?.secondLastView;
  return (
    <>
      <ReactPlayer
        ref={playedRef}
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
        onPause={onPauseVideo}
        onPlay={() => {
          setPlayingVideo(true);
        }}
        onProgress={(progress) =>
          onSavedValueWacthing(
            progress.playedSeconds,
            lesson?._id,
            playedEnded,
            lesson?.historylessons?._id
          )
        }
        onStart={() => {
          playedRef?.current?.seekTo(secondLastView || 0);
        }}
        onEnded={() => onEndedVideo(true)}
      />
    </>
  );
};

export default PlayVideoLesson;
