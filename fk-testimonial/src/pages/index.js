import React, { useContext } from "react"
import { HomeScreen } from "./HomeScreen/HomeScreen"
import { sharestoriescreen } from "./sharestoriescreen/sharestoriescreen"
import { ThankYouScreen } from "./ThankYouScreen/ThankYouScreen"
import { TESTIMONIAL_SCREEN, THANK_YOU_SCREEN } from "../constants"
import { TestimonialContext } from "../context/TestimonialContext"

export const TestimonialApp = () => {
	const {
		state: { screen },
	} = useContext(TestimonialContext)

	return screen === TESTIMONIAL_SCREEN ? (
		<sharestoriescreen />
	) : screen === THANK_YOU_SCREEN ? (
		<ThankYouScreen />
	) : (
		<HomeScreen />
	)
}
