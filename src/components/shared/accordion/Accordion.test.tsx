import "@testing-library/jest-dom";

import { render, screen, cleanup } from "@testing-library/react";
import {
  AccordionContainer,
  Accordion,
  AccordionHead,
  AccordionBody,
} from "./index";

afterEach(cleanup);

describe("Accordion Component", () => {
  it("renders Accordion component correctly", () => {
    render(
      <AccordionContainer>
        <Accordion>
          <AccordionHead
            onAccordionToggle={jest.fn()}
            children="Accordion Head"
          />
          <AccordionBody isOpen={false} children="Accordion Body" />
        </Accordion>
      </AccordionContainer>
    );

    const accordionContainer = screen.getByTestId("accordion-container");
    const accordion = screen.getByTestId("accordion");

    expect(accordionContainer).toBeInTheDocument();
    expect(accordion).toBeInTheDocument();
  });

  it("should toggle its visibility when isOpen changes", () => {
    const { rerender } = render(
      <AccordionBody isOpen={false}>Accordion Body Content</AccordionBody>
    );

    const accordionBody = screen.getByTestId("accordion-body");

    // Initially hidden
    expect(accordionBody).toHaveClass("max-h-[0px]");

    // Update isOpen to true
    rerender(
      <AccordionBody isOpen={true}>Accordion Body Content</AccordionBody>
    );

    // Now visible
    expect(accordionBody).toHaveClass("max-h-screen");

    // Update isOpen to false
    rerender(
      <AccordionBody isOpen={false}>Accordion Body Content</AccordionBody>
    );

    // Back to hidden
    expect(accordionBody).toHaveClass("max-h-[0px]");
  });

  it("handles starred AccordionHead correctly", () => {
    render(
      <AccordionContainer>
        <Accordion>
          <AccordionHead
            onAccordionToggle={jest.fn()}
            starred={true}
            onStar={jest.fn()}
            children="Accordion Head"
          />
          <AccordionBody isOpen={false} children="Accordion Body" />
        </Accordion>
      </AccordionContainer>
    );

    const starIcon = screen.getByTestId("star-icon");

    expect(starIcon).toHaveClass("custom-fill-color-gray-400");
  });
});
