import { useState } from "react";

function Quizbox() {
  const question =
    "Which of the following classes in Bootstrap is used to create a responsive, fixed-width container?";
  const options = [".container-fluid", ".container", ".row", ".col"];
  const answer = ".container";

  const [allow, setAllow] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  function handleClick(option) {
    if (allow) {
      setSelectedOption(option);
      setAllow(false); // Lock further clicks
    }
  }

  function checkColor(option) {
    if (!selectedOption) return "black";
    else if (option !== selectedOption && option !== answer) return "black";
    return option === answer ? "green" : "red";
  }

  return (
    <div className="QuizBox">
      <h3>{question}</h3>
      <ul>
        {options.map((option, index) => {
          const label = String.fromCharCode(65 + index);
          return (
            <li
              key={option}
              onClick={() => handleClick(option)}
              style={{
                color: checkColor(option),
                cursor: "pointer",
                listStyle: "none",
              }}
            >
              {label}) {option}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Quizbox;
