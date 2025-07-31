import "../index.css";
import Quizstatbox from "../components/Quiz-stat-box";

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
    <div>
      <div className="statbox-1">
        <h2>Quiz Result</h2>
        <div className="progress-container">
          <div
            className="progress-bar-correct"
            style={{ width: `${percent}%` }}
          >
            {percent}% Correct
          </div>
        </div>
        <div className="progress-container">
          <div
            className="progress-bar-wrong"
            style={{ width: `${100 - percent}%` }}
          >
            {100 - percent}% Wrong
          </div>
        </div>
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <span style={{ color: "green", marginRight: "15px" }}>
            ✅ Correct: {correct}
          </span>
          <span style={{ color: "red" }}>❌ Wrong: {wrong}</span>
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
