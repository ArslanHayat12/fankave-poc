import React, { useContext, useState } from "react";
import { TestimonialContext } from "../../context/TestimonialContext";
import { getPublishAPIRequest } from "../../utils/index";
import { ThemeContext } from "styled-components";
import { SET_SCREEN, THANK_YOU_SCREEN } from "../../constants";
import { ApproveButtonWrapper } from "./style";

const ApproveTestimonial = () => {
  const _iOSDevice =
    !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
  const [isApproveLoading, setIsApproveLoading] = useState(false);

  const {
    state: {
      url,
      type: testimonialType,
      clientName,
      clientEmail,
      clientCompany,
      thumbUrl,
    },
    dispatch,
  } = useContext(TestimonialContext);
  const theme = useContext(ThemeContext);
  const {
    default: {
      widget: {
        previewScreen: {
          video: {
            mergeVideo,
            button: { text: buttonText },
          },
        },
      },
    },
  } = theme;

  const apiRequestURL = getPublishAPIRequest(
    window.location.hostname,
    theme.default.topic
  );

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

    if(mergeVideo) {
      const fileId = localStorage.getItem("videoChunksId")
  
      fetch("/v1/api/remove-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          fileName: `${fileId}.mp4`
        }),
      })
        .then((response) => {
          console.log("Video deleted!")
        })
    }
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
    <ApproveButtonWrapper className="fk-approve-button-wrapper">
      <button
        className={`fk-approve-button ${isApproveLoading ? "fk-button-clicked" : ""}`}
        onClick={isApproveLoading ? "" : () => generateRequestData(true)}
      >
        {buttonText}
      </button>
      <span className="fk-processing-text">
        {isApproveLoading && "Processing ..."}
      </span>
    </ApproveButtonWrapper>
  );
};

export default ApproveTestimonial;
