import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Dashboard as TDashboard,
  DashboardData,
  DashboardItemTypeEnum,
} from "../../utils/types";
import { Accordion, AccordionBody, AccordionHead } from "../shared/accordion";
import { ReactComponent as Loader } from "../../icons/rolling.svg";
import { GlobalContext } from "../../context";
import { API_URL, Icons } from "../../utils/constant";

type DashboardProps = {
  dashboard: TDashboard;
  isOpen: boolean;
  index: number;
  toggleAccordion: (index: number, isOpen: boolean) => void;
};

const dataCache: Partial<Record<string, DashboardData>> = {};

const Dashboard = React.memo(
  ({ dashboard, index, isOpen, toggleAccordion }: DashboardProps) => {
    const { dashboardFilterType } = useContext(GlobalContext);
    const [loading, setLoading] = useState(false);
    const [dashboardDetails, setDashboardDetails] =
      useState<DashboardData | null>(null);

    const handleStar = () => {
      const prev = JSON.parse(
        sessionStorage.getItem(dashboard.id) as string
      ) as boolean;

      const newVal = !prev;

      (dataCache[dashboard.id] as any) = {
        ...dataCache[dashboard.id],
        starred: newVal,
      };
      setDashboardDetails({
        ...dashboardDetails!,
        starred: newVal,
      });
      sessionStorage.setItem(dashboard.id, String(newVal));
    };

    const handleToggle = () => toggleAccordion(index, isOpen);

    const fetchDashboardData = async (dashboardId: string) => {
      // Check if data is already in the cache
      if (dataCache[dashboardId]) {
        setDashboardDetails(dataCache[dashboardId]!);
      } else {
        // Fetch the data and store it in the cache
        try {
          setLoading(true);
          const response = await axios.get(`${API_URL}/${dashboardId}.json`);
          const data: DashboardData = response.data;
          const modData = {
            ...data,
            starred: sessionStorage.getItem(data.id)
              ? (JSON.parse(
                  sessionStorage.getItem(data.id) as string
                ) as boolean)
              : data.starred,
          };
          dataCache[dashboardId] = modData;
          setDashboardDetails(modData);
          sessionStorage.setItem(data.id, String(modData.starred));
          setLoading(false);
        } catch (error) {
          console.error("Error fetching dashboard details:", error);
          setLoading(false);
        }
      }
    };

    useEffect(() => {
      fetchDashboardData(dashboard.id).then();
    }, [dashboard.id]);

    const filteredDashboards = dashboardDetails?.dashboardItems.filter(
      (dashboard) => {
        if (dashboardFilterType === "ALL") {
          return true; // Show all dashboards
        }

        // Filter dashboards based on dashboardItems type
        return dashboard.type.toUpperCase() === dashboardFilterType;
      }
    );

    return (
      <Accordion data-testid="dashboard">
        <AccordionHead
          starred={dashboardDetails?.starred ?? dashboard.starred}
          onStar={handleStar}
          onAccordionToggle={handleToggle}
        >
          {dashboard.displayName}
        </AccordionHead>
        <AccordionBody isOpen={isOpen}>
          {loading ? (
            <Loader data-testid="dashboard-loader" className="h-5 w-5" />
          ) : (
            <div className="pt-3.5 pb-2" data-testid="filtered-data">
              {filteredDashboards?.length ? (
                filteredDashboards?.map((item) => {
                  const type = item.type.toLowerCase() as DashboardItemTypeEnum;
                  const textOrMapOrVisualization = item[type];
                  const pillColor =
                    type === DashboardItemTypeEnum.MAP
                      ? "bg-yellow-100"
                      : "bg-gray-300";
                  const Icon = Icons[item.type];

                  return (
                    <div
                      key={item.id}
                      className="py-2 border-b text-xs flex items-center gap-3"
                    >
                      <img src={Icon} alt="" className="h-4 w-4" />

                      <p className="flex-1 text-[#222]">
                        {typeof textOrMapOrVisualization === "string" ? (
                          textOrMapOrVisualization
                        ) : (
                          <span className="flex items-center justify-between gap-2">
                            {textOrMapOrVisualization.name}
                            <span
                              className={`text-[10px] text-center min-w-[80px] w-max capitalize px-1.5 py-1 rounded-xl ${pillColor}`}
                            >
                              {type}
                            </span>
                          </span>
                        )}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="py-2 text-xs text-center">
                  {dashboardFilterType === "ALL" ? (
                    "Nothing to see here : ("
                  ) : (
                    <p>
                      No <span>{dashboardFilterType}</span> type here : (
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </AccordionBody>
      </Accordion>
    );
  }
);

export default Dashboard;
