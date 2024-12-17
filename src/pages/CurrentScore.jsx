import React, { useState } from 'react';
import { FaClipboardList, FaPen, FaQuestionCircle } from 'react-icons/fa'; // Icons from react-icons

// Sample helper function to simulate fetching scores and quiz data related to LLM
const getCurrentScores = () => {
  return {
    mcqScore: 85, // Example MCQ score
    fillInTheBlanksScore: 92, // Example Fill-in-the-Blanks score
    shortQuestionsScore: 78, // Example Short Questions score
    quizTaken: [
      // MCQs
      {
        question: "What does LLM stand for in AI?",
        userAnswer: "Large Learning Model",
        correctAnswer: "Large Language Model",
      },
      {
        question: "Which of the following is a famous Large Language Model?",
        userAnswer: "BERT",
        correctAnswer: "GPT-3",
      },
      {
        question: "What is the main purpose of LLMs?",
        userAnswer: "Image recognition",
        correctAnswer: "Natural language understanding and generation",
      },

      // Fill-in-the-Blanks
      {
        question: "LLMs are based on ______ networks.",
        userAnswer: "Convolutional",
        correctAnswer: "Transformer",
      },
      {
        question: "_________ is a popular LLM developed by OpenAI.",
        userAnswer: "GPT-2",
        correctAnswer: "GPT-3",
      },

      // Short Questions
      {
        question: "Explain in one sentence what a transformer network is.",
        userAnswer: "A network for image classification.",
        correctAnswer: "A network architecture designed for sequence-to-sequence tasks, such as language modeling.",
      },
    ],
  };
};

const CurrentScore = () => {
  const [scores, setScores] = useState({
    mcqScore: null,
    fillInTheBlanksScore: null,
    shortQuestionsScore: null,
    quizTaken: [],
  });

  const handleGetScores = () => {
    const {
      mcqScore,
      fillInTheBlanksScore,
      shortQuestionsScore,
      quizTaken,
    } = getCurrentScores();
    setScores({
      mcqScore,
      fillInTheBlanksScore,
      shortQuestionsScore,
      quizTaken,
    });
  };

  const calculatePercentage = (correct, total) => {
    return ((correct / total) * 100).toFixed(2);
  };

  const getQuizResults = () => {
    const totalQuestions = scores.quizTaken.length;
    const correctAnswers = scores.quizTaken.filter(
      (q) => q.userAnswer === q.correctAnswer
    ).length;

    return {
      totalQuestions,
      correctAnswers,
      percentage: calculatePercentage(correctAnswers, totalQuestions),
    };
  };

  const { totalQuestions, correctAnswers, percentage } = getQuizResults();

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-extrabold text-center text-indigo-600 mb-6 animate__animated animate__fadeIn">
        Your Current Scores
      </h2>

      <div className="space-y-6">
        {scores.mcqScore === null ? (
          <p className="text-lg text-gray-700 text-center mb-4">
            Click the button below to fetch your current scores.
          </p>
        ) : (
          <>
            <div className="flex items-center space-x-3">
              <FaClipboardList className="text-indigo-600 text-3xl animate__animated animate__fadeIn" />
              <p className="text-xl font-semibold text-green-600 mb-2 animate__animated animate__fadeIn">
                MCQ Score: <span className="font-bold">{scores.mcqScore}%</span>
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <FaPen className="text-indigo-600 text-3xl animate__animated animate__fadeIn" />
              <p className="text-xl font-semibold text-green-600 mb-2 animate__animated animate__fadeIn">
                Fill-in-the-Blanks Score: <span className="font-bold">{scores.fillInTheBlanksScore}%</span>
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <FaQuestionCircle className="text-indigo-600 text-3xl animate__animated animate__fadeIn" />
              <p className="text-xl font-semibold text-green-600 mb-2 animate__animated animate__fadeIn">
                Short Questions Score: <span className="font-bold">{scores.shortQuestionsScore}%</span>
              </p>
            </div>
          </>
        )}
      </div>

      <div className="my-8 space-y-4">
        <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Quiz Results</h3>
        <p className="text-xl font-medium text-gray-700">
          Total Questions: {totalQuestions}
        </p>
        <p className="text-xl font-medium text-green-600">
          Correct Answers: {correctAnswers}
        </p>
        <p className="text-xl font-medium text-blue-600">
          Percentage: {percentage}%
        </p>

        <div className="mt-6 space-y-4">
          <h4 className="text-xl font-semibold text-indigo-600">Your Answers:</h4>
          {scores.quizTaken.map((quiz, index) => (
            <div key={index} className="space-y-2">
              <p className="text-lg text-gray-800">{quiz.question}</p>
              <p className="text-md text-gray-600">
                <strong>Your Answer:</strong> {quiz.userAnswer}
              </p>
              <p className="text-md text-gray-500">
                <strong>Correct Answer:</strong> {quiz.correctAnswer}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleGetScores}
          className="px-8 py-4 font-medium text-white bg-blue-500 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105"
        >
          Get Current Scores
        </button>
      </div>
    </div>
  );
};

export default CurrentScore;
