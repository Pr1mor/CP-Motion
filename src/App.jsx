import { use, useState } from "react";
import "./App.css";
import CountDownTimer from "./components/Timer/CountDownTimer";

const cpFormat = [
	{ role: "Prime Minister", time: 6 * 60 },
	{ role: "Leader of Opposition", time: 7 * 60 },
	{ role: "Deputy Prime Minister", time: 7 * 60 },
	{ role: "Deputy Leader of Opposition", time: 7 * 60 },
	{ role: "Leader of Opposition", time: 3 * 60 },
	{ role: "Prime Minister", time: 4 * 60 },
];

function App() {
	const [speakerIndex, setSpeakerIndex] = useState(0);
	const [motion, setMotion] = useState("");
	const [infoSlide, setInfoSlide] = useState("");

	const [isEditing, setIsEditing] = useState(true);

	const nextSpeaker = () => {
		if (speakerIndex < cpFormat.length - 1) {
			setSpeakerIndex((prev) => prev + 1);
		}
	};

	return (
		<>
			{isEditing ? (
				<div
				// style={{
				// 	marginBottom: "30px",
				// 	display: "flex",
				// 	flexDirection: "column",
				// 	gap: "10px",
				// }}
				>
					<input
						type="text"
						value={motion}
						onChange={(e) => setMotion(e.target.value)}
						placeholder="Enter debate motion here..."
						// style={{
						// 	padding: "8px",
						// 	fontSize: "16px",
						// 	width: "100%",
						// 	boxSizing: "border-box",
						// }}
					/>
					<textarea
						value={infoSlide}
						onChange={(e) => setInfoSlide(e.target.value)}
						placeholder="Enter info slide here (optional)..."
						// style={{
						// 	padding: "8px",
						// 	fontSize: "14px",
						// 	minHeight: "80px",
						// 	width: "100%",
						// 	boxSizing: "border-box",
						// 	resize: "vertical",
						// }}
					/>
					<button onClick={() => setIsEditing(false)}>
						Save Motion
					</button>
				</div>
			) : (
				<div /*style={{ marginBottom: "30px" }}*/>
					<h1 /*style={{ wordWrap: "break-word" }}*/>{motion}</h1>
					{infoSlide && (
						<p
						// style={{
						// 	fontStyle: "italic",
						// 	marginBottom: "20px",
						// 	whiteSpace: "pre-wrap",
						// 	wordWrap: "break-word",
						// }}
						>
							{infoSlide}
						</p>
					)}
					<button onClick={() => setIsEditing(true)}>
						Edit Motion
					</button>
				</div>
			)}

			<hr />
			<div>
				<div>
					<h2 id="speaker-name">{cpFormat[speakerIndex].role}</h2>
					<CountDownTimer
						key={speakerIndex}
						initialSeconds={cpFormat[speakerIndex].time}
					></CountDownTimer>
				</div>

				<div className="next-speaker-container">
					<button
						id="next-speaker-button"
						onClick={nextSpeaker}
						disabled={speakerIndex == cpFormat.length - 1}
					>
						Next Speaker
					</button>
				</div>
			</div>
		</>
	);
}

export default App;
