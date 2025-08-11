import { useState, useEffect } from "react";
import Quizbox from "../components/Quizbox";
import Taketest from "./Taketest";
import Stat from "./Stats";
import QuizUploader from "../components/QuizUploader";
import FlashCard from "../components/flashCard";
import flashCards from "../constants/flashCard-format";

function Main({ page, setPage }) {
  const [quizData, setQuizData] = useState(null);
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    if (quizData) {
      setSelection(new Array(quizData.length).fill(null));
    }
  }, [quizData]);

  function handleUpload() {
    console.log("file upload here");
  }

  function handleTaketest() {
    setPage("taketestpage");
  }

  function handleQuizSubmit() {
    for (let i = 0; i < selection.length; i++) {
      console.log(`Question ${i + 1}: Selected Option - ${selection[i]}`);
    }
    setPage("statpage");
  }

  const color = [
    { front: "bg-[#DA3F45]", back: "text-[#DCDEDF]" },
    { front: "bg-[#F6B750]", back: "text-[#1E2327]" },
    { front: "bg-[#061A74]", back: "text-[#B99F5D]" },
    { front: "bg-[#A21328]", back: "text-[#E9C576]" },
    { front: "bg-[#DC1B2E]", back: "text-[#DCDC30]" },
    { front: "bg-[#F9F9F9]", back: "text-[#169DCB]" },
    { front: "bg-[#E9B661]", back: "text-[#7E5072]" },
    { front: "bg-[#552E7D]", back: "text-[#FFB866]" },
    { front: "bg-[#211463]", back: "text-[#C95874]" },
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
              <div style={{ display: "flex" }}>
                <QuizUploader
                  setQuizData={setQuizData}
                  handleQuiz={handleTaketest}
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
                        front={card.front}
                        back={card.back}
                        bg={randomColor.front}
                        text={randomColor.back}
                      />
                    );
                  })}
              </>
            );

          default:
            return null;
        }
      })()}
    </div>
  );
}

export default Main;
