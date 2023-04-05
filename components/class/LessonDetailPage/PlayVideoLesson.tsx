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
    <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
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
            lesson?.id,
            playedEnded,
            lesson?.historylessons?.id
          )
        }
        onStart={() => {
          playedRef?.current?.seekTo(secondLastView || 0);
        }}
        onEnded={onEndedVideo}
      />
    </div>
  );
};

export default PlayVideoLesson;
