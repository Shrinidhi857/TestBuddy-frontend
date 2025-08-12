import "../index.css";
import logo from "../assets/T-d.png";
import sidebar from "../assets/sidebar.svg";

function Navbar({ sidebarControll, sidebar }) {
  return (
    <div className="fixed top-0 w-full h-12 bg-tertiary-light dark:bg-tertiary-dark dark:text-primary-light flex items-center px-6 z-10 ">
      <div className="flex items-center gap-2">
        <div
          className="flex p-1 items-center flex-col cursor-pointer m-0.5 border-2 border-secondary-dark duration-100 hover:shadow-[0_0_10px_#ffffff] rounded-xl "
          onClick={() => sidebarControll(!sidebar)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <img src={logo} alt="logo" className="h-7 w-auto"></img>
      </div>
      <h1 className="m-0 text-xl font-bold">Intellitest</h1>
    </div>
  );
}

export default Navbar;
