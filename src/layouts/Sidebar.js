// src/layouts/Sidebar.js
import "../index.css";
import QuizItem from "../components/Items"; // assuming file name is Items.js
import { useState } from "react";

function Sidebar() {
  const quizList = [
    { no: 1, title: "Geography" },
    { no: 2, title: "History" },
    { no: 3, title: "Science" },
    { no: 4, title: "Math" },
  ];
  const [showQuiz, showQuizList] = useState(false);

  function handleShowStats(quiz) {
    console.log("Clicked quiz:", quiz);
  }

  return (
    <div className="sidebar">
      <div>
        <div
          onClick={() => showQuizList(!showQuiz)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            cursor: "pointer",
            marginBottom: "1rem",
          }}
        >
          <h2>Quiz List</h2>
          {showQuiz ? "▼" : "▶"}
        </div>
        <ul>
          {showQuiz
            ? quizList.map((quiz) => (
                <QuizItem
                  quiz={quiz}
                  key={quiz.no}
                  handleShowStats={() => handleShowStats(quiz)}
                />
              ))
            : null}
        </ul>
      </div>
      <div
        onClick={() => {}}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          cursor: "pointer",
          marginBottom: "1rem",
          margin: "10px",
        }}
      >
        <h2>Home</h2>
      </div>
    </div>
  );
}

export default Sidebar;
