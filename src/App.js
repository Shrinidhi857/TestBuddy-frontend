import jwtDecode from "jwt-decode";
import Navbar from "./layouts/Navbar";
import Sidebar from "./layouts/Sidebar";
import Main from "./layouts/Main";
import { useState, useEffect } from "react";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  const [sidebarShow, setsidebarShow] = useState(true);
  const [page, setPage] = useState("login");
  const [quizView, setQuizView] = useState([]);
  const [flashView, setFlashView] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // in seconds

        if (decoded.exp && decoded.exp > currentTime) {
          setPage("homepage"); // token is valid
        } else {
          localStorage.removeItem("token"); // remove expired token
          setPage("login"); // redirect to login
        }
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
        setPage("login");
      }
    }
  }, []);

  // Login Page
  if (page === "login") {
    return (
      <Login
        onLoginSuccess={() => setPage("homepage")}
        onSwitchToRegister={() => setPage("register")}
      />
    );
  }

  // Register Page
  if (page === "register") {
    return (
      <Register
        onLoginSuccess={() => setPage("homepage")}
        onSwitchToLogin={() => setPage("login")}
      />
    );
  }

  // Main App
  return (
    <>
      <Navbar sidebarControll={setsidebarShow} sidebar={sidebarShow} />
      {sidebarShow && (
        <Sidebar
          page={page}
          setPage={setPage}
          quizView={quizView}
          setQuizView={setQuizView}
          flashView={flashView}
          setFlashView={setFlashView}
        />
      )}
      <Main
        page={page}
        setPage={setPage}
        quizView={quizView}
        setQuizView={setQuizView}
        flashView={flashView}
        setFlashView={setFlashView}
      />
    </>
  );
}

export default App;
