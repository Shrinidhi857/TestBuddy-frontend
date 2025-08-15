import Navbar from "./layouts/Navbar";
import Sidebar from "./layouts/Sidebar";
import Main from "./layouts/Main";
import { useState, useEffect } from "react";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  const token = localStorage.getItem("token");
  const [sidebarShow, setsidebarShow] = useState(true);
  console.log(`✅ ${token}`);
  const [page, setPage] = useState("login");
  const [quizView, setQuizView] = useState([]);
  const [flashView, setFlashView] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    //console.log(`✅ ${token}`);
    if (token) setPage("homepage"); // if logged in, go to homepage
  }, []);

  // Show login or register forms when not logged in
  if (page === "login") {
    return (
      <Login
        onLoginSuccess={() => setPage("homepage")}
        onSwitchToRegister={() => setPage("register")}
      />
    );
  }

  if (page === "register") {
    return (
      <Register
        onLoginSuccess={() => setPage("homepage")}
        onSwitchToLogin={() => setPage("login")}
      />
    );
  }

  // When logged in or on other pages show the main app layout
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
