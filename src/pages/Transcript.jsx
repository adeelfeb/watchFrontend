// import React, { useState } from "react";

// const Transcript = ({ data }) => {
//   const [view, setView] = useState("original");

//   const renderTranscript = (transcript) => {
//     return transcript.map((entry, index) => (
//       <div
//         key={entry._id || index}
//         className="flex items-center my-2 px-3 py-2 bg-white rounded-md shadow-sm w-full"
//       >
//         <span
//           className="inline-block px-2 py-1 bg-blue-500 text-white rounded-md mr-3"
//           style={{ backgroundColor: "#00BFFF" }}
//         >
//           {entry.timestamp[0]} - {entry.timestamp[1]}
//         </span>
//         <span className="flex-1 bg-gray-200 p-2 rounded-md">
//           {entry.text}
//         </span>
//       </div>
//     ));
//   };

//   const copyTranscript = () => {
//     const transcriptText = data?.[view]?.map((entry) => entry.text).join("\n");
//     navigator.clipboard
//       .writeText(transcriptText)
//       .then(() => alert("Transcript copied to clipboard!"))
//       .catch((err) => alert("Failed to copy transcript: " + err));
//   };

//   return (
//     <div className=" w-full">
//       <div className="flex gap-2 mb-4">
//         <button
//           className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//           onClick={copyTranscript}
//         >
//           Copy Transcript
//         </button>
//         <button
//           className={`px-4 py-2 rounded ${
//             view === "english" ? "bg-blue-500 text-white" : "bg-gray-400 text-black"
//           }`}
//           onClick={() => setView("english")}
//         >
//           English
//         </button>
//         <button
//           className={`px-4 py-2 rounded ${
//             view === "original" ? "bg-blue-500 text-white" : "bg-gray-400 text-black"
//           }`}
//           onClick={() => setView("original")}
//         >
//           Original
//         </button>
//       </div>

//       <div
//         className="overflow-y-auto  overflow-auto scrollbar-thin bg-white p-4 rounded-md shadow-inner w-full"
//         // style={{ maxHeight: full }}
//       >
//         {view === "original" ? (
//           <>
//             <h5 className="font-semibold text-lg mb-2">Original Transcript</h5>
//             {data?.original ? renderTranscript(data.original) : <p>No data available.</p>}
//           </>
//         ) : (
//           <>
//             <h5 className="font-semibold text-lg mb-2">English Transcript</h5>
//             {data?.english ? renderTranscript(data.english) : <p>No data available.</p>}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Transcript;


import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md"; // Copy icon
import ToastNotification from "../components/ToastNotification"; // Import your ToastNotification component

const Transcript = ({ data }) => {
  const [view, setView] = useState("original");
  const [toastMessage, setToastMessage] = useState(""); // State for Toast Notification
  const [isSuccess, setIsSuccess] = useState(true);

  const renderTranscript = (transcript) => {
    return transcript.map((entry, index) => (
      <div
        key={entry._id || index}
        className="flex items-center my-2 px-3 py-2 bg-white rounded-md shadow-sm w-full"
      >
        <span
          className="inline-block px-2 py-1 bg-blue-500 text-white rounded-md mr-3"
          style={{ backgroundColor: "#00BFFF" }}
        >
          {entry.timestamp[0]} - {entry.timestamp[1]}
        </span>
        <span className="flex-1 bg-gray-200 p-2 rounded-md">
          {entry.text}
        </span>
      </div>
    ));
  };

  const copyTranscript = () => {
    const transcriptText = data?.[view]?.map((entry) => entry.text).join("\n");
    if (transcriptText) {
      navigator.clipboard
        .writeText(transcriptText)
        .then(() => {
          // Basic if-else statement to set the toast message based on view
          if (view === "original") {
            setToastMessage("Original Transcript copied to clipboard!");
          } else if (view === "english") {
            setToastMessage("English Transcript copied to clipboard!");
          }
          setIsSuccess(true);
        })
        .catch((err) => setToastMessage("Failed to copy transcript: " + err));
    } else {
      setToastMessage("No transcript available to copy!");
      setIsSuccess(false);
    }
  };
  

  return (
    <div className="w-full">
      {/* Copy Button with Icon */}
      <div className="flex gap-4 mb-4">
        <button
          className={`p-2 px-4 rounded ${view === "english" ? "bg-blue-500 text-white" : "bg-gray-400 text-black"}`}
          onClick={() => setView("english")}
        >
          English
        </button>
        <button
          className={`p-2 px-4 rounded ${view === "original" ? "bg-blue-500 text-white" : "bg-gray-400 text-black"}`}
          onClick={() => setView("original")}
        >
          Original
        </button>
        <button
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
          onClick={copyTranscript}
        >
          <MdContentCopy size={20} /> {/* Copy icon */}
        </button>
      </div>

      {/* Transcript Content */}
      <div
        className="overflow-y-auto scrollbar-thin bg-white p-4 rounded-md shadow-inner w-full"
      
      >
        {view === "original" ? (
          <>
            <h5 className="font-semibold text-lg mb-2">Original Transcript</h5>
            {data?.original ? renderTranscript(data.original) : <p>No data available.</p>}
          </>
        ) : (
          <>
            <h5 className="font-semibold text-lg mb-2">English Transcript</h5>
            {data?.english ? renderTranscript(data.english) : <p>No data available.</p>}
          </>
        )}
      </div>

      {/* ToastNotification for feedback */}
      {toastMessage && (
        <ToastNotification
          message={toastMessage}
          duration={3000} // Duration for the toast to show
          onClose={() => setToastMessage("")} // Reset toast message on close
          position="right"
          isSuccess={isSuccess}
        />
      )}
    </div>
  );
};

export default Transcript;
