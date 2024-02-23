// DataContext.js
import React, { createContext, useContext, useState } from 'react';
// import QuantityButton from './Quantity';
const DataContext = createContext();

export const useDataContext = () => {
  return useContext(DataContext);
};
export const DataProvider = ({ children }) => {
  const [data, setData] = useState(0);

  const getId =(id)=>{
    setData(id);
    console.log(data);
  }

  return (

    <DataContext.Provider value={{ data, getId }}>
      {children}
    </DataContext.Provider>
  );
};