import googleIcon from "../assets/google.svg";
import githubIcon from "../assets/github.svg";
import { useState } from "react";

function Register({ onLoginSuccess, onSwitchToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      // Auto-login (store token and user)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Notify parent that login succeeded (so it can update UI)
      onLoginSuccess();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black">
      <div className="max-w-sm mx-auto bg-gray-300 rounded-xl overflow-hidden shadow-lg p-6">
        <div className="w-max h-max rounded-2xl flex flex-col items-center justify-start pt-10 gap-5">
          <h1 className="text-2xl text-black font-bold">Create an Account</h1>
          <form
            className="gap-5 flex flex-col w-full px-4"
            onSubmit={handleRegister}
          >
            <input
              type="text"
              className="border-2 border-gray-500 rounded-xl text-xl p-2 text-black"
              placeholder="Username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              className="border-2 border-gray-500 rounded-xl text-xl p-2 text-black"
              placeholder="New Password.."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              className="border-2 border-gray-500 rounded-xl text-xl p-2 text-black"
              placeholder="Confirm Password.."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="border-2 border-gray-500 rounded-xl p-2 text-black font-semibold"
            >
              Register
            </button>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="flex flex-row justify-evenly">
              <button
                type="button"
                className="border-2 border-gray-500 rounded-xl p-2 text-black font-semibold"
              >
                <div className="flex flex-row gap-2 items-center">
                  <img src={googleIcon} alt="google" className="w-8 h-8" />
                  <div>Google</div>
                </div>
              </button>
              <button
                type="button"
                className="border-2 border-gray-500 rounded-xl p-2 text-black font-semibold"
              >
                <div className="flex flex-row gap-2 items-center">
                  <img src={githubIcon} alt="github" className="w-8 h-8" />
                  <div>Github</div>
                </div>
              </button>
            </div>
            <p className="font-semibold">
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer underline"
                onClick={onSwitchToLogin}
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
