import React ,{useContext} from "react";
import QuestionsCard from "../../components/QuestionsCard/QuestionsCard";
import { RecordingIcon, MicIcon } from "../../assets/index";
import { AudioRecorder } from "../../components/AudioRecorder/Recorder";
import { VideoRecorder } from "../../components/VideoRecorder/VideoRecorder";
import { TestimonialContext } from "../../context/TestimonialContext";
import "./style.css";

const RecordScreen = () => {
  const { state, dispatch } = useContext(TestimonialContext);
  return (
    <article className="record-screen">
      {state.type === "video" ? (
        <>
          <h2 className="heading">Record Video Testimonial</h2>
          <figure className="video-wrapper">
            <VideoRecorder className="video" />
            <article className="testimonial-questions-wrapper">
              <QuestionsCard />
            </article>
          </figure>
        
        </>
      ) : (
        <>
          <h2 className="heading">Record Audio Testimonial</h2>
          <figure className="audio-wrapper">
            <article className="mic-wrapper">
              <MicIcon customClass="mic-icon" height="26px" />
            </article>
            <p>00 : 00 : 00</p>

            <AudioRecorder />
            <article className="testimonial-questions-wrapper">
              <QuestionsCard />
            </article>
          </figure>
        </>
      )}
    </article>
  );
};

export default RecordScreen;
