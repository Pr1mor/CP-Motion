import React, { useEffect, useState } from "react";
import FormatTime from "./FormatTime";

export default function CountDownTimer({ initialSeconds }) {
	const [timeLeft, setTimeLeft] = useState(initialSeconds);
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		if (timeLeft <= 0 || !isRunning) return;

		const interval = setInterval(() => {
			setTimeLeft((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [timeLeft, isRunning]);

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
	};

	return (
		<div>
			<FormatTime seconds={timeLeft} />

			<div>
				{isRunning ? (
					<button onClick={handlePause}>Pause</button>
				) : (
					<button onClick={handleResume}>Resume</button>
				)}

				<button onClick={handleReset}>Reset</button>
			</div>
		</div>
	);
}
