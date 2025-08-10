import "../index.css";
import logo from "../assets/T.png";

function Navbar() {
  return (
    <div className="fixed top-0 w-full h-12 bg-tertiary-light dark:bg-tertiary-dark dark:text-primary-light flex items-center px-6 z-10 ">
      <div className="flex items-center gap-2">
        <img src={logo} alt="logo" className="h-7 w-auto"></img>
      </div>
      <h1 className="m-0 text-xl">TestMint</h1>
    </div>
  );
}

export default Navbar;
