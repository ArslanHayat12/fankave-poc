import React, { useContext, useCallback } from "react"
import { RESET_DATA } from "../../constants"
import { TestimonialContext } from "../../context/TestimonialContext"
import "./style.css"

export const ThankYouScreen = () => {
	const { dispatch } = useContext(TestimonialContext)

	const onBack = useCallback(() => {
		dispatch({
			type: RESET_DATA,
		})
	}, [])

	return (
		<article className="thankyou-screen">
			<h2 className="heading">Thank you</h2>
			<p className="description">
				We will be in touch if we need anything else.
			</p>
			<span className="back-button" onClick={onBack}>Return To Main</span>
		</article>
	)
}
