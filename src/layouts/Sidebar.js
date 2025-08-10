// src/layouts/Sidebar.js
import "../index.css";
import QuizItem from "../components/Items"; // assuming file name is Items.js
import { useState } from "react";

function Sidebar({ curpage, setPage }) {
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
  function handleClickItem(page) {
    if (page !== curpage) setPage(page);
  }

  return (
    <div className="hidden sm:block fixed top-12 left-0 min-w-max dark:bg-secondary-dark dark:text-secondary-light  h-full p-0.5 overflow-auto  font-medium gap-2 p-3">
      <div
        className="flex pl-5 flex-col cursor-pointer m-0.5 border-2 border-secondary-dark duration-100 hover:shadow-[0_0_5px_#ffffff]  hover:border-secondary-light rounded-xl"
        onClick={() => handleClickItem("homepage")}
      >
        <h2>Home</h2>
      </div>
      <div className="flex pl-5 flex-col cursor-pointer m-0.5 border-2 border-secondary-dark duration-100 hover:shadow-[0_0_10px_#ffffff] rounded-xl p-3">
        <div onClick={() => showQuizList(!showQuiz)}>
          <h2>Quiz List</h2>
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
      <div className="flex pl-5 flex-col cursor-pointer m-0.5 border-2 border-secondary-dark duration-100 hover:shadow-[0_0_10px_#ffffff] rounded-xl">
        <h2>Logout</h2>
      </div>
    </div>
  );
}

export default Sidebar;
