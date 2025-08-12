import React, { useState } from "react";

function FlashUploader({ setFlashData, handleFlash }) {
  const [file, setFile] = useState(null);
  const [numFlashCards, setNumFlashCards] = useState(5);
  const [flashData, setflashData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [textInput, setTextInput] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let text = "";

      if (file) {
        text = await file.text();
      } else if (textInput.trim()) {
        text = textInput;
      } else {
        alert("Please upload a file or enter text.");
        setLoading(false);
        return;
      }

      const prompt = `
Generate ${numFlashCards} flashcards from the text below.\nReturn in this JSON format only (no explanations, no markdown, no extra text):\n\n[\n  {\n    \"no\": 1,\n    \"front\": \"Question or prompt here\",\n    \"back\": \"Answer here\"\n  }\n]\n\nHere is the content:
"""${text}"""
    `;

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/flashCard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: prompt }),
      });

      if (!res.ok) {
        const errText = await res.text(); // Read the error body as text
        throw new Error(`Server error ${res.status}: ${errText}`);
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const textBody = await res.text();
        console.error("Server returned non-JSON:", textBody);
        throw new Error("Expected JSON but got non-JSON response");
      }

      const parsed = await res.json();
      setflashData(parsed);

      if (setFlashData) setFlashData(parsed);
      if (handleFlash) handleFlash();

      console.log("Flashdata set successfully:", parsed);
    } catch (error) {
      console.error("Error during upload:", error);
      alert(`Error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ml-10">
      <h1 className="text-xl font-bold mb-4 text-primary-light">
        FlashCards Generator
      </h1>

      <form onSubmit={handleUpload}>
        {/* File Upload */}
        <div className="flex flex-row font-medium font-xl items-center justify-center border-2 dark:border-tertiary-dark rounded-xl mt-2 mb-2 p-2 bg-secondary-dark text-primary-light gap-2">
          <label className="block font-medium">Upload File:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept=".txt,.pdf,.doc,.docx"
            className="block w-full p-2 border-2 border-last-dark rounded-xl"
          />
        </div>

        {/* OR Textarea Input */}
        <textarea
          rows="6"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Paste your text here if no file is uploaded..."
          className="flex min-h-20 w-full rounded-xl border-2 border-last-dark  dark:bg-secondary-dark dark:text-secondary-light p-2 hover:border-[#8fd9fb] active:border-[#8fd9fb]  "
        />

        {/* Number of Questions */}
        <div className="flex flex-row font-medium text-medium items-center justify-center border-2 rounded-xl mt-2 mb-2 p-1 bg-tertiary-dark text-secondary-light gap-2 border-last-dark">
          <label>Number of Flash Cards:</label>
          <input
            type="number"
            value={numFlashCards}
            onChange={(e) => setNumFlashCards(parseInt(e.target.value) || 1)}
            min="1"
            max="20"
            className="rounded-xl pt-1 pb-1 font-semibold  border-2 bg-secondary-dark text-secondary-light border-last-dark focus:border-[#8fd9fb] outline-none "
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="dark: text-primary-light rounded-xl w-max h-max pl-3 pr-3 pt-2 pb-2 font-medium dark:bg-tertiary-dark border-2 border-last-dark mb-3"
        >
          {loading ? "Generating Flashs..." : "Generate Cards"}
        </button>
      </form>
    </div>
  );
}

export default FlashUploader;
