import { useState } from "react";
import clsx from "clsx";

function FlashCard({ frontbg, fronttext, backbg, backtext, front, back }) {
  const [flip, setFlip] = useState(false);
  return (
    <div
      className="perspective-1000 w-80 h-48 m-4"
      onClick={() => setFlip((prev) => !prev)} // tap to flip on mobile/desktop
    >
      <div
        className={clsx(
          "relative w-full h-full flip-inner will-change-transform",
          flip && "rotate-y-180"
        )}
      >
        {/* FRONT */}
        <div
          className={clsx(
            "absolute inset-0 flex items-center justify-center rounded-xl border-2 font-bold backface-hidden p-4",
            frontbg,
            fronttext
          )}
        >
          {front}
        </div>

        {/* BACK */}
        <div
          className={clsx(
            "absolute inset-0 flex items-center justify-center rounded-xl border-2 font-bold backface-hidden flip-back p-4",
            backbg,
            backtext
          )}
        >
          {back}
        </div>
      </div>
    </div>
  );
}

export default FlashCard;
