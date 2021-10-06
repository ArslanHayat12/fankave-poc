import React from "react";
import Tooltip from "react-simple-tooltip"

export const CustomTooltip = (props) => {
	const { content, placement, children } = props
	return (
		<Tooltip
			content={content}
			placement={placement}
			padding={5}
			background="#7e7e7e"
			border="#7e7e7e"
			radius={3}
		>
			{children}
		</Tooltip>
	)
}
