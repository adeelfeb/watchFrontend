


import React, { useState, useEffect } from 'react';
import { MdContentCopy } from "react-icons/md"; // Import the icon
import ToastNotification from '../components/ToastNotification';

function KeyConcepts({ data }) {
  const [keyConcepts, setKeyConcepts] = useState(null);
  const [toastMessage, setToastMessage] = useState(""); // State for toast message
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    setKeyConcepts(data.keyconcept); // Safely update state
  }, [data]);
  

  const copyToClipboard = () => {
    if (keyConcepts === "No description Available For Now" || !keyConcepts) {
      setToastMessage("No key concept available to copy!"); // Show error message if no key concept
      setIsSuccess(false); // Set failure status to show red color
    } else {
      navigator.clipboard
        .writeText(keyConcepts)
        .then(() => {
          setToastMessage('Key Concept copied to clipboard!');
          setIsSuccess(true); // Set success status to show green color
        })
        .catch((err) => {
          setToastMessage('Failed to copy key concept');
          setIsSuccess(false); // Set failure status to show red color
        });
    }
  };

  if (!keyConcepts) {
    return <p>Loading key concepts...</p>; // Placeholder while loading
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-full mx-auto">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Key Concepts</h2>

      <div className="relative mb-4">
        {/* Copy icon positioned at the top right */}
        <button
          onClick={copyToClipboard}
          className="absolute top-0 right-0 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition flex items-center justify-center"
          title="Copy to Clipboard"
        >
          <MdContentCopy size={20} />
        </button>

        {/* Description box that occupies full width */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Description:</h3>
          <p className="text-gray-600">{keyConcepts}</p>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <ToastNotification
          message={toastMessage}
          duration={3000} // Display the toast for 3 seconds
          onClose={() => setToastMessage("")} // Clear toast message after it disappears
          position="right" // Toast appears on the right
          isSuccess={isSuccess}
        />
      )}
    </div>
  );
}

export default KeyConcepts;
