import React, { createContext, useReducer } from "react";
import { DashboardItemType } from "../utils/types";
import AppReducer from "./AppReducer";
import { FILTER_DASHBOARD, TOGGLE_ACCORDION } from "./types";

const initialState = {
  dashboardFilterType: "ALL",
  openIndex: 0,
  fiterDashboardType: (type: DashboardItemType | "ALL") => {},
  toggleAccordion: (index: number) => {},
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

  const toggleAccordion = (index: number) => {
    if (index === state.openIndex) {
      dispatch({
        type: TOGGLE_ACCORDION,
        payload: -1,
      });
      return;
    }
    dispatch({
      type: TOGGLE_ACCORDION,
      payload: index,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        dashboardFilterType: state.dashboardFilterType,
        openIndex: state.openIndex,
        fiterDashboardType,
        toggleAccordion,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
