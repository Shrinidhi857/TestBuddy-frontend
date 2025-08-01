import React, { useState } from "react";

function QuizUploader({
  setQuizData: setParentQuizData,
  handleQuiz: handleQuizPage,
}) {
  const [file, setFile] = useState(null);
  const [numQuestions, setNumQuestions] = useState(5);
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setLoading(true);

    try {
      const text = await file.text();
      console.log("Text extracted from file");

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
        console.log("Raw JSON string:", jsonString);

        const parsed = JSON.parse(jsonString);
        setQuizData(parsed);

        if (setParentQuizData) {
          setParentQuizData(parsed);
        }
        if (handleQuizPage) {
          handleQuizPage();
        }

        console.log("Quiz data set successfully:", parsed);
      } catch (parseError) {
        console.error("Failed to parse quiz data:", parseError);
        alert(
          "Failed to parse quiz. The AI response might not be in the expected format."
        );
      }
    } catch (error) {
      console.error("Error during upload:", error);
      alert("An error occurred while generating the quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quizinputbox">
      <h1 className="text-2xl font-bold mb-4">Quiz Generator</h1>

      <div className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium">Upload File:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-sm text-gray-300 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer focus:outline-none"
            accept=".txt,.pdf,.doc,.docx"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Number of Questions:
          </label>
          <input
            type="number"
            value={numQuestions}
            onChange={(e) => setNumQuestions(parseInt(e.target.value) || 1)}
            placeholder="Number of Questions"
            min="1"
            max="20"
            className="block w-full p-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          {loading ? "Generating Quiz..." : "Generate Quiz"}
        </button>
      </div>
    </div>
  );
}

export default QuizUploader;
