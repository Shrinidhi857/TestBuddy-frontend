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
    <div className="main">
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
                <button onClick={handleQuizSubmit}>Submit</button>
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
