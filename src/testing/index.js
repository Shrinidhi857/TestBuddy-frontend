// index.js
import fetch from "node-fetch";

const API_KEY = "AIzaSyD1_28vu9n-Fn4YfcKdXL7E3AvjuW2pb0c"; // Replace with your actual key
const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const body = {
  contents: [
    {
      parts: [
        {
          text: "Explain how AI works in a few words",
        },
      ],
    },
  ],
};

fetch(endpoint, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
})
  .then((res) => res.json())
  .then((data) => {
    console.log("Response:", JSON.stringify(data, null, 2));
  })
  .catch((err) => {
    console.error("Error:", err);
  });
