import quizImage from "../assets/quizImage.png";
import flashImage from "../assets/flashImage.png";

function Homepage({ handleQuizPage, handleFlashPage }) {
  return (
    <div className="flex flex-col mt-20 gap-10 w-full">
      <div className="flex justify-center">
        <h1 className="text-primary-light font-bold text-5xl">TestBuddy</h1>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-10 px-6 min-h-[calc(100vh-200px)] dark:bg-primary-dark">
        <div
          className="bg-secondary-dark text-xl border-2 border-white flex flex-col text-primary-light rounded-xl overflow-hidden font-bold w-full sm:w-64 md:w-72 lg:w-80 max-w-xs"
          onClick={() => handleQuizPage()}
        >
          <div className="relative">
            <img
              src={quizImage}
              className="rounded-t-xl w-full h-auto"
              alt="quiz"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-xl"></div>
          </div>
          <div className="mb-2 mt-2 px-3">Ai Quiz Generator</div>
          <p className="text-sm px-3 mb-3">
            Upload the pdf and get the free Quizes based on the topics
          </p>
        </div>

        <div
          className="bg-secondary-dark text-xl border-2 border-white flex flex-col text-primary-light rounded-xl overflow-hidden font-bold w-full sm:w-64 md:w-72 lg:w-80 max-w-xs"
          onClick={() => handleFlashPage()}
        >
          <div className="relative">
            <img
              src={flashImage}
              className="rounded-t-xl w-full h-auto"
              alt="flashcards"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-xl"></div>
          </div>
          <div className="mb-2 mt-2 px-3">Ai FlashCard Generator</div>
          <p className="text-sm px-3 mb-3">
            Upload the pdf and get the free FlashCards based on the topics
          </p>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
