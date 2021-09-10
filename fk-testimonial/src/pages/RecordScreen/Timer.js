import React, { useState, useContext, useRef, useCallback, useEffect } from "react";
import { TestimonialContext } from "../../context/TestimonialContext";
import { convertSecondsToHourMinute } from "./../../utils/index";
import { useInterval } from "../../hooks/useInterval";
import { SET_URL_DURATION } from "../../constants";

export const Timer = () => {
    const { state: { status }, dispatch } = useContext(TestimonialContext);
    const [recordingTime, setTime] = useState(0);
    const recordingTimeRef = useRef();
    recordingTimeRef.current = recordingTime;

    useInterval(() => {
        status && setTime(recordingTime + 0.5);
    }, 500);

    const dispatchURLDuration = useCallback(() => {
        recordingTimeRef &&
        dispatch({
            type: SET_URL_DURATION,
            payload: recordingTimeRef.current,
        });
    }, [recordingTimeRef]);

    useEffect(() => {
        return () => {
        dispatchURLDuration();
        };
    }, []);

    return (
        <article className="timer">
            {convertSecondsToHourMinute(String(recordingTime))}
        </article>
    )
}