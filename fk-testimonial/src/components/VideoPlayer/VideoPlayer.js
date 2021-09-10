import React, {useState, useCallback} from "react"
import { isMobile } from "react-device-detect";
import Webcam from "react-webcam";

import { VideoPlayerStyled } from "./style"

export const VideoPlayer = ({ canvasRef, webcamRef, videoHeight, setError, setIsStreamInit }) => {
    const [showNotification, setShowNotification] = useState(false);

    const videoWidth =
        window.innerWidth > 0 ? window.innerWidth : window.screen.width;

    const showAccessBlocked = useCallback((err) => {
        typeof err === "object"
            ? setError("Access Blocked") && setShowNotification(true)
            : setError(err);
    }, []);

    return (
        <VideoPlayerStyled>
            <canvas
                className="video-canvas"
                ref={canvasRef}
                width={isMobile
                    ? undefined
                    : videoWidth > 400
                        ? 333
                        : videoWidth > 360
                            ? 313
                            : 298}
                height={isMobile ? undefined : videoHeight}
            />
            <Webcam
                ref={webcamRef}
                videoConstraints={{
                    width: isMobile
                        ? undefined
                        : videoWidth > 400
                            ? 333
                            : videoWidth > 360
                                ? 313
                                : 298,
                    height: isMobile ? undefined : videoHeight,
                    facingMode: "user",
                }}
                width={videoWidth > 400 ? 333 : videoWidth > 360 ? 313 : 298}
                height={videoHeight}
                style={{ objectFit: "cover" }}
                className="webcam-video"
                onUserMedia={() => setIsStreamInit(true)}
                onUserMediaError={showAccessBlocked}
            />
        </VideoPlayerStyled>
    )
}