import { PlayButton, Timer, Progress } from "react-soundplayer/components"
import { withCustomAudio } from "react-soundplayer/addons"
import './style.css'

export const CustomAudioPlayer = withCustomAudio((props) => {
    const { ref, urlDuration } = props

	return (
		<div ref={ref} className="custom-audio-player">
			<PlayButton {...props} />
			<Timer {...props} duration={urlDuration}/>
			<Progress {...props} duration={urlDuration}/>
		</div>
	)
})
