import { Link } from "react-router-dom";

const ActionPopup = ({ index, handleRemove }) => {
  return (
    <div className="">
      <ul className="py-2">
        <Link
          to={`products-details/${index}`}
          className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          <span className="mr-2">👁️</span>
          <span>View Details</span>
        </Link>
        <Link
          to={`products-update/${index}`}
          className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          <span className="mr-2">✏️</span>
          <span>Edit Product</span>
        </Link>
        <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-green-500">
          <span className="mr-2">⬆️⬇️</span>
          <span>Change to Hidden</span>
        </li>
        <button
          onClick={() => handleRemove(index)}
          className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
        >
          <span className="mr-2">🗑️</span>
          <span>Delete</span>
        </button>
      </ul>
    </div>
  );
};

export default ActionPopup;
