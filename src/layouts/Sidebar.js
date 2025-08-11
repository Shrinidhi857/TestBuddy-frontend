// src/layouts/Sidebar.js
import "../index.css";
import QuizItem from "../components/Items"; // assuming file name is Items.js
import { useState } from "react";
import trash from "../assets/trash.svg";

function Sidebar({ curpage, setPage }) {
  const [quizList, setquizList] = useState([]);
  const [showQuiz, showQuizList] = useState(false);

  function handleShowStats(quiz) {
    console.log("Clicked quiz:", quiz);
  }
  function handleClickItem(page) {
    if (page !== curpage) setPage(page);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setPage("login"); // or setIsLoggedIn(false);
  }

  async function getAllQuizes() {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/quiz/getAll", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // <-- add this header
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch quizzes");
    }

    const data = await res.json();
    return data;
  }

  return (
    <div className="hidden sm:block fixed top-12 left-0 min-w-max dark:bg-secondary-dark dark:text-secondary-light  h-full p-0.5 overflow-auto  font-medium gap-2 p-3">
      <div
        className="flex p-1 items-center  flex-col cursor-pointer m-0.5 border-2 border-secondary-dark duration-100 hover:shadow-[0_0_5px_#ffffff]  hover:border-secondary-light rounded-xl"
        onClick={() => handleClickItem("homepage")}
      >
        <h2>Home</h2>
      </div>
      <div className="flex  p-1 items-center  flex-col cursor-pointer m-0.5 border-2 border-secondary-dark duration-100 hover:shadow-[0_0_10px_#ffffff] rounded-xl ">
        <div
          onClick={async () => {
            showQuizList(!showQuiz);
            const quizzes = await getAllQuizes();
            setquizList(quizzes);
          }}
        >
          <h2>Quiz List</h2>
        </div>
        <div className="flex flex-row gap-4">
          <div className="w-3"></div>
          <ul className=" flex flex-col align-center">
            {showQuiz
              ? quizList.map((quiz) => (
                  <QuizItem
                    quiz={quiz.quizName}
                    key={quiz._id}
                    handleShowStats={() => handleShowStats(quiz)}
                  />
                ))
              : null}
          </ul>
        </div>
      </div>
      <div className="flex p-1 items-center flex-col cursor-pointer m-0.5 border-2 border-secondary-dark duration-100 hover:shadow-[0_0_10px_#ffffff] rounded-xl">
        <h2>FlashCards</h2>
      </div>
      <div
        className="flex p-1 items-center flex-col cursor-pointer m-0.5 border-2 border-secondary-dark duration-100 hover:shadow-[0_0_10px_#ffffff] rounded-xl"
        onClick={handleLogout}
      >
        <h2>Logout</h2>
      </div>
    </div>
  );
}

export default Sidebar;
