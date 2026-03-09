import React, { useEffect, useState } from "react";

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
		<div style={{ textAlign: "center", marginTop: "5px" }}>
			<ConvertIntoFormat seconds={timeLeft} />

			<div
				style={{
					marginTop: "5px",
					display: "flex",
					gap: "5px",
					justifyContent: "center",
				}}
			>
				{/* Toggle between Pause and Resume using our named functions */}
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

function ConvertIntoFormat({ seconds }) {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	const formattedSeconds = String(remainingSeconds).padStart(2, "0");

	return (
		<h1>
			{minutes}:{formattedSeconds}
		</h1>
	);
}
