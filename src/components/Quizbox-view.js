import clsx from "clsx"; // optional, but makes class handling cleaner

function QuizBoxView({ quiz, index }) {
  const number = index + 1;
  const question = quiz.title;
  const options = quiz.options;
  const answer = quiz.answer;

  function checkColor(option) {
    if (option !== answer) return "text-white";
    return "text-[#B0FC38]";
  }

  return (
    <div className="dark:bg-tertiary-dark border-2 border-last-dark rounded-xl p-6 m-2 w-1/2 sm:text-base">
      <div className="mt-2 mb-1 ml-1 font-semibold text-lg sm:text-base md:text-xl lg:text-xl dark: text-primary-light">
        {number}) {question}
      </div>
      <ul>
        {options.map((option, idx) => {
          const label = String.fromCharCode(65 + idx);
          return (
            <li
              key={option}
              className={clsx(
                "px-1 py-1 mb-1 rounded-xl cursor-pointer font-medium text-sm",
                "dark:bg-secondary-dark",
                checkColor(option)
              )}
            >
              {label}) {option}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default QuizBoxView;
