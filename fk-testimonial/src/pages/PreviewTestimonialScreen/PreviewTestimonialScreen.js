import React, { useContext, useRef, useState, useEffect, useMemo } from "react";
import { ThemeContext } from "styled-components";
import { CustomAudioPlayer } from "../../components/CustomAudioPlayer/CustomAudioPlayer";
import { PlayFilledIcon, RefreshIcon } from "../../assets/index";
import ClientDetails from "../../components/ClientDetails/ClientDetails";
import { CustomTooltip } from "../../components/Tooltip/Tooltip";
import { SoundWave } from "../../components/AudioVisualizers/SoundWave";
import { ConfirmationModal } from "../../components/ConfirmationModal/ConfirmationModal";
import { TestimonialContext } from "../../context/TestimonialContext";
import { getPublishAPIRequest } from "../../utils/index";
import {
  SET_URL,
  SET_SCREEN,
  SET_AUDIO_PLAYING,
  SET_URL_DURATION,
  THANK_YOU_SCREEN,
} from "../../constants";
import { Loader } from "../../components/LoaderOverlay/Loader";
import { PreviewScreenStyled } from "./style";

const PreviewTestimonialScreen = () => {
  const {
    state: {
      url,
      urlDuration,
      type: testimonialType,
      clientName,
      clientEmail,
      clientCompany,
      thumbUrl,
    },
    dispatch,
  } = useContext(TestimonialContext);
  const [playVideo, setPlayVideo] = useState(false);
  const [retakeModal, setRetakeModal] = useState(false);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [isApproveLoading, setIsApproveLoading] = useState(false);
  const theme = useContext(ThemeContext);
  const apiRequestURL = getPublishAPIRequest(
    window.location.hostname,
    theme.default.topic
  );
  const {
    default: {
      widget: {
        previewScreen: {
          audio: {
            card: { icon: iconUrl },
          },
        },
      },
    },
  } = theme;
  const shareAudioVideoToServer = (formData, isApproveAction = false) => {
    setIsApproveLoading(true);
    fetch(apiRequestURL, {
      body: formData,
      method: "POST",
    })
      .then((response) => {
        setIsApproveLoading(false);
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = response.status;
          return Promise.reject(error);
        }
        if (isApproveAction) {
          dispatch({
            type: SET_SCREEN,
            payload: THANK_YOU_SCREEN,
          });
        }
      })
      .catch((err) => {
        console.log("error", err);
        alert("Request failed with error code " + err);
      });
  };

  const generateRequestData = (isApproveAction) => {
    fetch(url)
      .then((res) => {
        console.log(res);
        return res.blob();
      })
      .then((blob) => {
        const formData = new FormData();
        formData.append("media", blob);

        formData.append(
          "type",
          testimonialType === "video" ? "video" : "audio"
        );

        formData.append(
          "story",
          testimonialType === "video" ? "Video" : "Audio"
        ); //audio for audio

        formData.append(
          "author",
          JSON.stringify({
            name: clientName,
            email: clientEmail,
            company: clientCompany,
          })
        );

        formData.append("hashtags", JSON.stringify(["Testimonial", "POC"]));
        fetch(thumbUrl)
          .then((res) => res.blob())
          .then((thumbUrlBlob) => {
            formData.append(
              "thumb",
              testimonialType === "video"
                ? thumbUrlBlob
                : `${window.location.origin}/wave.png`
            );
            shareAudioVideoToServer(formData, isApproveAction);
          });
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
    <PreviewScreenStyled
      id="fk-preview-testimonial-screen"
      className={`preview-testimonial-screen${
        testimonialType === "audio" ? " audio-preview-screen" : ""
      }`}
    >
      {testimonialType === "video" ? (
        <>
          <h2 className="heading">Preview Video Testimonial </h2>
          <figure className="video-wrapper">
            <button
              className="edit-testimonial"
              onClick={() => setRetakeModal(true)}
            >
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
              poster="/video-poster.png"
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
          <ConfirmationModal
            title="video"
            open={retakeModal}
            onCloseModal={() => setRetakeModal(false)}
            onAccept={onEdit}
          />
        </>
      ) : (
        <>
          <h2 className="heading">Preview Audio Testimonial </h2>
          <article className="audio-card">
            <img src={iconUrl} className="mic-icon" />

            <article className="audio-wrapper">
              {AudioPlayer}
              <CustomTooltip content="Retake" placement="bottom">
                <button
                  className="audio-edit-button"
                  onClick={() => setRetakeModal(true)}
                >
                  <RefreshIcon customClass="edit-icon" />
                </button>
              </CustomTooltip>
            </article>
          </article>
          <ConfirmationModal
            title="audio"
            open={retakeModal}
            onCloseModal={() => setRetakeModal(false)}
            onAccept={onEdit}
          />
        </>
      )}
      <ClientDetails />
      <article className="button-wrapper">
        <button
          className="approve-button"
          onClick={() => generateRequestData(true)}
        >
          Approve
        </button>
      </article>
      {isApproveLoading && "Please wait request is processing"}
      {testimonialType === "audio" &&
        theme.default.widget.previewScreen.audio.audio.displayWave && (
          <SoundWave />
        )}
      {isApproveLoading && <Loader />}
    </PreviewScreenStyled>
  );
};

export default PreviewTestimonialScreen;
