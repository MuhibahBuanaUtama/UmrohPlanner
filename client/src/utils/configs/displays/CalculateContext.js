import React, { createContext, useContext, useState } from "react";

const CalculateContext = createContext();

export const CalculateProvider = ({ children }) => {
  const [data, setData] = useState(null);

  return (
    <CalculateContext.Provider value={{ data, setData }}>
      {children}
    </CalculateContext.Provider>
  );
};

export const useCalculateContext = () => {
  return useContext(CalculateContext);
};
