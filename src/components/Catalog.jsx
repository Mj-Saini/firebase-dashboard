import React from "react";
import { Outlet } from "react-router-dom";

const Catalog = () => {
  return (
    <div className="px-5">
      <Outlet />
    </div>
  );
};

export default Catalog;
