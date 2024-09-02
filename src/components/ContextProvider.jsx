import { collection, getDocs } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "./firebase";

// Step 1: Create a new context
export const MyContext = createContext();

export const useProvider = () => {
  return useContext(MyContext);
};

const ContextProvider = ({ children }) => {
  const [productsData, setProductsData] = useState([]);

  const value = { productsData, setProductsData };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export default ContextProvider;
