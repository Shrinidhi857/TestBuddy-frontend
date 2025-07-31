import { useState } from "react";
import Quizbox from "../components/Quizbox";
import Taketest from "./Taketest";
function Main() {
  const [page, setPage] = useState("homepage");

  function handleUpload() {
    console.log("file upload here");
  }

  function handleTaketest() {
    console.log("take test");
    setPage("taketestpage");
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
                <Quizbox />
                <Quizbox />
                <Quizbox />
                <Quizbox />
                <Quizbox />
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
