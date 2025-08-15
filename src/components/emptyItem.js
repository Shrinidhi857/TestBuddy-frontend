// src/components/Items.js
import "../index.css";

function EmptyItem() {
  return (
    <div className="  rounded-md p-1 text-secondary-light  w-full cursor-pointer m-0.5 border-2 border-secondary-dark  flex flex-row justify-between p-2">
      <h3 className="text-red-600">Empty</h3>
    </div>
  );
}

export default EmptyItem;
