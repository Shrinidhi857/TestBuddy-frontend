import { useState } from "react";
import clsx from "clsx";

function FlashCard({ front, back, bg, text }) {
  const [flip, setFlip] = useState(false);
  function toggleFlip() {
    setFlip((prev) => !prev);
  }

  return (
    <div
      className={clsx(
        "flex m-2 rounded-xl min-w-3/5 max-w-4/5 sm:text-base items-center justify-center min-h-40 max-h-60 overflow-auto px-10 border-2",
        bg,
        text
      )}
      onClick={toggleFlip}
    >
      {flip ? <div>{front}</div> : <div>{back}</div>}
    </div>
  );
}

export default FlashCard;
