import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SaveIcon } from "./components/common/Icon";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
    city: "",
    state: "",
  });
  useEffect(() => {
    fetch(`https://crud-django-c7ri.onrender.com/api/user/${id}/`)
      .then((res) => res.json())
      .then((res) => setUserData(res.data));
  }, [id]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch(`https://crud-django-c7ri.onrender.com/api/user/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((res) => setUserData(res.data));
    navigate("/users");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col flex-wrap "
        action=""
      >
        <div className="flex justify-between items-center mt-5">
          <h2 className="font-medium text-[30px] text-black">Dashboard</h2>
          <button
            type="submit"
            className="py-3 px-6 border border-[#FFAE00] rounded-[10px] flex gap-2 bg-[#FFAE00] hover:bg-transparent duration-300"
          >
            <SaveIcon />
            Save
          </button>
        </div>
        <div className="bg-white py-5 shadow-2xl px-5 mt-5">
          {" "}
          <h2 className="font-normal text-lg text-black capitalize">
            Basic Information
          </h2>
          <div className=" flex flex-wrap">
            <div className="flex flex-col mt-5 w-full sm:w-1/3 lg:w-1/4 px-3 gap-2">
              <label
                className="font-normal text-sm text-black capitalize"
                htmlFor="first_name"
              >
                First Name
              </label>
              <input
                required
                className="px-2 border-[.5px] text-sm font-normal border-black/30 text-black outline-none py-2.5"
                onChange={handleOnChange}
                type="text"
                value={userData.first_name}
                name="first_name"
              />
            </div>
            <div className="flex flex-col mt-5 w-full sm:w-1/3 lg:w-1/4 px-3 gap-2">
              <label
                className="font-normal text-sm text-black capitalize"
                htmlFor="first_name"
              >
                last Name
              </label>
              <input
                required
                className="px-2 border-[.5px] text-sm font-normal border-black/30 text-black outline-none py-2.5"
                onChange={handleOnChange}
                type="text"
                value={userData.last_name}
                name="last_name"
              />
            </div>
            <div className="flex flex-col mt-5 w-full sm:w-1/3 lg:w-1/4 px-3 gap-2">
              <label
                className="font-normal text-sm text-black capitalize"
                htmlFor="first_name"
              >
                email Name
              </label>
              <input
                required
                className="px-2 border-[.5px] text-sm font-normal border-black/30 text-black outline-none py-2.5"
                onChange={handleOnChange}
                type="text"
                value={userData.email}
                name="email"
              />
            </div>
            <div className="flex flex-col mt-5 w-full sm:w-1/3 lg:w-1/4 px-3 gap-2">
              <label
                className="font-normal text-sm text-black capitalize"
                htmlFor="first_name"
              >
                phone number
              </label>
              <input
                required
                className="px-2 border-[.5px] text-sm font-normal border-black/30 text-black outline-none py-2.5"
                onChange={handleOnChange}
                type="text"
                value={userData.phone_no}
                name="phone_no"
              />
            </div>
            <div className="flex flex-col mt-5 w-full sm:w-1/3 lg:w-1/4 px-3 gap-2">
              <label
                className="font-normal text-sm text-black capitalize"
                htmlFor="first_name"
              >
                city
              </label>
              <input
                required
                className="px-2 border-[.5px] text-sm font-normal border-black/30 text-black outline-none py-2.5"
                onChange={handleOnChange}
                type="text"
                value={userData.city}
                name="city"
              />
            </div>
            <div className="flex flex-col mt-5 w-full sm:w-1/3 lg:w-1/4 px-3 gap-2">
              <label
                className="font-normal text-sm text-black capitalize"
                htmlFor="first_name"
              >
                state
              </label>
              <input
                required
                className="px-2 border-[.5px] text-sm font-normal border-black/30 text-black outline-none py-2.5"
                onChange={handleOnChange}
                type="text"
                value={userData.state}
                name="state"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
