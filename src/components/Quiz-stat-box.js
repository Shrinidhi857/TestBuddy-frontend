function Quizstatbox({ quiz, index, selection }) {
  const number = index + 1; // display number
  const question = quiz.title;
  const options = quiz.options;
  const answer = quiz.answer;

  function checkColor(option, selectedOption) {
    if (!selectedOption) return "black";
    if (option !== selectedOption && option !== answer) return "black";
    return option === answer ? "green" : "red";
  }

  return (
    <div className="QuizBox">
      <h3>
        {number}) {question}
      </h3>
      <ul>
        {options.map((option, idx) => {
          const label = String.fromCharCode(65 + idx);
          return (
            <li
              key={option}
              style={{
                color: checkColor(option, selection),
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

export default Quizstatbox;
