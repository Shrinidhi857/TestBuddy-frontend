import "../index.css";
import Quizstatbox from "../components/Quiz-stat-box";
import clsx from "clsx"; // optional, but makes class handling cleaner

function Stats({ props, selection }) {
  // Calculate correct and wrong answers
  let correct = 0;
  let wrong = 0;

  for (let i = 0; i < props.length; i++) {
    if (selection[i] === props[i].answer) correct++;
    else wrong++;
  }

  // Calculate percentage of correct answers
  const percent = Math.round((correct / props.length) * 100);

  return (
    <div className="flex flex-col items-center">
      <div className="dark:bg-last-dark border-2 dark:border-last-light rounded-xl p-4 m-2 w-1/2 h-1/2">
        <h2 className="text-xl font-bold dark:text-primary-light">
          Quiz Result
        </h2>
        <div className="w-50 h-max  bg-secondary-light rounded-xl overflow-hidden m-3 border-2 dark: border-tertiary-light">
          <div
            className="h-full w-0  bg-gradient-to-r from-[#81c784] to-[#b0fc38] text-center leading-[25px] text-white text-[14px] transition-all duration-500 ease-in-out"
            style={{ width: `${percent}%` }}
          >
            {percent}% Correct
          </div>
        </div>
        <div className="w-50 h-max  bg-secondary-light rounded-xl overflow-hidden m-3 border-2 dark: border-tertiary-light">
          <div
            className="h-full w-0  bg-gradient-to-r from-[##ad3838] to-[##ff7081] text-center leading-[25px] text-white text-[14px] transition-all duration-500 ease-in-out"
            style={{ width: `${100 - percent}%` }}
          >
            {100 - percent}% Wrong
          </div>
        </div>
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <span style={{ color: "#B0FC38", marginRight: "15px" }}>
            ✅ Correct: {correct}
          </span>
          <span style={{ color: "#FF7081" }}>❌ Wrong: {wrong}</span>
        </div>
      </div>
      <div>
        {props.map((quiz, index) => (
          <Quizstatbox
            key={index}
            index={index}
            quiz={quiz}
            selection={selection[index]}
          />
        ))}
      </div>
    </div>
  );
}

export default Stats;
