import React from "react";
import { BellIcon, FourLineIcon, SearchIcon } from "./Icon";

const Header = ({ showSideBar, setShowSideBar }) => {
  return (
    <>
      <div className="flex items-center px-2.5 gap-2.5 justify-between py-2 ">
      

        <div className="flex items-center gap-2.5">
          <span
            onClick={() => setShowSideBar(!showSideBar)}
            className="cursor-pointer md:hidden"
          >
            <FourLineIcon />
          </span>
          <span
          
            className="cursor-pointer hidden md:block"
          >
            <FourLineIcon />
          </span>
          <div className="bg-[#EBEDF0] flex items-center gap-2.5 p-1.5 max-w-[360px] sm:w-[360px]">
            <span>
              <SearchIcon />
            </span>
            <input
              type="search"
              placeholder="Search in the admin panel"
              className="bg-transparent border-0 outline-none"
            />
          </div>
        </div>
        <span className="cursor-pointer">
          <BellIcon />
        </span>
      </div>
    </>
  );
};

export default Header;
