import React, { useEffect, useState } from "react";
import FormatTime from "./FormatTime";
import "./CountDownTimer.css";

export default function CountDownTimer({ initialSeconds }) {
	const [timeLeft, setTimeLeft] = useState(initialSeconds);
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
				setTimeLeft(15);
				return;
			}

			const interval = setInterval(() => {
				setTimeLeft((prev) => prev - 1);
			}, 1000);
			return () => clearInterval(interval);
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
		setTimeLeft(initialSeconds);
		setMainSpeech(true);
	};

	return (
		<div>
			<FormatTime seconds={timeLeft} />

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
