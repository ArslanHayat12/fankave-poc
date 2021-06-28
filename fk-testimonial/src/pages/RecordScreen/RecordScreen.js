import React, { useContext, useState } from "react"
import QuestionsCard from "../../components/QuestionsCard/QuestionsCard"
import { RecordingIcon, MicIcon } from "../../assets/index"
import { AudioRecorder } from "../../components/AudioRecorder/Recorder"
import { VideoRecorder } from "../../components/VideoRecorder/VideoRecorder"
import { TestimonialContext } from "../../context/TestimonialContext"
import { useInterval } from "../../hooks/useInterval"
import { convertSecondsToHourMinute } from "./../../utils/index"
import "./style.css"

const RecordScreen = () => {
	const {
		state: { type, status },
	} = useContext(TestimonialContext)
	const [remainingTime, setRemaining] = useState(0)

	useInterval(() => {
		status && setRemaining(remainingTime + 1)
	}, 1000)

	return (
		<article className="record-screen">
			{type === "video" ? (
				<>
					<h2 className="heading">Record Video Testimonial</h2>
					<VideoRecorder className="video" />
				</>
			) : (
				<>
					<h2 className="heading">Record Audio Testimonial</h2>
					<figure className="audio-wrapper">
						<article className="mic-wrapper">
							<MicIcon customClass="mic-icon" height="35px" />
						</article>
						<article className="timer">
							{" "}
							{convertSecondsToHourMinute(String(remainingTime))}
						</article>

						<AudioRecorder />
						<article className="testimonial-questions-wrapper">
							<QuestionsCard />
						</article>
					</figure>
				</>
			)}
		</article>
	)
}

export default RecordScreen
