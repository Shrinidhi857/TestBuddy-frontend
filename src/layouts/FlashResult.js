import "../index.css";
import Quizstatbox from "../components/Quiz-stat-box";
import clsx from "clsx"; // optional, but makes class handling cleaner
import { useState } from "react";
import FlashCard from "../components/flashCard";

function FlashResult({ props }) {
  const [textInput, setTextInput] = useState("");

  const color = [
    {
      frontbg: "bg-[#DA3F45]",
      fronttext: "text-[#DCDEDF]",
      backtext: "text-[#DA3F45]",
      backbg: "bg-[#DCDEDF]",
    },
    {
      frontbg: "bg-[#F6B750]",
      fronttext: "text-[#1E2327]",
      backtext: "text-[#F6B750]",
      backbg: "bg-[#1E2327]",
    },
    {
      frontbg: "bg-[#061A74]",
      fronttext: "text-[#B99F5D]",
      backtext: "text-[#061A74]",
      backbg: "bg-[#B99F5D]",
    },
    {
      frontbg: "bg-[#A21328]",
      fronttext: "text-[#E9C576]",
      backtext: "text-[#A21328]",
      backbg: "bg-[#E9C576]",
    },
    {
      frontbg: "bg-[#DC1B2E]",
      fronttext: "text-[#DCDC30]",
      backtext: "text-[#DC1B2E]",
      backbg: "bg-[#DCDC30]",
    },
    {
      frontbg: "bg-[#F9F9F9]",
      fronttext: "text-[#169DCB]",
      backtext: "text-[#F9F9F9]",
      backbg: "bg-[#169DCB]",
    },
    {
      frontbg: "bg-[#E9B661]",
      fronttext: "text-[#7E5072]",
      backtext: "text-[#E9B661]",
      backbg: "bg-[#7E5072]",
    },
    {
      frontbg: "bg-[#552E7D]",
      fronttext: "text-[#FFB866]",
      backtext: "text-[#552E7D]",
      backbg: "bg-[#FFB866]",
    },
    {
      frontbg: "bg-[#211463]",
      fronttext: "text-[#C95874]",
      backtext: "text-[#211463]",
      backbg: "bg-[#C95874]",
    },
  ];

  function getRandomColor() {
    const index = Math.floor(Math.random() * color.length);
    return color[index];
  }

  async function saveFlash() {
    if (textInput === "") return;
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/flashCard/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // <-- add this header
      },
      body: JSON.stringify({
        flashgroupName: textInput,
        flashCards: props,
      }),
    });

    if (!res.ok) {
      alert("not saved");
    }

    const data = await res.json();
    alert("saved !");
    return data;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="dark:bg-last-dark border-2 dark:border-last-light rounded-xl p-8 m-2">
        <h2 className="text-xl font-bold dark:text-primary-light">
          FlashCards
        </h2>

        <form className="flex felx-row justify-center mt-3 gap-2">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Enter name"
            className="rounded-sm bg-tertiary-light text-secondary-dark  border-3 border-secondary-light "
          />
          <button
            className="border-2 bg-gradient-to-r from-[#81c784] to-[#b0fc38] border-[#cefc86] px-3 py-0.5 font-semibold text-md text-primary-light rounded-md"
            onClick={() => saveFlash()}
          >
            save
          </button>
        </form>
      </div>

      {props &&
        props.map((card, index) => {
          const randomColor = getRandomColor();
          return (
            <FlashCard
              key={index}
              frontbg={randomColor.frontbg}
              fronttext={randomColor.fronttext}
              backbg={randomColor.backbg}
              backtext={randomColor.backtext}
              front={card.front}
              back={card.back}
            />
          );
        })}
    </div>
  );
}

export default FlashResult;
