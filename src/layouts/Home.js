import quizImage from "../assets/quizImage.png";
import flashImage from "../assets/flashImage.png";

function Homepage() {
  return (
    <div className="flex  items-center mt-12  ml-40 p-1 min-h-[calc(100vh-60px)] dark:bg-primary-dark flex-row">
      <div className=" border-2 border-white flex flex-col">
        <img src={quizImage} className="" />
        <div>Ai Quiz Generator</div>
      </div>
      <div>
        <img src={flashImage} />
      </div>
    </div>
  );
}

export default Homepage;
