import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1; // speed (0.5 - 2)
    utterance.pitch = 1; // pitch (0 - 2)

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">HearMe 🎧</h1>
      <textarea
        className="w-full max-w-lg p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        rows="5"
        placeholder="Type or paste text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div className="flex gap-4 mt-4">
        <button
          onClick={handleSpeak}
          disabled={isSpeaking}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
        >
          {isSpeaking ? "Speaking..." : "Speak"}
        </button>
        <button
          onClick={handleStop}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Stop
        </button>
      </div>
    </div>
  );
}

export default App;
