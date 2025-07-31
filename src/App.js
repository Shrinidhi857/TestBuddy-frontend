import Navbar from "./layouts/Navbar";
import Sidebar from "./layouts/Sidebar";
import Main from "./layouts/Main";
import { useState } from "react";

function App() {
  const [page, setPage] = useState("homepage");

  return (
    <>
      <Navbar />
      <Sidebar page={page} setPage={setPage} />
      <Main page={page} setPage={setPage} />
    </>
  );
}

export default App;
