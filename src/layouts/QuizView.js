import { useState } from "react";

import QuizBoxView from "../components/Quizbox-view";

function QuizView({ quizView }) {
  return (
    <div className="flex flex-col items-center mt-12 p-1 min-h-[calc(100vh-60px)] dark:bg-primary-dark">
      {quizView &&
        quizView.map((quiz, index) => (
          <QuizBoxView key={index} index={index} quiz={quiz} />
        ))}
    </div>
  );
}

export default QuizView;
