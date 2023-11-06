import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./index";

describe("Header Component", () => {
  it("renders the Header component correctly", () => {
    render(<Header />);

    // Check if the component renders without errors
    const header = screen.getByTestId("header");
    expect(header).toBeInTheDocument();

    // Check if the "Dashboard" text is present
    const dashboardText = screen.getByText("Dashboard");
    expect(dashboardText).toBeInTheDocument();
  });
});
