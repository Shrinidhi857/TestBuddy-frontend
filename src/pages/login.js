import googleIcon from "../assets/google.svg";
import githubIcon from "../assets/github.svg";
import { useState } from "react";

function Login({ onLoginSuccess, onSwitchToRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onLoginSuccess(); // ✅ tells App.js we're logged in
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black">
      <div className="max-w-sm mx-auto bg-gray-300 rounded-xl overflow-hidden shadow-lg p-6">
        <div className="w-max h-max h-full rounded-2xl z-10 flex flex-col items-center justify-start pt-10 gap-5">
          <h1 className="text-2xl text-black font-bold">Welcome Back</h1>
          <form
            className="gap-5 flex flex-col w-full px-4"
            onSubmit={handleLogin}
          >
            <input
              type="text"
              className="border-2 border-gray-500 rounded-xl text-xl p-2 text-black"
              placeholder="Username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              className="border-2 border-gray-500 rounded-xl text-xl p-2 text-black"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="border-2 border-gray-500 rounded-xl p-2 text-black font-semibold"
              type="submit"
            >
              <div className="flex flex-row gap-2  justify-center">Submit</div>
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="flex flex-row justify-evenly">
              <button className="border-2 border-gray-500 rounded-xl p-2 text-black font-semibold">
                <div className="flex flex-row gap-2  items-center">
                  <img src={googleIcon} alt="google" className="w-8 h-8" />
                  <div>Google</div>
                </div>
              </button>
              <button className="border-2 border-gray-500 rounded-xl p-2 text-black font-semibold">
                <div className="flex flex-row gap-2  items-center">
                  <img src={githubIcon} alt="github" className="w-8 h-8" />
                  <div className="">Github</div>
                </div>
              </button>
            </div>
            <p className="font-semibold">
              Don't have an account?
              <span
                className="text-blue-600 cursor-pointer underline"
                onClick={onSwitchToRegister}
              >
                Create one
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
