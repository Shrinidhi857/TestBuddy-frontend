import { useState, useEffect } from "react";
import Quizbox from "../components/Quizbox";
import Taketest from "./Taketest";
import Stat from "./Stats";
import QuizUploader from "../components/QuizUploader";
import FlashCard from "../components/flashCard";
import flashCards from "../constants/flashCard-format";
import QuizView from "./QuizView";
import Homepage from "./Home";
import FlashUploader from "../components/FlashUpload";
import FlashResult from "./FlashResult";

function Main({
  page,
  setPage,
  quizView,
  setQuizView,
  flashView,
  setFlashView,
}) {
  const [quizData, setQuizData] = useState(null);
  const [flashData, setFlashData] = useState(null);

  const [selection, setSelection] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (quizData) {
      setSelection(new Array(quizData.length).fill(null));
    }
  }, [quizData]);

  function handleTaketest() {
    setPage("taketestpage");
  }
  function handleFlashtest() {
    setPage("flashCardStat");
  }

  function handleflashpage() {
    setPage("flashpage");
  }
  function handlequizpage() {
    setPage("quizpage");
  }

  function handleQuizSubmit() {
    for (let i = 0; i < selection.length; i++) {
      console.log(`Question ${i + 1}: Selected Option - ${selection[i]}`);
    }
    setPage("statpage");
  }

  const color = [
    {
      frontbg: "bg-[#DA3F45]",
      fronttext: "text-[#DCDEDF]",
      backtext: "text-[#DA3F45]",
      backbg: "bg-[#DCDEDF]",
    },
    {
      frontbg: "bg-[#F6B750]",
      fronttext: "text-[#1E2327]",
      backtext: "text-[#F6B750]",
      backbg: "bg-[#1E2327]",
    },
    {
      frontbg: "bg-[#061A74]",
      fronttext: "text-[#B99F5D]",
      backtext: "text-[#061A74]",
      backbg: "bg-[#B99F5D]",
    },
    {
      frontbg: "bg-[#A21328]",
      fronttext: "text-[#E9C576]",
      backtext: "text-[#A21328]",
      backbg: "bg-[#E9C576]",
    },
    {
      frontbg: "bg-[#DC1B2E]",
      fronttext: "text-[#DCDC30]",
      backtext: "text-[#DC1B2E]",
      backbg: "bg-[#DCDC30]",
    },
    {
      frontbg: "bg-[#F9F9F9]",
      fronttext: "text-[#169DCB]",
      backtext: "text-[#F9F9F9]",
      backbg: "bg-[#169DCB]",
    },
    {
      frontbg: "bg-[#E9B661]",
      fronttext: "text-[#7E5072]",
      backtext: "text-[#E9B661]",
      backbg: "bg-[#7E5072]",
    },
    {
      frontbg: "bg-[#552E7D]",
      fronttext: "text-[#FFB866]",
      backtext: "text-[#552E7D]",
      backbg: "bg-[#FFB866]",
    },
    {
      frontbg: "bg-[#211463]",
      fronttext: "text-[#C95874]",
      backtext: "text-[#211463]",
      backbg: "bg-[#C95874]",
    },
  ];

  function getRandomColor() {
    const index = Math.floor(Math.random() * color.length);
    return color[index];
  }

  return (
    <div className="flex flex-col items-center mt-12 p-1 min-h-[calc(100vh-60px)] dark:bg-primary-dark">
      {(() => {
        switch (page) {
          case "homepage":
            return (
              <Homepage
                handleQuizPage={handlequizpage}
                handleFlashPage={handleflashpage}
              />
            );

          case "quizpage":
            return (
              <div style={{ display: "flex" }}>
                <QuizUploader
                  setQuizData={setQuizData}
                  handleQuiz={handleTaketest}
                />
              </div>
            );
          case "flashpage":
            return (
              <div style={{ display: "flex" }}>
                <FlashUploader
                  setFlashData={setFlashData}
                  handleFlash={handleFlashtest}
                />
              </div>
            );

          case "taketestpage":
            return (
              <>
                {quizData &&
                  quizData.map((quiz, index) => (
                    <Quizbox
                      key={index}
                      index={index}
                      quiz={quiz}
                      selection={selection}
                      setSelection={setSelection}
                    />
                  ))}
                <button
                  className="text-primary-light rounded-xl w-max h-max pl-3 pr-3 pt-2 pb-2 font-medium dark:bg-last-dark border-2 border-last-light mb-3"
                  onClick={handleQuizSubmit}
                >
                  Submit
                </button>
              </>
            );

          case "statpage":
            return <Stat props={quizData} selection={selection} />;

          case "flashCard":
            return (
              <>
                {flashCards &&
                  flashCards.map((card, index) => {
                    const randomColor = getRandomColor();
                    return (
                      <FlashCard
                        key={index}
                        frontbg={randomColor.frontbg}
                        fronttext={randomColor.fronttext}
                        backbg={randomColor.backbg}
                        backtext={randomColor.backtext}
                        front={card.front}
                        back={card.back}
                      />
                    );
                  })}
              </>
            );

          case "flashCardStat":
            return <FlashResult props={flashData} />;

          case "quizview":
            return <QuizView quizView={quizView} />;

          default:
            return null;
        }
      })()}
    </div>
  );
}

export default Main;
