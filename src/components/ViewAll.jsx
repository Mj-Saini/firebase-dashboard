import React, { useEffect, useState } from "react";
import { SaveIcon } from "./common/Icon";
import { useParams } from "react-router-dom";

const ViewAll = () => {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    fetch(`https://crud-django-c7ri.onrender.com/api/user/${id}`)
      .then((response) => response.json())
      .then((res) => setUserDetails(res.data));
  }, [id]);

  return (
    <>
      <div className="flex justify-between items-center mt-5">
        <h2 className="font-medium text-[30px] text-black">Dashboard</h2>
        <button
          type="submit"
          className="py-3 px-6 border border-[#FFAE00] rounded-[10px] flex gap-2 bg-[#FFAE00] hover:bg-transparent duration-300"
        >
          <SaveIcon />
          Reset Password
        </button>
      </div>
      <div className="bg-white py-5 shadow-2xl px-5 mt-5">
        <h2 className="font-normal text-lg text-black capitalize">
          Customer Details
        </h2>
        <div className="flex flex-col gap-10 flex-wrap">
          <div className="w-6/12">
            <div>
              <h2 className="font-normal text-sm text-black capitalize flex justify-between">
                Name: {userDetails.first_name} {userDetails.last_name}
              </h2>
              <h2 className="font-normal text-sm text-black capitalize">
                Email: {userDetails.email}
              </h2>
              <h2 className="font-normal text-sm text-black capitalize">
                Phone Number: {userDetails.phone_no}
              </h2>
              <h2 className="font-normal text-sm text-black capitalize">
                City: {userDetails.city}
              </h2>
              <h2 className="font-normal text-sm text-black capitalize">
                State: {userDetails.state}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAll;
