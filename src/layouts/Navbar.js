import "../index.css";
import logo from "../assets/T.png";

function Navbar() {
  return (
    <div className={"navbar"}>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <h1>TestMint</h1>
    </div>
  );
}

export default Navbar;
