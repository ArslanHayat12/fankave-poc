import React, { useContext } from "react"
import { HomeScreen } from "./HomeScreen/HomeScreen"
import { TestimonialScreen } from "./TestimonialScreen/TestimonialScreen"
import { ThankYouScreen } from "./ThankYouScreen/ThankYouScreen"
import { TESTIMONIAL_SCREEN, THANK_YOU_SCREEN } from "../constants"
import { TestimonialContext } from "../context/TestimonialContext"

export const TestimonialApp = () => {
	const {
		state: { screen },
	} = useContext(TestimonialContext)

	return screen === TESTIMONIAL_SCREEN ? (
		<TestimonialScreen />
	) : screen === THANK_YOU_SCREEN ? (
		<ThankYouScreen />
	) : (
		<HomeScreen />
	)
}
