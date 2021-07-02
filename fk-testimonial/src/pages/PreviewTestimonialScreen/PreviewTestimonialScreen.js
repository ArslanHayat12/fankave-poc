import React, {
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { CustomAudioPlayer } from "../../components/CustomAudioPlayer/CustomAudioPlayer";
import { PlayFilledIcon, RefreshIcon } from "../../assets/index";
import ClientDetails from "../../components/ClientDetails/ClientDetails";
import { CustomTooltip } from "../../components/Tooltip/Tooltip";
import { TestimonialContext } from "../../context/TestimonialContext";
import {
  SET_URL,
  SET_SCREEN,
  SET_AUDIO_PLAYING,
  SET_URL_DURATION,
} from "../../constants";
import { THANK_YOU_SCREEN } from "../../constants";
import { SoundWave } from "../../components/AudioVisualizers/SoundWave";
import "./style.css";

const PreviewTestimonialScreen = () => {
  const {
    state: { url, urlDuration, type: testimonialType },
    dispatch,
  } = useContext(TestimonialContext);
  const [playVideo, setPlayVideo] = useState(false);
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const onApproveClick = () => {
    dispatch({
      type: SET_SCREEN,
      payload: THANK_YOU_SCREEN,
    });
  };

  const onPlayClick = () => {
    if (!playVideo) {
      setPlayVideo(true);
      videoRef.current.play();
    } else {
      setPlayVideo(false);
      videoRef.current.pause();
    }
  };

  const onEdit = () => {
    dispatch({
      type: SET_URL,
      payload: "",
    });
  };

  const handlePlayAudio = () => {
    dispatch({
      type: SET_AUDIO_PLAYING,
      payload: true,
    });
  };

  const handlePauseAudio = () => {
    dispatch({
      type: SET_AUDIO_PLAYING,
      payload: false,
    });
  };

  const urlObjectCleanUp = useCallback(() => {
    //let browser discard reference to previous recorded file
    url && window.URL.revokeObjectURL(url);
  }, [url]);

  //clean up recorded file on unmount
  useEffect(() => {
    return () => {
      urlObjectCleanUp();
    };
  }, []);

  const AudioPlayer = useMemo(() => {
    return (
      <CustomAudioPlayer
        ref={audioRef}
        streamUrl={url}
        urlDuration={urlDuration}
        onStartTrack={handlePlayAudio}
        onPauseTrack={handlePauseAudio}
        preloadType="none"
      />
    );
  }, [audioRef, url, urlDuration]);

  useEffect(() => {
    testimonialType === "audio" &&
      isFinite(audioRef?.current.soundCloudAudio.audio.duration) &&
      dispatch({
        type: SET_URL_DURATION,
        payload: audioRef?.current.soundCloudAudio.audio.duration,
      });
   }, [testimonialType, audioRef?.current?.soundCloudAudio.audio.duration]);

  return (
    <article
      className={`preview-testimonial-screen${
        testimonialType === "audio" ? " audio-preview-screen" : ""
      }`}
    >
      {testimonialType === "video" ? (
        <>
          <h2 className="heading">Preview Video Testimonial </h2>
          <figure className="video-wrapper">
            <button className="edit-testimonial" onClick={onEdit}>
              <CustomTooltip content="Retake" placement="left">
                <RefreshIcon customClass="video-retake-icon" />
              </CustomTooltip>
            </button>
            <video
              ref={videoRef}
              className="video"
              width="100%"
              height="100%"
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              onClick={onPlayClick}
              onEnded={() => setPlayVideo(false)}
            >
              <source src={url} />
            </video>
            <button
              className={`play-button ${playVideo ? "hide-icon" : ""}`}
              onClick={onPlayClick}
            >
              <PlayFilledIcon />
            </button>
          </figure>
        </>
      ) : (
        <>
          <h2 className="heading">Preview Audio Testimonial </h2>

          <article className="audio-wrapper">
            {AudioPlayer}
            {/* <audio
              ref={audioRef}
              controls
              controlsList="nodownload"
              id="audio"
              onPlay={handlePlayAudio}
              onPause={handlePauseAudio}
            ><source src={url}/></audio> */}
            <CustomTooltip content="Retake" placement="bottom">
              <button className="audio-edit-button" onClick={onEdit}>
                <RefreshIcon customClass="edit-icon" />
              </button>
            </CustomTooltip>
          </article>
        </>
      )}

      <ClientDetails />
      <article className="button-wrapper">
        <button className="approve-button" onClick={onApproveClick}>
          Approve
        </button>
      </article>
      {testimonialType === "audio" && <SoundWave />}
    </article>
  );
};

export default PreviewTestimonialScreen;
