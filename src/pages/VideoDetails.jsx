// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux"; // Importing dispatch to store the transcript data in Redux or local state
// import Transcript from "./Transcript";
// import Summary from "./Summary";
// import Quiz from "./Quiz";
// import KeyConcepts from "./KeyConcepts"; // Import KeyConcepts component
// import videoService from "../AserverAuth/config"; // Import videoService for fetching data

// const VideoDetails = ({ data }) => {
//   const [selectedSection, setSelectedSection] = useState(null); // State for button selection
//   const [transcriptData, setTranscriptData] = useState(null); // State to store the transcript
//   const [summaryData, setSummarytData] = useState(null); // State to store the transcript
//   const [qnaData, setQnatData] = useState(null); // State to store the transcript
//   const [keyConceptsData, setKeyConceptsData] = useState(null); // State to store the key concepts
//   const [transcriptisLoading, setTranscriptIsLoading] = useState(false); // State for loading status
//   const [summaryIsLoading, setSummaryIsLoading] = useState(false); // State for loading status
//   const [quizIsLoading, setQuizIsLoading] = useState(false); // State for loading status
//   const [keyConceptsIsLoading, setKeyConceptsIsLoading] = useState(false); // State for loading status

//   const handleTranscriptClick = async () => {
//     if (!data._id) {
//       console.error("No videoId found.");
//       return;
//     }

//     setTranscriptIsLoading(true);

//     try {
//       // Fetch the transcript data using the videoService
//       const transcript = await videoService.getTranscript(data._id);
//       setTranscriptData(transcript.data.transcript); // Update state with the fetched transcript
//       setSelectedSection("transcript"); // Set the selected section to 'transcript'
//     } catch (error) {
//       console.error("Error fetching transcript:", error);
//     } finally {
//       setTranscriptIsLoading(false);
//     }
//   };

//   const handleSummaryClick = async () => {
//     if (!data._id) {
//       console.error("No videoId found.");
//       return;
//     }

//     setSummaryIsLoading(true);

//     try {
//       // Fetch the summary data using the videoService
//       const summary = await videoService.getSummary(data._id);
//       console.log("Now inside the hadnleSumamryClick",summary.data.summary)
//       setSummarytData(summary.data.summary); // Update state with the fetched summary
//       setSelectedSection("summary"); // Set the selected section to 'summary'
//     } catch (error) {
//       console.error("Error fetching summary:", error);
//     } finally {
//       setSummaryIsLoading(false);
//     }
//   };

//   const handleQuizClick = async () => {
//     if (!data._id) {
//       console.error("No videoId found.");
//       return;
//     }

//     setQuizIsLoading(true);

//     try {
//       // Fetch the quiz data using the videoService
//       const quiz = await videoService.getqnas(data._id);
//       setQnatData(quiz.data.qnas); // Update state with the fetched quiz
//       setSelectedSection("quiz"); // Set the selected section to 'quiz'
//     } catch (error) {
//       console.error("Error fetching quiz:", error);
//     } finally {
//       setQuizIsLoading(false);
//     }
//   };

//   const handleKeyConceptsClick = async () => {
//     if (!data._id) {
//       console.error("No videoId found.");
//       return;
//     }

//     setKeyConceptsIsLoading(true);

//     try {
//       // Fetch the key concepts data using the videoService
//       const keyConcepts = await videoService.getKeyConcepts(data._id);
//       setKeyConceptsData(keyConcepts.data.keyConcepts); // Update state with the fetched key concepts
//       setSelectedSection("keyConcepts"); // Set the selected section to 'keyConcepts'
//     } catch (error) {
//       console.error("Error fetching key concepts:", error);
//     } finally {
//       setKeyConceptsIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-[calc(100vh-200px)]">
//   {/* Top Section */}
//   <div className="flex flex-1">
//     {/* Embedded Video Section (Left) */}
//     <div className="w-2/3 p-4">
//       <iframe
//         src={
//           data.videoUrl
//             ? `https://www.youtube.com/embed/${new URLSearchParams(
//                 new URL(data.videoUrl).search
//               ).get("v")}`
//             : ""
//         }
//         width="80%"
//         height="260"
//         className="aspect-video"
//         title="YouTube Video"
//         frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//       ></iframe>
//     </div>

//     {/* Title, Duration, and Buttons Section (Right) */}
//     <div className="w-1/2 p-4">
//       <h4 className="font-semibold text-lg">{data.title}</h4>
//       <p className="text-sm text-gray-600 mb-4">Duration: {data.duration}</p>

//       <div className="flex flex-col gap-2">
//         <button
//           onClick={handleTranscriptClick} // Trigger the fetch for transcript
//           className={`px-4 py-2 font-medium border rounded-lg ${
//             selectedSection === "transcript"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//           }`}
//         >
//           {transcriptisLoading ? "Loading..." : "Transcript"}
//         </button>
//         <button
//           onClick={handleSummaryClick}
//           className={`px-4 py-2 font-medium border rounded-lg ${
//             selectedSection === "summary"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//           }`}
//         >
//           {summaryIsLoading ? "Loading..." : "Summary"}
//         </button>
//         <button
//           onClick={handleKeyConceptsClick}
//           className={`px-4 py-2 font-medium border rounded-lg ${
//             selectedSection === "keyConcepts"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//           }`}
//         >
//           {keyConceptsIsLoading ? "Loading..." : "Key Concepts"}
//         </button>
//         <button
//           onClick={handleQuizClick}
//           className={`px-4 py-2 font-medium border rounded-lg ${
//             selectedSection === "quiz"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//           }`}
//         >
//           {quizIsLoading ? "Loading..." : "Take Quiz"}
//         </button>
//       </div>
//     </div>
//   </div>

//   {/* Bottom Section - Made smaller (1/3 height of the top section) */}
//   <div className="flex-1 p-4 border-t overflow-auto scrollbar-thin ">
//     {selectedSection === "transcript" && (
//       <Transcript data={transcriptData || data.transcript} />
//     )}
//     {selectedSection === "summary" && <Summary data={summaryData || data.summary} />}
//     {selectedSection === "keyConcepts" && (
//       <KeyConcepts data={keyConceptsData || data.keyConcepts} />
//     )}
//     {selectedSection === "quiz" && <Quiz data={qnaData || data.qnas} />}
//   </div>
// </div>

//   );
// };

// export default VideoDetails;



import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux"; // Importing dispatch to store the transcript data in Redux or local state
import Transcript from "./Transcript";
import Summary from "./Summary";
import Quiz from "./Quiz";
import KeyConcepts from "./KeyConcepts"; // Import KeyConcepts component
import videoService from "../AserverAuth/config"; // Import videoService for fetching data

const VideoDetails = ({ data }) => {
  const [selectedSection, setSelectedSection] = useState(null); // State for button selection
  const [transcriptData, setTranscriptData] = useState(null); // State to store the transcript
  const [summaryData, setSummarytData] = useState(null); // State to store the transcript
  const [qnaData, setQnatData] = useState(null); // State to store the transcript
  const [keyConceptsData, setKeyConceptsData] = useState(null); // State to store the key concepts
  const [transcriptisLoading, setTranscriptIsLoading] = useState(false); // State for loading status
  const [summaryIsLoading, setSummaryIsLoading] = useState(false); // State for loading status
  const [quizIsLoading, setQuizIsLoading] = useState(false); // State for loading status
  const [keyConceptsIsLoading, setKeyConceptsIsLoading] = useState(false); // State for loading status

  // Reset state when data changes
  useEffect(() => {
    setSelectedSection(null);
    setTranscriptData(null);
    setSummarytData(null);
    setQnatData(null);
    setKeyConceptsData(null);
    setTranscriptIsLoading(false);
    setSummaryIsLoading(false);
    setQuizIsLoading(false);
    setKeyConceptsIsLoading(false);
  }, [data]);

  const handleTranscriptClick = async () => {
    if (!data._id) {
      console.error("No videoId found.");
      return;
    }

    setTranscriptIsLoading(true);

    try {
      // Fetch the transcript data using the videoService
      const transcript = await videoService.getTranscript(data._id);
      setTranscriptData(transcript.data.transcript); // Update state with the fetched transcript
      setSelectedSection("transcript"); // Set the selected section to 'transcript'
    } catch (error) {
      console.error("Error fetching transcript:", error);
    } finally {
      setTranscriptIsLoading(false);
    }
  };

  const handleSummaryClick = async () => {
    if (!data._id) {
      console.error("No videoId found.");
      return;
    }

    setSummaryIsLoading(true);

    try {
      // Fetch the summary data using the videoService
      const summary = await videoService.getSummary(data._id);
      setSummarytData(summary.data.summary); // Update state with the fetched summary
      setSelectedSection("summary"); // Set the selected section to 'summary'
    } catch (error) {
      console.error("Error fetching summary:", error);
    } finally {
      setSummaryIsLoading(false);
    }
  };

  const handleQuizClick = async () => {
    if (!data._id) {
      console.error("No videoId found.");
      return;
    }

    setQuizIsLoading(true);

    try {
      // Fetch the quiz data using the videoService
      const quiz = await videoService.getqnas(data._id);
      setQnatData(quiz.data.qnas); // Update state with the fetched quiz
      setSelectedSection("quiz"); // Set the selected section to 'quiz'
    } catch (error) {
      console.error("Error fetching quiz:", error);
    } finally {
      setQuizIsLoading(false);
    }
  };

  const handleKeyConceptsClick = async () => {
    if (!data._id) {
      console.error("No videoId found.");
      return;
    }

    setKeyConceptsIsLoading(true);

    try {
      // Fetch the key concepts data using the videoService
      const keyConcepts = await videoService.getKeyConcepts(data._id);
      setKeyConceptsData(keyConcepts.data.keyConcepts); // Update state with the fetched key concepts
      setSelectedSection("keyConcepts"); // Set the selected section to 'keyConcepts'
    } catch (error) {
      console.error("Error fetching key concepts:", error);
    } finally {
      setKeyConceptsIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      {/* Top Section */}
      <div className="flex flex-1">
        {/* Embedded Video Section (Left) */}
        <div className="w-2/3 p-4">
          <iframe
            src={
              data.videoUrl
                ? `https://www.youtube.com/embed/${new URLSearchParams(
                    new URL(data.videoUrl).search
                  ).get("v")}`
                : ""
            }
            width="80%"
            height="260"
            className="aspect-video"
            title="YouTube Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Title, Duration, and Buttons Section (Right) */}
        <div className="w-1/2 p-4">
          <h4 className="font-semibold text-lg">{data.title}</h4>
          <p className="text-sm text-gray-600 mb-4">Duration: {data.duration}</p>

          <div className="flex flex-col gap-2">
            <button
              onClick={handleTranscriptClick} // Trigger the fetch for transcript
              className={`px-4 py-2 font-medium border rounded-lg ${
                selectedSection === "transcript"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {transcriptisLoading ? "Loading..." : "Transcript"}
            </button>
            <button
              onClick={handleSummaryClick}
              className={`px-4 py-2 font-medium border rounded-lg ${
                selectedSection === "summary"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {summaryIsLoading ? "Loading..." : "Summary"}
            </button>
            <button
              onClick={handleKeyConceptsClick}
              className={`px-4 py-2 font-medium border rounded-lg ${
                selectedSection === "keyConcepts"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {keyConceptsIsLoading ? "Loading..." : "Key Concepts"}
            </button>
            <button
              onClick={handleQuizClick}
              className={`px-4 py-2 font-medium border rounded-lg ${
                selectedSection === "quiz"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {quizIsLoading ? "Loading..." : "Take Quiz"}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section - Made smaller (1/3 height of the top section) */}
      <div className="flex-1 p-4 border-t overflow-auto scrollbar-thin ">
        {selectedSection === "transcript" && (
          <Transcript data={transcriptData || data.transcript} />
        )}
        {selectedSection === "summary" && <Summary data={summaryData || data.summary} />}
        {selectedSection === "keyConcepts" && (
          <KeyConcepts data={keyConceptsData || data.keyConcepts} />
        )}
        {selectedSection === "quiz" && <Quiz data={qnaData || data.qnas} />}
      </div>
    </div>
  );
};

export default VideoDetails;
  