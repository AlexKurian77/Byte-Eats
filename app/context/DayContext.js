// context/DayContext.js
import React, { createContext, useContext, useState } from "react";

const DayContext = createContext(null);

export const DayProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [dayData, setDayData] = useState(null);
  const [onDeleteIntake, setOnDeleteIntake] = useState(() => () => {});
  const [onDeleteActivity, setOnDeleteActivity] = useState(() => () => {});

  return (
    <DayContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        dayData,
        setDayData,
        onDeleteIntake,
        setOnDeleteIntake,
        onDeleteActivity,
        setOnDeleteActivity,
      }}
    >
      {children}
    </DayContext.Provider>
  );
};

export const useDayContext = () => useContext(DayContext);
