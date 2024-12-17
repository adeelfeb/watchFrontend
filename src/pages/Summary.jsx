
import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md"; // Import the copy icon
import ToastNotification from "../components/ToastNotification"; // Import your ToastNotification component

const Summary = (data) => {
  const { english, original } = data.data;

  const [selectedLanguage, setSelectedLanguage] = useState("english"); // State to toggle language
  const [toastMessage, setToastMessage] = useState(""); // State to manage toast message visibility
  const summaryText = selectedLanguage === "english" ? english : original;
  const [isSuccess, setIsSuccess] = useState(true);
  
  const handleCopy = () => {
    if (summaryText.trim() === "NA") {
      setToastMessage("No summary available to copy!"); // Show error message if no summary available
      setIsSuccess(false);
    } else {
      navigator.clipboard.writeText(summaryText);
      setToastMessage(`Summary Copied to clipboard`); // Show the toast message when copied
      setIsSuccess(true);
    }
  };

  return (
    <div className="min-w-[250px] max-w-[80vw] mx-auto">
      {/* Copy button with icon */}
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
          onClick={handleCopy}
        >
          {/* Using MdContentCopy from react-icons */}
          <MdContentCopy size={20} />
        </button>
      </div>

      {/* Summary Text Display */}
      <div className="bg-white p-2 rounded-md border">
        <p>
          <strong>{selectedLanguage === "english" ? "English" : "Original"} Summary:</strong>
        </p>
        <p>{summaryText || "Not yet provided"}</p>
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

export default Summary;
