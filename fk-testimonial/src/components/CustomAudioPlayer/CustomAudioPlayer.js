import { PlayButton, Timer, Progress } from "react-soundplayer/components"
import { withCustomAudio } from "react-soundplayer/addons"
import './style.css'

export const CustomAudioPlayer = withCustomAudio((props) => {
    const { ref } = props

	return (
		<div ref={ref} className="custom-audio-player">
			<PlayButton {...props} />
			<Timer {...props} duration={30}/>
			<Progress {...props} duration={30}/>
		</div>
	)
})
