import React, { useEffect, useRef } from "react"
import { VideoPreviewStyled } from "./style"

const VideoPreview = (props) => {
    const { videoChunks } = props
    const outputVideoRef = useRef()

    console.log('videoChunks: ', videoChunks)

    useEffect(() => {
        //webm type video file created
        if (videoChunks.length) {
            let options = { type: "video/webm" };
            if (typeof MediaRecorder.isTypeSupported == "function") {
                if (MediaRecorder.isTypeSupported("video/webm")) {
                    options = { type: "video/webm" };
                } else if (MediaRecorder.isTypeSupported("video/mp4")) {
                    //Safari 14.0.2 has an EXPERIMENTAL version of MediaRecorder enabled by default
                    options = { type: "video/mp4" };
                }
            }

            const blob = new Blob(videoChunks, options);

            let url = window.URL.createObjectURL(blob);
            try {
                url = window.webkitURL.createObjectURL(blob);
            } catch {
                url = window.URL.createObjectURL(blob);
            }

            outputVideoRef.current.src = url

        }
    }, [videoChunks]);

    return (
        <VideoPreviewStyled>
            <video ref={outputVideoRef} width="400" height="300" autoPlay controls />
        </VideoPreviewStyled>
    )
}

export default VideoPreview