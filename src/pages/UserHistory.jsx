// import React, {useEffect} from "react";
// import { useState } from "react"; // For managing selected video state
// import VideoDetails from "./VideoDetails";
// import { setUserHistory } from "../store/currentVideoSlice";

// const UserHistory = ({ data }) => {
//   // Destructure the data prop to get the user's history
//   const historyData = data || []; // Default to an empty array if no data is passed
//   const [selectedVideo, setSelectedVideo] = useState(null); // State to store the selected video for details

//   // Handle the click on "View Details"
//   const handleViewDetails = (videoData) => {
//     setSelectedVideo(videoData); // Set the selected video data
//   };

//   useEffect(() => {
//     const fetchHistory = async () => {
//         const historyResponse = await videoService.getUserHistory();
       

//         if (historyResponse.success) {
//             setUserHistory(historyResponse.data);
//         } else {
//             console.error(historyResponse.message);
//             alert(historyResponse.message);
//         }
//     };

//     fetchHistory();
// }, []);


//   return (
//     <div className="p-2 bg-gray-100 rounded-lg shadow ">
//       {/* Display the user's history in a grid of smaller boxes */}
//       {selectedVideo ? (
//         <>
//         {/* Back Button */}
//         <button
//           onClick={() => setSelectedVideo(null)} // Reset selected video
//           className="mb-2  ml-4 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 "
//         >
//           &lt; Back
//         </button>
//         {/* Show VideoDetails */}
//         <VideoDetails data={selectedVideo} />
//       </>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  ">
//           {historyData.slice().reverse().map((videoData, index) => (
//            <div
//            key={index}
//            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-all max-w-xl overflow-hidden"
//          >
//            <h4 className="font-semibold truncate">{videoData.title}</h4>
//            <p className="text-sm font-semibold text-gray-600 mt-2 truncate">Duration: {videoData.duration}</p>
//            <p className="text-sm font-semibold text-gray-600 mb-2 truncate">Watched: {new Date(videoData.createdAt).toLocaleString()}</p>
//            {/* Display a small preview or part of the video data */}
//            <div className="flex font-semibold justify-center items-center mb-4">
//              {/* Additional content goes here */}

//   {videoData.thumbnailUrl ? (
//   <img
//     src={videoData.thumbnailUrl}
//     alt="Video Thumbnail"
//     className="w-full h-full  shadow-lg cursor-pointer object-cover"
//     style={{ display: 'block' }} // Removes extra space caused by default inline-block behavior
//     onClick={() => window.open(videoData.videoUrl, "_blank")} // Opens the video in a new tab
//   />
// ) : (
//   <p className="text-gray-500">No thumbnail available</p>
// )}

// </div>

//               {/* When the box is clicked, it will show the full details of the video */}
//               <button
//                 onClick={() => handleViewDetails(videoData)}
//                 className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
//               >
//                 View Details
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserHistory;

















import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux"; // Assuming you are using Redux for dispatch
import { setUserHistory } from "../store/currentVideoSlice";
import videoService from "../AserverAuth/config";
import VideoDetails from "./VideoDetails";

const UserHistory = ({ data }) => {
  const [selectedVideo, setSelectedVideo] = useState(null); // State to store the selected video for details
  const dispatch = useDispatch(); // Dispatch function for Redux

  // Handle the click on "View Details"
  const handleViewDetails = (videoData) => {
    setSelectedVideo(videoData); // Set the selected video data
  };

  useEffect(() => {
    // Fetch user history on initial render
    const fetchHistory = async () => {
      try {
        const response = await videoService.getUserHistory(); // Fetch user history using videoService
        console.log("User history after fetching is:", response);
        dispatch(setUserHistory(response.data)); // Dispatch action to set history in Redux
      } catch (error) {
        console.error("Error fetching user history:", error);
      }
    };

    fetchHistory();
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      {/* Display the user's history in a grid of smaller boxes */}
      {selectedVideo ? (
        <>
          {/* Back Button */}
          <button
            onClick={() => setSelectedVideo(null)} // Reset selected video
            className="mb-4 ml-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all ease-in-out transform hover:scale-105"
          >
            &lt; Back
          </button>
          {/* Show VideoDetails */}
          <VideoDetails data={selectedVideo} />
        </>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-gray-50 p-4 rounded-lg shadow-md">
          {data.slice().reverse().map((videoData, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all ease-in-out transform hover:scale-105 hover:bg-gray-100 border-2 border-gray-200"
            >
              <h4 className="font-semibold text-lg text-gray-800 truncate">{videoData.title}</h4>
              <p className="text-sm text-gray-600 mt-2 truncate">Duration: {videoData.duration}</p>
              <p className="text-sm text-gray-600 mb-2 truncate">Watched: {new Date(videoData.createdAt).toLocaleString()}</p>

              {/* Display a small preview or part of the video data */}
              <div className="flex justify-center items-center mb-4">
                {videoData.thumbnailUrl ? (
                  <img
                    src={videoData.thumbnailUrl}
                    alt="Video Thumbnail"
                    className="w-full h-full object-cover rounded-lg shadow-md cursor-pointer"
                    onClick={() => window.open(videoData.videoUrl, "_blank")} // Opens the video in a new tab
                  />
                ) : (
                  <p className="text-gray-500">No thumbnail available</p>
                )}
              </div>

              {/* When the box is clicked, it will show the full details of the video */}
              <button
                onClick={() => handleViewDetails(videoData)}
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all ease-in-out"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserHistory;
