import React, { useEffect, useState } from "react";
import FormatTime from "./FormatTime";
import FormatGraceTime from "./FormatGraceTime";
import "./CountDownTimer.css";

const GRACE_TIME = 15;

export default function CountDownTimer({ initialSeconds }) {
	const [timeLeft, setTimeLeft] = useState(initialSeconds * 100); // time left is in centiseconds
	const [isRunning, setIsRunning] = useState(false);
	const [mainSpeech, setMainSpeech] = useState(true);
	useEffect(() => {
		if (isRunning) {
			const expectedEndTime = Date.now() + timeLeft * 10; // converting centiseconds into milliseconds

			const interval = setInterval(
				() => {
					const currentTime = Date.now();
					const msRemaining = expectedEndTime - currentTime;

					const csRemaining = Math.ceil(msRemaining / 10); // centiseconds remaining

					if (csRemaining <= 0) {
						if (!mainSpeech) {
							setIsRunning(false);
							setTimeLeft(0);
						} else {
							setMainSpeech(false);
							setTimeLeft(GRACE_TIME * 100); // grace time in centiseconds
						}

						return;
					}

					setTimeLeft(csRemaining);
				},
				mainSpeech ? 1000 : 10,
			);
			return () => clearInterval(interval);
		}
	}, [isRunning, mainSpeech]);

	// --- EVENT HANDLERS ---
	const handlePause = () => {
		setIsRunning(false);
	};

	const handleResume = () => {
		setIsRunning(true);
	};

	const handleReset = () => {
		setIsRunning(false);
		setTimeLeft(initialSeconds * 100);
		setMainSpeech(true);
	};

	return (
		<div>
			{mainSpeech ? (
				<FormatTime seconds={Math.floor(timeLeft / 100)} />
			) : (
				<FormatGraceTime centiseconds={timeLeft}></FormatGraceTime>
			)}

			<div className="button-block">
				{isRunning ? (
					<button id="pause-button" onClick={handlePause}>
						Pause
					</button>
				) : (
					<button id="resume-button" onClick={handleResume}>
						Resume
					</button>
				)}

				<button id="reset-button" onClick={handleReset}>
					Reset
				</button>
			</div>
		</div>
	);
}
