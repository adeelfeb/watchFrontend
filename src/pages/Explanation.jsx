import React from "react";

const Explanation = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <h2 className="text-4xl font-extrabold text-blue-600 mb-6">
        Welcome to Video Details 🎥
      </h2>
      <p className="text-xl text-gray-800 mb-6">
        A place designed for students to explore educational content in a fun, interactive way!
      </p>
      <p className="text-lg text-gray-700 mb-4">
        Use the buttons on the left to navigate and:
      </p>
      <ul className="list-disc text-lg text-gray-700 mb-8">
        <li>✨ Get the transcript of the video</li>
        <li>✨ View a concise summary</li>
        <li>✨ Get keyconcepts</li>
        <li>✨ Take a quiz to test your knowledge</li>
        <li>✨ Check your quiz score after completion</li>
      </ul>
      <div className="w-24 h-24 animate-bounce mb-6 transform rotate-90">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className="text-indigo-600"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 5v14m7-7l-7 7-7-7" />
  </svg>
</div>

      <p className="text-md text-gray-500">
        Get ready for an educational adventure with personalized content, designed to help you learn at your own pace!
      </p>
    </div>
  );
};

export default Explanation;
