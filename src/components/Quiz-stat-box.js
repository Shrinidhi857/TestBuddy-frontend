function Quizstatbox({ quiz, index, selection }) {
  const number = index + 1; // display number
  const question = quiz.title;
  const options = quiz.options;
  const answer = quiz.answer;

  function checkColor(option, selectedOption) {
    if (!selectedOption) return "#ffff";
    if (option !== selectedOption && option !== answer) return "#ffff";
    return option === answer ? "#B0FC38" : "#FF7081";
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
