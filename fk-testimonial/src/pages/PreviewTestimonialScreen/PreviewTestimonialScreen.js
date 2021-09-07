import React, {
  useContext,
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { ThemeContext } from "styled-components";
import { CustomAudioPlayer } from "../../components/CustomAudioPlayer/CustomAudioPlayer";
import { PlayFilledIcon, RefreshIcon, CrossIcon } from "../../assets/index";
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
  RESET_DATA,
  SET_QUESTION_URL,
  RECORD_SCREEN,
  SET_INDEX,
  VIDEO_QUESTIONS_SCREEN,
} from "../../constants";
import { PreviewScreenStyled } from "./style";
import ApproveTestimonial from "../../components/ApproveTestimonial/ApproveTestimonial";
import { Loader } from "../../components/LoaderOverlay/Loader";

const PreviewTestimonialScreen = () => {
  const _iOSDevice =
    !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

  const {
    state: {
      url,
      urlDuration,
      type: testimonialType,
      clientName,
      clientEmail,
      clientCompany,
      thumbUrl,
      currentQuestionIndex,
      questions,
    },
    dispatch,
  } = useContext(TestimonialContext);
  const [playVideo, setPlayVideo] = useState(false);
  const [retakeModal, setRetakeModal] = useState(false);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [isApproveLoading, setIsApproveLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const theme = useContext(ThemeContext);
  const apiRequestURL = getPublishAPIRequest(
    window.location.hostname,
    theme.default.topic
  );
  const {
    default: {
      widget: {
        previewScreen: {
          video: {
            mergeVideo,
            button: { text: buttonText },
            heading: videoScreenHeading,
          },
          audio: {
            card: { icon: iconUrl },
            heading: audioScreenHeading,
          },
        },
      },
    },
  } = theme;
  const mergeVideoChunks = () => {
    const fileId = localStorage.getItem("videoChunksId")
    fetch("/v1/api/merge-video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        id: fileId
      }),
    })
      .then((response) => response.json()
      )
      .then((data) => {
        dispatch({
          type: SET_URL,
          payload: `http://localhost:5000/${data.fileName}`
        })
      })
  }

  const shareVideoChunks = (formData) => {
    setIsLoading(true)
    fetch("/v1/api/upload-chunk", {
      body: formData,
      method: "POST",
    })
      .then((response) => {
        console.log("response: ", response)
        if (!(currentQuestionIndex < questions.length - 1)) {
          mergeVideoChunks()
          dispatch({
            type: SET_SCREEN,
            payload: VIDEO_QUESTIONS_SCREEN,
          });
        }
        setIsLoading(false)
      })
  }
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
        // if (isApproveAction) {
          // dispatch({
          //   type: SET_SCREEN,
          //   payload: THANK_YOU_SCREEN,
          // });
        // }
      })
      .catch((err) => {
        console.log("error", err);
        alert("Request failed with error code " + err);
      });
  };

  const approveVideoTestimonial = () => {
    dispatch({
      type: SET_QUESTION_URL,
      payload: { currentQuestionIndex, url, isAnswered: true },
    });

    if (currentQuestionIndex <= questions.length - 1) {
      dispatch({
        type: SET_INDEX,
        payload: currentQuestionIndex + 1,
      });
    }
    if (currentQuestionIndex < questions.length - 1) {
      dispatch({
        type: SET_SCREEN,
        payload: RECORD_SCREEN,
      });
    } else {
      if(!mergeVideo) {
        dispatch({
          type: SET_SCREEN,
          payload: VIDEO_QUESTIONS_SCREEN,
        });
      }
    }

    fetch(url)
      .then((res) => {
        console.log(res);
        return res.blob();
      })
      .then((blob) => {
        const formData = new FormData();
        formData.append("media", blob);
        // formData.append(
        //   "type",
        //   testimonialType === "video" ? "video" : "audio"
        // );
        // formData.append(
        //   "story",
        //   testimonialType === "video" ? "Video" : "Audio"
        // ); //audio for audio
        // formData.append(
        //   "author",
        //   JSON.stringify({
        //     name: clientName,
        //     email: clientEmail,
        //     company: clientCompany,
        //   })
        // );
        // formData.append("isIOS", _iOSDevice);
        // formData.append("hashtags", JSON.stringify(["Testimonial", "POC"]));
        fetch(thumbUrl)
          .then((res) => res.blob())
          .then((thumbUrlBlob) => {
            // formData.append(
            //   "thumb",
            //   testimonialType === "video"
            //     ? thumbUrlBlob
            //     : `${window.location.origin}/wave.png`
            // );
            if (localStorage.getItem("videoChunksId") === "") {
              const videoChunksId = `${Math.floor(Math.random() * 10000 + 1)}-${Math.floor(Date.now() / 1000)}`
              localStorage.setItem("videoChunksId", videoChunksId)
            }

            const fileId = localStorage.getItem("videoChunksId")
            formData.append("id", fileId);
            generateRequestData(true)
            if(mergeVideo) {
              shareVideoChunks(formData)
            }
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
    dispatch({
      type: SET_SCREEN,
      payload: RECORD_SCREEN,
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

  const onBack = useCallback(() => {
    dispatch({
      type: RESET_DATA,
    });
  }, []);

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
        formData.append("isIOS", _iOSDevice);
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

  return (
    <PreviewScreenStyled
      id="fk-preview-testimonial-screen"
      className={`preview-testimonial-screen${testimonialType === "audio" ? " audio-preview-screen" : ""
        }`}
    >
      <CrossIcon customClass="cross-icon" onClick={onBack} />

      {testimonialType === "video" ? (
        <>
          <h2 className="heading">{videoScreenHeading} </h2>
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
              poster={thumbUrl}
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
          <h2 className="heading">{audioScreenHeading}</h2>
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
      <section className="client-details-wrapper">
        <ClientDetails />
        {/* <ApproveTestimonial /> */}
        <article className="button-wrapper">
          <button
            className={`approve-button ${isApproveLoading ? "button-clicked" : ""
              }`}
            onClick={isApproveLoading ? "" : () => approveVideoTestimonial()}
          >
            {buttonText}
          </button>
        </article>
      </section>
      {/* <span className="processing-text">
        {isApproveLoading && "Processing ..."}
      </span> */}
      {testimonialType === "audio" &&
        theme.default.widget.previewScreen.audio.audio.displayWave && (
          <SoundWave />
        )}
      {isLoading && <Loader />}
      {/* {isApproveLoading && <Loader />} */}
    </PreviewScreenStyled>
  );
};

export default PreviewTestimonialScreen;
