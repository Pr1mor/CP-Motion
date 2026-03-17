import React from "react";

const MINUTE_TO_SECONDS = 60;

export default function FormatTime({ seconds }) {
	const minutes = Math.floor(seconds / MINUTE_TO_SECONDS);
	const remainingSeconds = seconds % MINUTE_TO_SECONDS;
	const formattedSeconds = String(remainingSeconds).padStart(2, "0");

	return (
		<div className="formatTime-block">
			<h1 className="formatTime-digital-clock">
				{minutes}:{formattedSeconds}
			</h1>
		</div>
	);
}
