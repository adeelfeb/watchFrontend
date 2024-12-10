import React, { useState } from "react";

const Transcript = (transcriptData) => {
  // State to toggle between English and Original transcript views
  const [view, setView] = useState("original");

  // Function to render timestamp with a background color
  const renderTranscript = (transcriptData) => {
    return transcriptData.map((entry) => (
      <div key={entry._id} className="my-2 p-1">
        <span
          className="inline-block px-3 py-1 bg-blue-500 text-black rounded-md mr-2"
          style={{ backgroundColor: "#00BFFF" }}
        >
          {entry.timestamp[0]} - {entry.timestamp[1]}
        </span>
        <span className="bg-gray-200 p-1 rounded-md">{entry.text}</span>
      </div>
    ));
  };

  // Function to copy the transcript to clipboard
  const copyTranscript = () => {
    const transcriptText = transcriptData?.data?.[view]?.map((entry) => entry.text).join("\n");
    navigator.clipboard.writeText(transcriptText)
      .then(() => alert("Transcript copied to clipboard!"))
      .catch((err) => alert("Failed to copy transcript: " + err));
  };

  return (
    <div>
      <h4 className="font-semibold text-lg mb-4">Transcript</h4>
      
      {/* Buttons in a row: Copy, English, and Original */}
      <div className="flex mb-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded mr-2"
          onClick={copyTranscript}
        >
          Copy Transcript
        </button>

        <button
          className={`px-4 py-2 rounded mr-2 ${view === "english" ? "bg-blue-500" : "bg-gray-500"} text-white`}
          onClick={() => setView("english")}
        >
          English
        </button>

        <button
          className={`px-4 py-2 rounded ${view === "original" ? "bg-blue-500" : "bg-gray-500"} text-white`}
          onClick={() => setView("original")}
        >
          Original
        </button>
      </div>

      {/* Display transcript based on selected view */}
      <div
        className="transcript-box"
        style={{
          width: "100%", // Take the full available width from the parent container
          minWidth: "100%", // Set a minimum width
          maxWidth: "800px", // Set a maximum width
          maxHeight: "400px", // Set a max height
          whiteSpace: "normal", // Allow text to wrap
        }}
      >
        {view === "original" ? (
          <>
            <h5 className="font-semibold text-lg">Original Transcript</h5>
            {transcriptData?.data?.original && renderTranscript(transcriptData.data.original)}
          </>
        ) : (
          <>
            <h5 className="font-semibold text-lg">English Transcript</h5>
            {transcriptData?.data?.english && renderTranscript(transcriptData.data.english)}
          </>
        )}
      </div>
    </div>
  );
};

export default Transcript;
