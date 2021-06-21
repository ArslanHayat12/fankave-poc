import { useCallback, useEffect, useRef, useState } from "react"

const defaultContraints = {
	audio: true,
	video: false,
}

// mediaRecorderOptions can be {
//   mimeType?: string;
//   audioBitsPerSecond?: number;
//   videoBitsPerSecond?: number;
//   bitsPerSecond?: number;
// }

function useRecorder(mediaStreamConstraints, mediaRecorderOptions) {
	const mediaRecorderRef = useRef()
	const streamRef = useRef()
	const [status, setStatus] = useState("init")
	const [error, setError] = useState()

	const register = useCallback((callback) => {
        //register sets up recorder and stream
        //calls passed function (in case, startRecording) after setup
		callback
			? initRecording()
					.then((granted) => {
						granted && callback()
					})
					.catch(setError)
			: initRecording()
	}, [])

	const initRecording = useCallback(async () => {
        //getUserMedia will trigger browser permission prompt if access not granted
		try {
			await navigator.mediaDevices
				.getUserMedia({
					...defaultContraints,
					...(mediaStreamConstraints ? { ...mediaStreamConstraints } : {}),
				})
				.then((stream) => {
                    //after grant, receives stream and sets up recorder
					streamRef.current = stream
					const recorder = new MediaRecorder(
						stream,
						{ ...mediaRecorderOptions } || {}
					)
					mediaRecorderRef.current = recorder
					setStatus("idle")
				})
			return true
		} catch (err) {
            //set error encountered during setup
            //if permission explicitly blocked by user => set error access blocked
            typeof(err) === 'object' ? setError('Access Blocked') : setError(err)
			return false
		}
	}, [])

	const startRecording = useCallback(() => {
		setStatus("recording")
		mediaRecorderRef.current?.start()
	}, [])

	const pauseRecording = useCallback(() => {
		setStatus("paused")
		mediaRecorderRef.current?.pause()
	}, [])

	const resumeRecording = useCallback(() => {
		setStatus("recording")
		mediaRecorderRef.current?.resume()
	}, [])

	const stopRecording = useCallback(
		(callback) => () => {
			setStatus("idle")
			if (mediaRecorderRef.current) {
                //push recorder data into chunks and create audio blob and url
				mediaRecorderRef.current.ondataavailable = (e) => {
					let chunks = []
					chunks.push(e.data)
					const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" })
					const audioURL = window.URL.createObjectURL(blob)
					callback(blob, audioURL)
				}
				mediaRecorderRef.current?.stop()
			}
		},
		[]
	)

	// Only Chrome has support for microphone, camera query. Helps in determining explicit block
	const getPermissionStatus = useCallback(async () => {
		let permissionsStatus
		await navigator.permissions
			.query({ name: "microphone" })
			.then((result) => (permissionsStatus = result.state))
		return permissionsStatus
	}, [])

	if (!navigator.mediaDevices) {
		console.log("Navigator is not compatible")
	}

    //stream cleanup function
    const stopMediaStream = useCallback(()=> {
        const stream = streamRef?.current
        if (stream) {
            if (stream.getAudioTracks) {
              stream.getVideoTracks().map(track => {
                stream.removeTrack(track);
                track.stop();
              });
              stream.getAudioTracks().map(track => {
                stream.removeTrack(track);
                track.stop()
              });
            } else {
              stream.stop();
            }
          }
    }, [streamRef])

    //cleanup stream on unmount
    useEffect(()=> {
        return () => {
            stopMediaStream()
        }
    }, [])

	return {
		mediaRecorder: mediaRecorderRef?.current,
		stream: streamRef?.current,
		getPermissionStatus,
		register,
		startRecording,
		pauseRecording,
		resumeRecording,
		stopRecording,
		status,
		error,
	}
}

export default useRecorder
