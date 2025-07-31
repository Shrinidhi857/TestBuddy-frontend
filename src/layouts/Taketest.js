import "../index.css";

function Taketest({ uploadpdf, clicktest }) {
  return (
    <div className="taketest">
      <div className="add-system" onClick={uploadpdf}>
        <div className="add-file">
          <p className="plus">+</p>
          <div>upload</div>
        </div>
        <button onClick={clicktest}>Take test</button>
      </div>
    </div>
  );
}

export default Taketest;
