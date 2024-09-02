import React, { useState } from "react";
import logo from "../../assets/image/svg/dashboard-logo.svg";
import { sideBarData } from "./Helper";
import { Link } from "react-router-dom";
import { DropdownArrowIcon } from "./Icon";

const SideBar = ({ setShowSideBar }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdown = (index) => {
    if (openDropdown === index) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(index);
    }
  };
  return (
    <div id="sidebar" className=" top-0 sticky ">
      <div className="bg-[#FFAE00] py-2.5 flex justify-center">
        <img src={logo} alt="logo" />
      </div>
      <div className="flex flex-col bg-[#3D464D] h-full">
        {sideBarData.map((item, index) => (
          <div key={index}>
            <Link
              to={item.path}
              className="flex items-center justify-between px-5 py-3 gap-2.5 hover:bg-[#26313A] hover:rounded-l-[20px] group w-full duration-300 icon cursor-pointer"
              onClick={() => {
                handleDropdown(index);
                setShowSideBar(false);
              }}
            >
              <div className="flex items-center gap-2.5">
                {item.icon}
                <h2 className="font-normal text-sm text-white group-hover:text-[#FFAE00]">
                  {item.tabs}
                </h2>
              </div>
              {item.hasDropdown && (
                <div
                  className={`transform ${
                    openDropdown === index ? "rotate-180" : ""
                  }`}
                >
                  <DropdownArrowIcon />
                </div>
              )}
            </Link>
            {item.subItems && openDropdown === index && (
              <div className="flex flex-col pl-10 ">
                {item.subItems.map((subItem, subIndex) => (
                  <Link
                    to={subItem.path}
                    key={subIndex}
                    className="flex items-center px-5 py-2 gap-2.5 group w-full duration-300 icon"
                  >
                    <h3 className="font-normal text-sm text-white duration-300 group-hover:text-[#FFAE00]">
                      {subItem.tabs}
                    </h3>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
