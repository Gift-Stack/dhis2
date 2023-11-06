import { useEffect, useState } from "react";
import axios from "axios";

import Header from "./components/header";
import { AccordionContainer } from "./components/shared/accordion";
import Dashboard from "./components/dashboard";
import { Dashboard as TDashboard } from "./utils/types";
import { API_URL } from "./utils/constant";
import { ReactComponent as Loader } from "./icons/rolling.svg";

function App() {
  const [openIndex, setOpenIndex] = useState(0);
  const [dashboards, setDashboards] = useState<TDashboard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleAccordion = (index: number, isOpen: boolean) => {
    if (isOpen) {
      setOpenIndex(-1);
      return;
    }
    setOpenIndex(index);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/dashboards.json`)
      .then((response) => {
        setDashboards(response.data.dashboards);
        setError(null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dashboards:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#f9f9f9] min-h-screen">
      <div className="max-w-xl mx-auto px-5 pt-2 pb-8">
        <Header />

        {loading ? (
          <Loader className="h-5 w-5 mx-auto" />
        ) : error ? (
          <p className="font-semibold text-sm text-center text-red-600">
            {error}!
          </p>
        ) : (
          <AccordionContainer>
            {dashboards.map((dashboard, index) => {
              return (
                <Dashboard
                  key={index}
                  dashboard={dashboard}
                  isOpen={openIndex === index}
                  index={index}
                  toggleAccordion={toggleAccordion}
                />
              );
            })}
          </AccordionContainer>
        )}
      </div>
    </div>
  );
}

export default App;
