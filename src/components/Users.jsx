import React from "react";
import UserData from "./UserData";
import { Route, Routes, useLocation } from "react-router-dom";
import ViewAll from "./ViewAll";
import EditUser from "../EditUser";

const Users = () => {
  const location = useLocation();
  const shouldHideUserData =
    location.pathname.startsWith("/users/details") ||
    location.pathname.startsWith("/users/new-users") ||
    location.pathname.startsWith("/users/update");

  return (
    <div className="px-3">
      {!shouldHideUserData && <UserData />}
      <Routes>
        {/* <Route path="new-users" element={<AddUser />} /> */}
        <Route path="details/:id" element={<ViewAll />} />
        <Route path="update/:id" element={<EditUser />} />
      </Routes>
    </div>
  );
};

export default Users;
