import { useState } from "react";

function Quizbox({ quiz, index, selection, setSelection }) {
  const number = index + 1; // display number
  const question = quiz.title;
  const options = quiz.options;
  const answer = quiz.answer;

  const [allow, setAllow] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  function handleClick(option) {
    if (allow) {
      setSelectedOption(option);
      const updated = [...selection];
      updated[index] = option;
      setSelection(updated);
      setAllow(false);
    }
  }

  function checkColor(option) {
    if (!selectedOption) return "white";
    if (option !== selectedOption && option !== answer) return "white";
    return option === answer ? "#B0FC38" : "#FF7081";
  }

  return (
    <div className="QuizBox">
      <div className="questionname">
        {number}) {question}
      </div>
      <ul>
        {options.map((option, idx) => {
          const label = String.fromCharCode(65 + idx);
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
