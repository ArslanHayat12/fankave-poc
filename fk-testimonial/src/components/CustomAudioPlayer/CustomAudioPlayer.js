import { PlayButton, Timer, Progress, VolumeControl } from "react-soundplayer/components"
import { withCustomAudio } from "react-soundplayer/addons"
import 'react-soundplayer/styles/volume.css'
import './style.css'

export const CustomAudioPlayer = withCustomAudio((props) => {
    const { ref, urlDuration } = props

	return (
		<div ref={ref} className="custom-audio-player">
			<PlayButton {...props} />
			<Timer {...props} duration={urlDuration}/>
			<Progress {...props} duration={urlDuration}/>
			<VolumeControl {...props}/>
		</div>
	)
})
