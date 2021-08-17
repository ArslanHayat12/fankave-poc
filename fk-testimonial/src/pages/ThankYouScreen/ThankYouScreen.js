import React, { useContext, useCallback, useState, useEffect } from "react";
import { ThemeContext } from "styled-components";

import { RESET_DATA } from "../../constants";
import { TestimonialContext } from "../../context/TestimonialContext";
import { CustomTooltip as Tooltip } from "../../components/Tooltip/Tooltip";
import { ShareIcon } from "../../assets";
import { ThankyouScreenStyled } from "./style";
import { Loader } from "../../components/LoaderOverlay/Loader";
import { getUserConfig } from "./../../utils/config";

export const ThankYouScreen = () => {
  const [tweet, setTweetAction] = useState(false);
  const [tweetMessage, setTweetMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isTweetUploaded, setIsTweetUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [windowTab, setWindowTab] = useState(null);
  const { origin } = getUserConfig("testimonials");
  const {
    state: { url, type: testimonialType },
    dispatch,
  } = useContext(TestimonialContext);

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

  const onBack = useCallback(() => {
    dispatch({
      type: RESET_DATA,
    });
  }, []);

  const handleChangeInput = (event) => {
    const { value } = event.currentTarget;
    setErrorMessage("");
    if (value.length <= 560) {
      setTweetMessage(value);
    }
  };

  const openTwitterSiginInTab = () => {
    window.localStorage.removeItem("token");
    const tab = window.open(origin + `/testimonials/twitter/login`, "_blank");
    setWindowTab(tab);
    setErrorMessage("");
    generateRequestData(true, false);
  };
  const openLinkedInSiginInTab = () => {
    window.localStorage.removeItem("token");
    const tab = window.open(origin + `/testimonials/linkedin/login`, "_blank");
    setWindowTab(tab);
    setErrorMessage("");
    generateRequestData(true, true);
  };

  // useWindowEvent("storage", (event) => {
  //   if (event.key == "token") {
  //     windowTab && windowTab.close();
  //     if (window.localStorage.getItem("token")) {
  //       generateRequestData(true, isLinkedIn);
  //     }
  //   }
  // });

  const shareAudioVideoToTwitter = (formData) => {
    setErrorMessage("");
    setIsLoading(true);
    fetch(origin + "/testimonials/get-token")
      .then((r) => r.json())
      .then((text) => {
        console.log(text);
        fetch(origin + "/testimonials/tweet", {
          body: formData,
          method: "POST",
          headers: new Headers({
            Authorization: text.token,
            tokenSecret: text.tokenSecret,
            id: text.id,
          }),
        })
          .then((response) => {
            setIsLoading(false);
            if (!response.ok) {
              // get error message from body or default to response status
              const error = response.status;
              return Promise.reject(error);
            }
            return response.json();
          })
          .then((response) => {
            setIsLoading(false);
            if (response.code === 324) setErrorMessage(response.message);
            else {
              setIsTweetUploaded(true);
              setErrorMessage(true);
            }
          })
          .catch((err) => {
            setIsLoading(false);
            console.log("error", err);
            alert("Request failed with error code " + err);
          });
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage("Tried With Invalid Token");
      });
  };

  const shareAudioVideoToLinkedIn = (formData) => {
    setErrorMessage("");
    setIsLoading(true);
    fetch(origin + "/testimonials/get-linkedin-token")
      .then((r) => r.json())
      .then((text) => {
        fetch(origin + "/testimonials/share-on-linkedin", {
          body: formData,
          method: "POST",
          headers: new Headers({
            Authorization: text.token,
            tokenSecret: text.tokenSecret,
            id: text.id,
          }),
        })
          .then((response) => {
            setIsLoading(false);
            if (!response.ok) {
              // get error message from body or default to response status
              const error = response.status;
              return Promise.reject(error);
            }
            return response.json();
          })
          .then((response) => {
            setIsLoading(false);
            if (response.code === 324) setErrorMessage(response.message);
            else {
              setIsTweetUploaded(true);
              setErrorMessage(true);
            }
          })
          .catch((err) => {
            setIsLoading(false);
            console.log("error", err);
            alert("Request failed with error code " + err);
          });
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage("Tried With Invalid Token");
      });
  };

  const generateRequestData = (isShare = false, isLinkedIn = false) => {
    fetch(url)
      .then((res) => {
        console.log(res);
        return res.blob();
      })
      .then((blob) => {
        const formData = new FormData();
        if (isShare) {
          // const blob = new Blob(recordedChunks, { type: "video/mp4" });
          formData.append("media", blob);
          formData.append("tweetMessage", tweetMessage);

          isShare && isLinkedIn
            ? shareAudioVideoToLinkedIn(formData)
            : shareAudioVideoToTwitter(formData);
        } else {
          //already published
        }
      });
  };

  const theme = useContext(ThemeContext);
  const {
    default: {
      widget: {
        thankyouScreen: {
          shareIcon: { url: beviShareIcon, display: displayShareIcon },
          linkedinButton: { display: linkedinIconDisplay },
          tweetIcon: { url: beviTweetIcon },
          button: { text, display },
        },
      },
    },
  } = theme;

  return (
    <ThankyouScreenStyled className="thankyou-screen" id="fk-thankyou-screen">
      <h2 className="heading">Thank you</h2>
      <p className="description">
        We will be in touch if we need anything else.
      </p>
      <span className="back-button" onClick={onBack}>
        Go Again
      </span>
      {testimonialType === "video" && !tweet && !isTweetUploaded && (
        <div className="button-wrapper">
          {displayShareIcon && (
            <button
              className="icon-button "
              onClick={() => setTweetAction(true)}
            >
              <Tooltip content="Share" placement="right">
                {beviShareIcon ? <img src={beviShareIcon} /> : <ShareIcon />}
              </Tooltip>
            </button>
          )}

          {display && (
            <button
              className="share-button"
              onClick={() => setTweetAction(true)}
            >
              {text}
            </button>
          )}
        </div>
      )}

      {tweet && !isTweetUploaded && (
        <div className="tweet-container">
          {beviTweetIcon && (
            <img src={beviTweetIcon} className="twitter-icon" />
          )}
          <textarea
            className="text-area"
            placeholder="Write your tweet message!"
            value={tweetMessage}
            onChange={handleChangeInput}
          />
          <button
            className="tweet-button"
            onClick={() => openTwitterSiginInTab()}
          >
            Tweet
          </button>
          {linkedinIconDisplay && (
            <button
              className="tweet-button"
              onClick={() => openLinkedInSiginInTab()}
            >
              Share on Linkedin
            </button>
          )}
        </div>
      )}
      {errorMessage && <div className="error">{errorMessage || ""}</div>}
      {isTweetUploaded && (
        <div className="success">Your message has been uploaded.</div>
      )}
      {isLoading && <Loader />}
    </ThankyouScreenStyled>
  );
};
