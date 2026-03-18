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
			if (timeLeft <= 0 && !mainSpeech) {
				setIsRunning(false);
				return; // hard stop
			}

			// main speech ended start grace period
			if (timeLeft <= 0 && mainSpeech) {
				setMainSpeech(false);
				setTimeLeft(GRACE_TIME * 100);
				return;
			}

			if (mainSpeech) {
				const interval = setInterval(() => {
					setTimeLeft((prev) => prev - 100);
				}, 1000);
				return () => clearInterval(interval);
			} else {
				const interval = setInterval(() => {
					setTimeLeft((prev) => prev - 1);
				}, 10);
				return () => clearInterval(interval);
			}
		}
	}, [timeLeft, isRunning, mainSpeech]);

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
