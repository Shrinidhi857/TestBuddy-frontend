// src/components/Items.js
import "../index.css";

function QuizItem({ quiz, handleShowStats }) {
  return (
    <div className="Item" onClick={handleShowStats}>
      {quiz.no}. {quiz.title}
    </div>
  );
}

export default QuizItem;
