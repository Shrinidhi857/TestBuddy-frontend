import { useState } from "react";
import Quizbox from "../components/Quizbox";
import Taketest from "./Taketest";
function Main() {
  const [page, setPage] = useState("home");

  return (
    <div className="main">
      <Taketest />
      <Quizbox />
      <Quizbox />
      <Quizbox />
      <Quizbox />
      <Quizbox />
    </div>
  );
}

export default Main;
