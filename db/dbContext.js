// context to be used in next.js pages
import React, { createContext, useContext } from 'react';
import connectDB from './conn';

const DbContext = createContext();

export const DbProvider = ({ children }) => {
  const db = connectDB();

  return <DbContext.Provider value={db}>{children}</DbContext.Provider>;
};

export const useDb = () => useContext(DbContext);
