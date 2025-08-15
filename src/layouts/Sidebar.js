// src/layouts/Sidebar.js
import "../index.css";
import QuizItem from "../components/Items"; // assuming file name is Items.js
import { useState } from "react";
import FlashItem from "../components/flashItem";
import EmptyItem from "../components/emptyItem";

function Sidebar({
  curpage,
  setPage,
  quizView,
  setQuizView,
  flashView,
  setFlashView,
}) {
  const [quizList, setquizList] = useState([]);
  const [showQuiz, showQuizList] = useState(true);
  const [flashList, setflashList] = useState([]);
  const [showFlash, setshowFlash] = useState(true);
  const [loadflash, setLoadflash] = useState(false);
  const [loadqQuiz, setLoadQuiz] = useState(false);

  function handleQuizView(quiz) {
    const selectedQuiz = quiz.quizes;
    setQuizView(selectedQuiz);
    setPage("quizview");
    console.log("Clicked quiz:", quiz);
  }

  function handleFlashView(flash) {
    setFlashView(flash);
    setPage("flashCard");
    console.log("Clicked Flash:", flash);
  }

  function handleClickItem(page) {
    if (page !== curpage) setPage(page);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setPage("login"); // or setIsLoggedIn(false);
  }

  async function handleDeleteFlashCard(currFlashCardName) {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "https://testbuddy-backend-lag4.onrender.com/api/flashCard/deleteParticular",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // <-- add this header
        },
        body: JSON.stringify({
          flashgroupName: currFlashCardName,
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch FlashCards");
    }
    setflashList((prev) =>
      prev.filter((flashCard) => flashCard.flashGroupName !== currFlashCardName)
    );
    const data = await res.json();
    console.log(`deleted quiz : ${data}`);
  }

  async function getAllFlashCards() {
    setLoadflash(true);

    const token = localStorage.getItem("token");

    const res = await fetch(
      "https://testbuddy-backend-lag4.onrender.com/api/flashCard/getAll",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // <-- add this header
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch quizzes");
    }

    const data = await res.json();
    setLoadflash(false);

    return data;
  }

  async function handleDeleteQuiz(currQuizName) {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "https://testbuddy-backend-lag4.onrender.com/api/quiz/deleteParticular",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // <-- add this header
        },
        body: JSON.stringify({
          quizName: currQuizName,
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch quizzes");
    }
    setquizList((prev) =>
      prev.filter((quiz) => quiz.quizName !== currQuizName)
    );
    const data = await res.json();
    console.log(`deleted quiz : ${data}`);
  }

  async function getAllQuizes() {
    setLoadQuiz(true);

    const token = localStorage.getItem("token");

    const res = await fetch(
      "https://testbuddy-backend-lag4.onrender.com/api/quiz/getAll",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // <-- add this header
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch quizzes");
    }

    const data = await res.json();
    setLoadQuiz(false);

    return data;
  }

  return (
    <div className="hidden sm:block fixed top-12 left-0 min-w-max dark:bg-secondary-dark dark:text-secondary-light  h-full p-0.5 overflow-auto  font-medium gap-2 p-3 z-30">
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
          {(!loadqQuiz && <h2>Quiz List</h2>) || (
            <div className="flex flex-row justify-center">
              <div className="w-6 h-6 border-4 border-secondary-light border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        <div className="flex flex-row gap-4">
          <div className="w-3"></div>
          {!loadqQuiz && (
            <ul className=" flex flex-col align-center">
              {showQuiz ? (
                quizList.length > 0 ? (
                  quizList.map((quiz) => (
                    <QuizItem
                      quiz={quiz.quizName}
                      key={quiz._id}
                      handleShowStats={() => handleQuizView(quiz)}
                      handleDelete={() => handleDeleteQuiz(quiz.quizName)}
                    />
                  ))
                ) : (
                  <EmptyItem />
                )
              ) : null}
            </ul>
          )}
        </div>
      </div>
      <div className="flex p-1 items-center flex-col cursor-pointer m-0.5 border-2 border-secondary-dark duration-100 hover:shadow-[0_0_10px_#ffffff] rounded-xl">
        <div
          onClick={async () => {
            setshowFlash(!showFlash);
            const flashCards = await getAllFlashCards();

            setflashList(flashCards);
          }}
        >
          {(!loadflash && <h2>FlashCard</h2>) || (
            <div className="flex flex-row justify-center">
              <div className="w-6 h-6 border-4 border-secondary-light border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        <div className="flex flex-row gap-4">
          <div className="w-3"></div>
          {!loadflash && (
            <ul className=" flex flex-col align-center">
              {showFlash ? (
                flashList.length > 0 ? (
                  flashList.map((flash) => (
                    <FlashItem
                      flashGroupName={flash.flashGroupName}
                      key={flash._id}
                      handleShowStats={() => handleFlashView(flash)}
                      handleDelete={() =>
                        handleDeleteFlashCard(flash.flashGroupName)
                      }
                    />
                  ))
                ) : (
                  <EmptyItem />
                )
              ) : null}
            </ul>
          )}
        </div>
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
