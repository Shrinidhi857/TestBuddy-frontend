import { useState } from "react";
import Quizbox from "../components/Quizbox";
import Taketest from "./Taketest";
import Stat from "./Stats";
import quizData from "../constants/quixlist";

function Main() {
  const [page, setPage] = useState("homepage");
  const [selection, setSelection] = useState(
    new Array(quizData.length).fill(null)
  );

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
              <Taketest uploadpdf={handleUpload} clicktest={handleTaketest} />
            );
          case "taketestpage":
            return (
              <>
                {quizData.map((quiz, index) => (
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
