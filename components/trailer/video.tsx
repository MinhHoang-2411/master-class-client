import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import styles from '../../styles/layout-page.module.scss';

interface VideoModel {
  imgPreview?: string;
  style?: any;
}

export const Video = (props: VideoModel) => {
  const { imgPreview, style } = props;
  const videoRef = useRef<any>(null);
  const playerRef = useRef<any>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [videoJsOptions, setVideoJsOptions] = useState({
    autoplay: false,
    playbackRates: [0.5, 1, 1.25, 1.5, 2],
    controls: true,
    sources: [
      {
        src: '//vjs.zencdn.net/v/oceans.mp4',
        type: 'video/mp4',
      },
    ],
  });

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('play', () => {
      videojs.log('?????');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  const handlePlay = () => {
    if (videoRef?.current?.children[0]) {
      videoRef?.current?.children[0]?.classList.remove('vjs-paused');
      videoRef?.current?.children[0]?.classList.add('vjs-playing');
      videoRef?.current?.children[0]?.classList.add('vjs-user-active');
      videoRef?.current?.children[0]?.classList.add('vjs-has-started');
      setVideoJsOptions((preState: any) => ({ ...preState, autoplay: true }));
      setShowPreview(false);
    }
  };

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement('video-js');

      videoElement.classList.add('vjs-big-play-centered');
      videoElement.style.width = '100%';
      videoElement.style.height = '100%';
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, videoJsOptions, () => {
        videojs.log('player is ready');
        handlePlayerReady && handlePlayerReady(player);
      }));

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(videoJsOptions.autoplay);
      player.src(videoJsOptions.sources);
    }
  }, [videoJsOptions, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player?.isDisposed()) {
        player?.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div className={styles.group_img_preview} data-vjs-player>
      <div ref={videoRef} className={styles.divVideo} />
      {showPreview && (
        <>
          <img className={styles.img_preview} alt="" src={imgPreview} style={style} />
          <div className={styles.btn_play_preview}>
            <svg
              fill="none"
              height="70px"
              viewBox="0 0 25 25"
              width="70px"
              aria-hidden="true"
              className="mc-icon mc-icon--8"
              role="img"
              onClick={handlePlay}
            >
              <circle cx="12.938" cy="12.938" fill="#191c21" opacity="0.6" r="12.063" />
              <path
                clipRule="evenodd"
                d="M17.294 12.774l-5.67-3.679a.634.634 0 00-.57-.05c-.186.075-.304.23-.304.401v7.358c0 .17.118.326.304.401a.636.636 0 00.57-.05l5.67-3.68a.423.423 0 00.206-.35.423.423 0 00-.206-.35z"
                fill="#fff"
                fillRule="evenodd"
              />
            </svg>
          </div>
        </>
      )}
    </div>
  );
};

export default Video;
