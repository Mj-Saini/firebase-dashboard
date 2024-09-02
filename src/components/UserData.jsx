import React, { useEffect, useState } from "react";
import Popup from "./common/Popup";
import { Link } from "react-router-dom";
import { AddIcon } from "./common/Icon";

const UserData = () => {
  const [apiData, setApiData] = useState([]);
  const [openPopupIndex, setOpenPopupIndex] = useState(null);

  const handleTogglePopup = (index) => {
    if (openPopupIndex === index) {
      setOpenPopupIndex(null);
    } else {
      setOpenPopupIndex(index);
    }
  };

  useEffect(() => {
    fetch("https://crud-django-c7ri.onrender.com/api/user/")
      .then((response) => response.json())
      .then((responseData) => setApiData(responseData.data));
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-medium text-[30px] text-black pt-5">Dashboard</h2>
        <Link
          to="new-users"
          className="py-3 px-2.5 border border-[#FFAE00] rounded-[5px] flex gap-2 bg-[#FFAE00] hover:bg-transparent duration-300"
        >
          <AddIcon />
          Add New User
        </Link>
      </div>
      <table className="w-full bg-white mt-5">
        <thead>
          <tr className="w-full font-normal text-base text-black border-b border-black/24">
            <th className="py-4 px-4 text-left  font-normal text-base">Name</th>
            <th className="py-4 px-4 text-left capitalize font-normal text-base">
              Registration
            </th>
            <th className="py-4 px-4 text-left capitalize font-normal text-base">
              E-mail
            </th>
            <th className="py-4 px-4 text-left capitalize font-normal text-base">
              phone Number
            </th>
            <th className="py-4 px-4 text-left capitalize font-normal text-base">
              City
            </th>
            <th className="py-4 px-4 text-left capitalize font-normal text-base">
              State
            </th>
            <th className="py-4 px-4 text-left capitalize font-normal text-base">
              action
            </th>
          </tr>
        </thead>
        <tbody>
          {apiData.map((items, index) => (
            <tr key={index} className="w-full even:bg-gray-100">
              <td className="py-3.5 text-black/80 text-base font-normal px-4">
                {items.first_name} {items.last_name}
              </td>
              <td className="py-3.5 text-black/80 text-base font-normal px-4">
                {items.registration}
              </td>
              <td className="py-3.5 text-black/80 text-base font-normal px-4">
                {items.email}
              </td>
              <td className="py-3.5 text-black/80 text-base font-normal px-4">
                {items.phone_no}
              </td>
              <td className="py-3.5 text-black/80 text-base font-normal px-4">
                {items.city}
              </td>
              <td className="py-3.5 text-black/80 text-base font-normal px-4">
                {items.state}
              </td>
              <td className="py-3.5 text-black/80 text-base font-normal px-4">
                <div
                  onClick={() => handleTogglePopup(index)}
                  className="w-3 h-4 flex flex-col justify-between items-center cursor-pointer relative ps-3"
                >
                  {openPopupIndex === index && (
                    <div>
                      <div
                        onClick={() => setOpenPopupIndex}
                        className="fixed top-0 left-0 h-screen w-screen bg-black/50 "
                      ></div>
                      <div className="absolute top-full left-0 z-10 ">
                        <Popup
                          userId={items.id}
                          setApiData={setApiData}
                          apiData={apiData}
                        />
                      </div>
                    </div>
                  )}
                  <span className="w-1 h-1 inline-block rounded-3xl bg-black"></span>
                  <span className="w-1 h-1 inline-block rounded-3xl bg-black"></span>
                  <span className="w-1 h-1 inline-block rounded-3xl bg-black"></span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserData;
