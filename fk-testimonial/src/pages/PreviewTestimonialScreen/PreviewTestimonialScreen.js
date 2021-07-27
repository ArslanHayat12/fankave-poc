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
import { SoundWave } from "../../components/AudioVisualizers/SoundWave";
import { ConfirmationModal } from "../../components/ConfirmationModal/ConfirmationModal";
import { TestimonialContext } from "../../context/TestimonialContext";
import {
  SET_URL,
  SET_SCREEN,
  SET_AUDIO_PLAYING,
  SET_URL_DURATION,
  THANK_YOU_SCREEN,
} from "../../constants";
import "./style.css";

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
      recordedChunks
    },
    dispatch,
  } = useContext(TestimonialContext);
  const [playVideo, setPlayVideo] = useState(false);
  const [retakeModal, setRetakeModal] = useState(false);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [tweet, setTweetAction] = useState(false);
  const [tweetMessage, setTweetMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isApproveLoading, setIsApproveLoading] = useState(false);
  const handleChangeInput = (event) => {
    const { value } = event.currentTarget
    setErrorMessage('')
    if (value.length <= 560) {
      setTweetMessage(value)
    }
  }

  const openTwitterSiginInTab = () => {
    window.open(`/twitter/login`, '_blank')
    generateRequestData(true)
    generateRequestData()
    setErrorMessage('')

  }
  const shareAudioVideoToTwitter = (formData) => {
    setErrorMessage('')
    setIsLoading(true)
    fetch("/tweet", {
      body: formData,
      method: "POST"

    })
      .then((response) => {

        if (!response.ok) {
          // get error message from body or default to response status
          const error = response.status;
          return Promise.reject(error);
        }
        return response.json()

      }).then((response) => {
        setIsLoading(false)
        if (response.code === 324)
          setErrorMessage(response.message)
        else
          dispatch({
            type: SET_SCREEN,
            payload: THANK_YOU_SCREEN,
          });
      })
      .catch((err) => {
        console.log("error", err);
        alert("Request failed with error code " + err);
      });
  }

  const shareAudioVideoToServer = (formData, isApproveAction = false) => {
    setIsApproveLoading(true)
    fetch("https://dev.api.fankave.com/cmsx/stories/testimonialmvp/publish", {
      body: formData,
      method: "POST",
    })
      .then((response) => {
        setIsApproveLoading(false)
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
  }

  const generateRequestData = (isShare, isApproveAction) => {
    fetch(url)
      .then((res) => { console.log(res); return res.blob() })
      .then((blob) => {
        const formData = new FormData();
        if (isShare) {
          // const blob = new Blob(recordedChunks, { type: "video/mp4" });
          formData.append("media", blob);
          formData.append("tweetMessage", tweetMessage);
          isShare && shareAudioVideoToTwitter(formData)
        } else {
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

          formData.append(
            "thumburl",
            testimonialType === "video"
              ? thumbUrl
              : `${window.location.origin}/wave.png`
          );
          shareAudioVideoToServer(formData, isApproveAction)
        }
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
      className={`preview-testimonial-screen${testimonialType === "audio" ? " audio-preview-screen" : ""
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
          <ConfirmationModal
            title="audio"
            open={retakeModal}
            onCloseModal={() => setRetakeModal(false)}
            onAccept={onEdit}
          />
        </>
      )}
      {tweet ? <textarea className="text-area"
        placeholder="Write your tweet message!"
        value={tweetMessage}
        onChange={handleChangeInput} /> :
        <ClientDetails />}
      <div className="error">{errorMessage || ''}</div>
      <article className="button-wrapper">
        <button className="approve-button" onClick={() => generateRequestData(false, true)}>
          Approve
        </button>
        <button className="approve-button" onClick={() => !tweet ? setTweetAction(true) : openTwitterSiginInTab()}>
          {!tweet ? 'Tweet' : 'Share'}
        </button>
      </article>
      {tweet && isLoading && "Please wait request is processing"}
      {isApproveLoading && "Please wait request is processing"}
      {testimonialType === "audio" && <SoundWave />}
    </article>
  );
};

export default PreviewTestimonialScreen;
