export type Dashboard = {
  displayName: string;
  id: string;
  starred: boolean;
};

export type DashboardData = {
  access: Access;
  dashboardItems: DashboardItem[];
  displayName: string;
  id: string;
  restrictFilters: boolean;
  starred: boolean;
};

type Access = {
  delete: boolean;
  externalize: boolean;
  manage: boolean;
  read: boolean;
  update: boolean;
  write: boolean;
};

type DashboardItem = {
  id: string;
  h?: number;
  w?: number;
  x?: number;
  y?: number;
  reports: [];
  resources: [];
  shape: DashboardItemShape;
  type: DashboardItemType;
  users: [];
} & {
  [key in "map" | "visualization" | "text"]: key extends "visualization"
    ? MapOrVisualization & { type: VisualizationType }
    : key extends "map"
    ? MapOrVisualization
    : key extends "text"
    ? string
    : never;
};

type DashboardItemShape = "NORMAL" | "DOUBLE_WIDTH";
export type DashboardItemType = "MAP" | "VISUALIZATION" | "TEXT";
export enum DashboardItemTypeEnum {
  MAP = "map",
  TEXT = "text",
  VISUALIZATION = "visualization",
}

type VisualizationType =
  | "COLUMN"
  | "STACKED_COLUMN"
  | "PIE"
  | "LINE"
  | "YEAR_OVER_YEAR_LINE";

type MapOrVisualization = {
  id: string;
  name: string;
};
