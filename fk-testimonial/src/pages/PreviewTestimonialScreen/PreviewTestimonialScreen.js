import React ,{useContext} from "react";
import { PlayIcon, PencilIcon } from "../../assets/index";
import ClientDetails from "../../components/ClientDetails/ClientDetails";
import { TestimonialContext } from "../../context/TestimonialContext";
import { useHistory } from "react-router-dom";
import "./style.css";

const PreviewTestimonialScreen = (props) => {
  const { state, dispatch } = useContext(TestimonialContext);
  const { testimonialType } = props;
  const history = useHistory();

  const onClick=()=>{
    history.push('/ThankYouScreen')
  }
  return (
    <article className='preview-testimonial-sreen'>
      {testimonialType === "video" ? (
        <>
          <h2 className="heading">Preview Video Testimonial </h2>
          <figure className="video-wrapper">
            <button className="edit-testimonial">
              <PencilIcon />
            </button>
            <img
              className="video"
              src="https://www.gstatic.com/webp/gallery/2.webp"
            />
            <button className="play-button">
              <PlayIcon />
            </button>
          </figure>
        </>
      ) : (
        <>
          <h2 className="heading">Preview Audio Testimonial </h2>
          <audio
					controls
					// onPlay={() => setAudioPlaying(true)}
					// onPause={() => setAudioPlaying(false)}
					// onStop={() => setAudioPlaying(false)}
				>
					<source src={state.url} />
				</audio>
        </>
      )}

      <ClientDetails />
      <article className="button-wrapper">
        <button className="approve-button" onClick={onClick}>Approve</button>
      </article>
    </article>
  );
};

export default PreviewTestimonialScreen;
