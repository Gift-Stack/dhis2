import { FILTER_DASHBOARD } from "./types";

type Action = {
  type: string;
  payload: any;
};

const AppReducer = (state: any, action: Action) => {
  switch (action.type) {
    case FILTER_DASHBOARD:
      return {
        ...state,
        dashboardFilterType: action.payload,
      };
    default:
      return state;
  }
};

export default AppReducer;
