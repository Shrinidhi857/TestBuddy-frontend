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
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyD1_28vu9n-Fn4YfcKdXL7E3AvjuW2pb0c",
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
    <div>
      <h1 className="text-xl font-bold mb-4">Quiz Generator</h1>

      <form onSubmit={handleUpload}>
        {/* File Upload */}
        <div className="number-compo">
          <label className="block font-medium">Upload File:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept=".txt,.pdf,.doc,.docx"
            className="block w-full p-2 border border-gray-400 rounded"
          />
        </div>

        {/* OR Textarea Input */}
        <div>
          <textarea
            rows="6"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Paste your text here if no file is uploaded..."
            className="input-form"
          />
        </div>

        {/* Number of Questions */}
        <div className="number-compo">
          <label>Number of Questions:</label>
          <input
            type="number"
            value={numQuestions}
            onChange={(e) => setNumQuestions(parseInt(e.target.value) || 1)}
            min="1"
            max="20"
            className="number-box"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg"
        >
          {loading ? "Generating Quiz..." : "Generate Quiz"}
        </button>
      </form>
    </div>
  );
}

export default QuizUploader;
