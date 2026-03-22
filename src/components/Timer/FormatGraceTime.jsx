import React from "react";

const SECONDS_TO_CENTISECONDS = 100;

export default function FormatGraceTime({ centiseconds }) {
	const seconds = Math.floor(centiseconds / SECONDS_TO_CENTISECONDS);
	const remainingCentiseconds = centiseconds % SECONDS_TO_CENTISECONDS;
	const formattedCentiseconds = String(remainingCentiseconds).padStart(
		2,
		"0",
	);

	return (
		<div className="formatTime-block">
			<h1 className="formatTime-digital-clock">
				{seconds}.{formattedCentiseconds}
			</h1>
		</div>
	);
}
