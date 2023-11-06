import React, { useContext } from "react";
import Select, { components } from "react-select";
import { GlobalContext } from "../context";
import { DashboardItemType, DashboardItemTypeEnum } from "../utils/types";

const VALUE_PREFIX = "Filter items ";
const options = [
  { value: "all", label: "All types" },
  { value: DashboardItemTypeEnum.TEXT, label: "Text" },
  { value: DashboardItemTypeEnum.MAP, label: "Map" },
  { value: DashboardItemTypeEnum.VISUALIZATION, label: "Visualization" },
];
const Header = React.memo(() => {
  const { fiterDashboardType } = useContext(GlobalContext);

  return (
    <div className="w-full flex items-center justify-between py-3 border-b border-gray-300 mb-4">
      <p className="font-semibold">Dashboard</p>

      <Select
        options={options}
        defaultValue={options[0]}
        onChange={(e) =>
          fiterDashboardType(
            e?.value.toUpperCase() as DashboardItemType | "ALL"
          )
        }
        components={{
          SingleValue: ({ children, ...props }) => {
            return (
              <components.SingleValue {...props} className="text-sm">
                <span className="text-gray-500">{VALUE_PREFIX}</span>

                {children}
              </components.SingleValue>
            );
          },
          IndicatorSeparator: () => null,
        }}
      />
    </div>
  );
});

export default Header;
