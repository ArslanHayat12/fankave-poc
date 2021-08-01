import React, { useContext, useCallback, useState, useEffect } from "react";
import { RESET_DATA } from "../../constants";
import { TestimonialContext } from "../../context/TestimonialContext";
import { CustomTooltip as Tooltip } from "../../components/Tooltip/Tooltip";
import { ShareIcon } from "../../assets";
import "./style.css";
import { Loader } from "../../components/LoaderOverlay/Loader";
import { useWindowEvent } from "../../hooks/useWindowsEvent";

export const ThankYouScreen = () => {
  const [tweet, setTweetAction] = useState(false);
  const [tweetMessage, setTweetMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isTweetUploaded, setIsTweetUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [windowTab, setWindowTab] = useState(null)
  const [isLinkedIn, setIsLinkedIn] = useState(false)

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
    setIsLinkedIn(false)
    window.localStorage.removeItem('token')
    const tab = window.open(`/testimonial-poc/twitter/login`, "_blank");
    setWindowTab(tab)
    setErrorMessage("");
  };
  const openLinkedInSiginInTab = () => {
    setIsLinkedIn(true)
    window.localStorage.removeItem('token')
    const tab = window.open(`/testimonial-poc/linkedin/login`, "_blank");
    setWindowTab(tab)
    setErrorMessage("");
  }


  useWindowEvent('storage', event => {
    if (event.key == 'token') {
      windowTab && windowTab.close()
      if (window.localStorage.getItem('token')) {
        generateRequestData(true, isLinkedIn);
      }
    }
  })


  const shareAudioVideoToTwitter = (formData) => {
    setErrorMessage("");
    setIsLoading(true);
    fetch("/testimonial-poc/tweet", {
      body: formData,
      method: "POST",
      headers: new Headers({
        'Authorization': window.localStorage.getItem('token'),
        'tokenSecret': window.localStorage.getItem('tokenSecret'),
        "id": window.localStorage.getItem('id')

      })
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
  };

  const shareAudioVideoToLinkedIn = (formData) => {
    setErrorMessage("");
    setIsLoading(true);
    fetch("/testimonial-poc/share-on-linkedin", {
      body: formData,
      method: "POST",
      headers: new Headers({
        'Authorization': window.localStorage.getItem('token'),
        'tokenSecret': window.localStorage.getItem('tokenSecret'),
        "id": window.localStorage.getItem('id')

      })
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
          isShare && isLinkedIn ? shareAudioVideoToLinkedIn(formData) : shareAudioVideoToTwitter(formData);
        } else {
          //already published
        }
      });
  };

  return (
    <article className="thankyou-screen">
      <h2 className="heading">Thank you</h2>
      <p className="description">
        We will be in touch if we need anything else.
      </p>
      <span className="back-button" onClick={onBack}>
        Go Again
      </span>
      {testimonialType === "video" && !tweet && !isTweetUploaded && (
        <div className="button-wrapper">
          <button
            className="icon-button share-button"
            onClick={() => setTweetAction(true)}
          >
            <Tooltip content="Share" placement="right">
              <ShareIcon />
            </Tooltip>
          </button>
        </div>
      )}

      {tweet && !isTweetUploaded && (
        <div className="tweet-container">
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
          <button
            className="tweet-button"
            onClick={() => openLinkedInSiginInTab()}
          >
            Share on Linkedin
          </button>
        </div>
      )}
      {errorMessage && <div className="error">{errorMessage || ""}</div>}
      {isTweetUploaded && (
        <div className="success">Your tweet has been uploaded.</div>
      )}
      {isLoading && <Loader />}
    </article>
  );
};
