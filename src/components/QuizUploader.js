import React, { useState } from "react";

function QuizUploader({
  setQuizData: setParentQuizData,
  handleQuiz: handleQuizPage,
}) {
  const [file, setFile] = useState(null);
  const [numQuestions, setNumQuestions] = useState(5);
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [textInput, setTextInput] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault(); // ✅ Fix: Prevent default form submit behavior
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
Generate ${numQuestions} multiple-choice questions from the text below.
Return in this JSON format only (no explanations, no markdown, no extra text):

[
  {
    "no": 1,
    "title": "Question text here",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Option A"
  }
]

Here is the content:
"""${text}"""
      `;

      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAarZQf21RO5ByZtOV7XIBY6fRqfDlknZ4",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await res.json();
      const output = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

      try {
        const jsonStart = output.indexOf("[");
        const jsonEnd = output.lastIndexOf("]") + 1;

        if (jsonStart === -1 || jsonEnd === -1) {
          throw new Error("JSON brackets not found in response.");
        }

        const jsonString = output.substring(jsonStart, jsonEnd);
        const parsed = JSON.parse(jsonString);
        setQuizData(parsed);

        if (setParentQuizData) setParentQuizData(parsed);
        if (handleQuizPage) handleQuizPage();

        console.log("Quiz data set successfully:", parsed);
      } catch (parseError) {
        console.error("Failed to parse quiz data:", parseError);
        alert("Quiz format error. Try simplifying the input.");
      }
    } catch (error) {
      console.error("Error during upload:", error);
      alert("Error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ml-10">
      <h1 className="text-xl font-bold mb-4 text-primary-light">
        Quiz Generator
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
          <label>Number of Questions:</label>
          <input
            type="number"
            value={numQuestions}
            onChange={(e) => setNumQuestions(parseInt(e.target.value) || 1)}
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
          {loading ? "Generating Quiz..." : "Generate Quiz"}
        </button>
      </form>
    </div>
  );
}

export default QuizUploader;
