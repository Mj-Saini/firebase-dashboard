import React from "react";
import { DeleteIcon } from "./common/Icon";

const DeletePopup = ({ onCancel, onDelete }) => {
  return (
    <div className="bg-white p-2.5 fixed top-0 left-0  shadow-lg flex flex-col gap-2 z-[100]">
      <div className="flex flex-col justify-center items-center">
        <span className="delete_icon inline-block">
          <DeleteIcon />
        </span>
        <h2 className="font-normal text-xl text-[#E72929] capitalize mt-2.5">
          Delete
        </h2>
      </div>
      <p className="font-normal text-xs text-black my-2.5">
        Are you sure you want to Delete?
      </p>
      <div className="flex -gap-3">
        <button
          onClick={onCancel}
          className="px-2.5 py-3 border-[#4AAF57] bg-[#4AAF57] text-white rounded-[5px] font-normal text-sm capitalize"
        >
          No, Cancel
        </button>
        <button
          onClick={onDelete}
          className="px-2.5 py-3 border-[#E72929] bg-[#E72929] text-white rounded-[5px] font-normal text-sm capitalize"
        >
          Yes, Delete
        </button>
      </div>
    </div>
  );
};

export default DeletePopup;
