import React from "react";

const Quiz = (gotdata) => {
  console.log("The quiz data is :",gotdata.data)
  const data = gotdata.data
  return (
    <div>
      <h4 className="font-semibold text-lg">Take Quiz</h4>
      <div>
        <h5>Short Questions:</h5>
        {data?.shortQuestions?.length > 0 ? (
          data.shortQuestions.map((qna, index) => (
            <div key={index}>
              <p><strong>Q:</strong> {qna.question}</p>
              <p><strong>A:</strong> {qna.answer}</p>
            </div>
          ))
        ) : (
          <p>No short questions available.</p>
        )}
      </div>

      <div className="mt-4">
        <h5>MCQs:</h5>
        {data?.mcqs?.length > 0 ? (
          data.mcqs.map((mcq, index) => (
            <div key={index}>
              <p><strong>Q:</strong> {mcq.question}</p>
              <ul>
                {mcq.options.map((option, i) => (
                  <li key={i}>{option}</li>
                ))}
              </ul>
              <p><strong>Correct Answer:</strong> {mcq.correctAnswer}</p>
            </div>
          ))
        ) : (
          <p>No MCQs available.</p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
