import React from "react";
import { DeleteIcon, EditIcon, ViewIcon } from "./Icon";
import { Link } from "react-router-dom";

const Popup = ({ userId, apiData, setApiData }) => {
  const deleteUser = async (id) => {
    await fetch(`https://crud-django-c7ri.onrender.com/api/user/${id}/`, {
      method: "DELETE",
    });
    let fiterData = apiData.filter((user, index) => user.id !== id);
    setApiData(fiterData);
  };

  return (
    <div className="bg-white p-2.5 fixed z-10 shadow-lg max-w-[105px] flex flex-col gap-2">
      <Link
        to={`details/${userId}`}
        className="font-normal text-sm text-[#000F02] flex gap-2 capitalize"
      >
        <ViewIcon /> view
      </Link>
      <Link
        to={`update/${userId}`}
        className="font-normal text-sm text-[#000F02] flex gap-2 capitalize"
      >
        <EditIcon /> edit
      </Link>
      <button
        onClick={() => deleteUser(userId)}
        className="font-normal text-sm text-[#E72929] flex gap-2 capitalize"
      >
        <DeleteIcon /> delete
      </button>
    </div>
  );
};

export default Popup;
