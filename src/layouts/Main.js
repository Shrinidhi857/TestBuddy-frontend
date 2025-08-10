import { useState, useEffect } from "react";
import Quizbox from "../components/Quizbox";
import Taketest from "./Taketest";
import Stat from "./Stats";
import QuizUploader from "../components/QuizUploader";
//import quizData from "../constants/quixlist";

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

  return (
    <div className="flex flex-col items-center mt-12  p-1 min-h-[calc(100vh-60px)] dark:bg-primary-dark">
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
                  className="dark: text-primary-light rounded-xl w-max h-max pl-3 pr-3 pt-2 pb-2 font-medium dark:bg-last-dark border-2 border-last-light mb-3"
                  onClick={handleQuizSubmit}
                >
                  Submit
                </button>
              </>
            );
          case "statpage":
            return <Stat props={quizData} selection={selection} />;
          default:
            return null;
        }
      })()}
    </div>
  );
}

export default Main;
