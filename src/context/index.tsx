import React, { createContext, useReducer } from "react";
import { DashboardItemType } from "../utils/types";
import AppReducer from "./AppReducer";
import { FILTER_DASHBOARD } from "./types";

const initialState = {
  dashboardFilterType: "ALL",
  fiterDashboardType: (type: DashboardItemType | "ALL") => {},
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const fiterDashboardType = (type: DashboardItemType | "ALL") => {
    dispatch({
      type: FILTER_DASHBOARD,
      payload: type,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        dashboardFilterType: state.dashboardFilterType,
        fiterDashboardType,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
