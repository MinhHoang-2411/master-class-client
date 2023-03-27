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
  setPlayedEnded?: any;
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
  setPlayedEnded
}: Props) => {

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
          onSavedValueWacthing(progress.playedSeconds, lesson?._id, lesson?.historylessons?._id)
        }
        onStart={() => {
          playedRef?.current?.seekTo(lesson?.historylessons?.history?.secondLastView || 0);
        }}
        onEnded={() => setPlayedEnded(true)}
      />
    </>
  );
};

export default PlayVideoLesson;
