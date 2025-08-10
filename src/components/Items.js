// src/components/Items.js
import "../index.css";

function QuizItem({ quiz, handleShowStats }) {
  return (
    <h3
      className="dark:bg-primary-dark  rounded-md p-1 text-secondary-light m-0.5 w-full   "
      onClick={handleShowStats}
    >
      {quiz.no}. {quiz.title}
    </h3>
  );
}

export default QuizItem;
