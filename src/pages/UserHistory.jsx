import React from "react";
import { useState } from "react"; // For managing selected video state
import VideoDetails from "./VideoDetails";

const UserHistory = ({ data }) => {
  // Destructure the data prop to get the user's history
  const historyData = data || []; // Default to an empty array if no data is passed
  const [selectedVideo, setSelectedVideo] = useState(null); // State to store the selected video for details

  // Handle the click on "View Details"
  const handleViewDetails = (videoData) => {
    setSelectedVideo(videoData); // Set the selected video data
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow">
      {/* Display the user's history in a grid of smaller boxes */}
      {selectedVideo ? (
        <>
        {/* Back Button */}
        <button
          onClick={() => setSelectedVideo(null)} // Reset selected video
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          &lt; Back
        </button>
        {/* Show VideoDetails */}
        <VideoDetails data={selectedVideo} />
      </>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  ">
          {historyData.slice().reverse().map((videoData, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-all max-w-xs max-h-72 overflow-hidden"
              style={{ minHeight: "380px" }} // Ensure box height doesn't shrink below a threshold
            >
              <h4 className="text-lg font-semibold truncate">{videoData.title}</h4>
              <p className="text-sm text-gray-600 mb-2 truncate">Duration: {videoData.duration}</p>
              <p className="text-sm text-gray-500 mb-4 truncate">Date Watched: {videoData.dateWatched}</p>
              {/* Display a small preview or part of the video data */}
              <div className="flex justify-center items-center mb-4">
  {videoData.videoUrl ? (
    <img
      src={`https://img.youtube.com/vi/${new URLSearchParams(new URL(videoData.videoUrl).search).get("v")}/hqdefault.jpg`}
      alt="Video Thumbnail"
      className="w-full h-180 rounded-lg shadow-lg cursor-pointer"
      onClick={() => window.open(videoData.videoUrl, "_blank")} // Opens the video in a new tab
    />
  ) : (
    <p className="text-gray-500">No video available</p>
  )}
</div>

              {/* When the box is clicked, it will show the full details of the video */}
              <button
                onClick={() => handleViewDetails(videoData)}
                className="w-full px-4 py-2 mt-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
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
