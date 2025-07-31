// src/components/Items.js
import "../index.css";

function QuizItem({ quiz, handleShowStats }) {
  return (
    <h3 className="Item" onClick={handleShowStats}>
      {quiz.no}. {quiz.title}
    </h3>
  );
}

export default QuizItem;
