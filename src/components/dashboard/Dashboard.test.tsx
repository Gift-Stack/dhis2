import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import Dashboard from "./index";

// Mock axios and sessionStorage behavior
jest.mock("axios", () => ({
  get: jest.fn((api: string) => ({
    data: {
      access: {},
      dashboardItems: [],
      displayName: "Mock Dashboard",
      id: "nghVC4wtyzi",
      restrictFilters: false,
      starred: true,
    },
  })),
}));

const mockDashboard = {
  displayName: "Mock Dashboard",
  id: "nghVC4wtyzi",
  starred: true,
};

let mockSessionStorage: Record<string, string> = {};
const sessionStorageMock = {
  getItem: (key: string) => mockSessionStorage[key],
  setItem: (key: string, value: string) => (mockSessionStorage[key] = value),
  clear: () => (mockSessionStorage = {}),
};

Object.defineProperty(window, "sessionStorage", {
  value: sessionStorageMock,
});

describe("Dashboard Component", () => {
  it("renders the Dashboard component correctly", () => {
    render(
      <Dashboard
        dashboard={mockDashboard}
        index={0}
        isOpen={false}
        toggleAccordion={jest.fn()}
      />
    );

    // Check if the component renders without errors
    const dashboard = screen.getByTestId("accordion");
    expect(dashboard).toBeInTheDocument();
  });

  it("toggles the accordion on click", () => {
    const toggleAccordionMock = jest.fn();
    render(
      <Dashboard
        dashboard={mockDashboard}
        index={0}
        isOpen={false}
        toggleAccordion={toggleAccordionMock}
      />
    );

    const accordionHead = screen.getByTestId("accordion-trigger");

    // Click the accordion head to toggle
    fireEvent.click(accordionHead);

    // Check if the toggleAccordion function was called
    expect(toggleAccordionMock).toHaveBeenCalledWith(0, false);
  });

  it("fetches and displays data when not in cache", async () => {
    render(
      <Dashboard
        dashboard={mockDashboard}
        index={0}
        isOpen={false}
        toggleAccordion={jest.fn()}
      />
    );

    // Check if the loading state is displayed
    const loader = screen.getByTestId("dashboard-loader");
    expect(loader).toBeInTheDocument();

    // Wait for data to load
    await waitFor(() => {
      // Check if the loading state is replaced with actual content
      const dashboardContent = screen.getByTestId("accordion-body");
      expect(dashboardContent).toBeInTheDocument();
    });
  });

  it("displays filtered data", async () => {
    render(
      <Dashboard
        dashboard={mockDashboard}
        index={0}
        isOpen={false}
        toggleAccordion={jest.fn()}
      />
    );

    // Wait for data to load
    await waitFor(() => {
      // Check if filtered data is displayed
      const filteredData = screen.getByTestId("filtered-data");
      expect(filteredData).toBeInTheDocument();
    });
  });
});
