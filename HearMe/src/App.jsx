import { useState, useEffect } from "react";

function App() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0].name);
      }
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }, [selectedVoice]);

  const handleSpeak = () => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);

    const voice = voices.find((v) => v.name === selectedVoice);
    if (voice) utterance.voice = voice;

    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-4xl font-extrabold text-blue-600 text-center mb-6">
          HearMe 🎧
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Convert your text into speech with adjustable voice, speed, and pitch.
        </p>

        {/* Text input */}
        <textarea
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none text-gray-800 resize-none"
          rows="5"
          placeholder="Type or paste text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        {/* Voice selection */}
        <div className="mt-6">
          <label className="block text-gray-700 font-medium mb-2">
            🎤 Select Voice:
          </label>
          <select
            className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400"
            value={selectedVoice || ""}
            onChange={(e) => setSelectedVoice(e.target.value)}
          >
            {voices.map((voice, idx) => (
              <option key={idx} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Speed */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              ⚡ Speed: {rate.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>

          {/* Pitch */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              🎵 Pitch: {pitch.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center mt-8">
          <button
            onClick={handleSpeak}
            disabled={isSpeaking}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSpeaking ? "🔊 Speaking..." : "▶ Speak"}
          </button>
          <button
            onClick={handleStop}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md transition"
          >
            ⏹ Stop
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
