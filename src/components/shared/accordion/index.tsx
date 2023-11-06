import { ReactComponent as StarIcon } from "../../../icons/star.svg";
import { ReactComponent as CaretIcon } from "../../../icons/caret.svg";
import React, { ReactElement } from "react";

interface AccordionContainerProps {
  children: ReactElement<AccordionProps> | ReactElement<AccordionProps>[];
}

interface AccordionProps {
  children: [
    ReactElement<AccordionHeadProps>,
    ReactElement<AccordionBodyProps>
  ];
}

interface AccordionHeadProps {
  starred?: boolean;
  onAccordionToggle: () => void;
  onStar?: () => void;
  children: string;
}

interface AccordionBodyProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export const AccordionContainer: React.FC<AccordionContainerProps> = ({
  children,
}) => {
  return (
    <div
      className="flex flex-col space-y-3 w-full"
      data-testid="accordion-container"
    >
      {children}
    </div>
  );
};

export const Accordion: React.FC<AccordionProps> = ({ children }) => {
  return (
    <div
      data-testid="accordion"
      className="py-3 px-4 border-1.5 border-gray-300 bg-white rounded-lg"
    >
      {children}
    </div>
  );
};

export const AccordionHead: React.FC<AccordionHeadProps> = ({
  onStar,
  onAccordionToggle,
  starred,
  children,
}) => {
  return (
    <div
      data-testid="accordion-head"
      className="flex items-center justify-between"
    >
      <p className="text-sm font-semibold flex items-start">{children}</p>
      <div className="flex items-center gap-3">
        {onStar && (
          <StarIcon
            data-testid="star-icon"
            onClick={onStar}
            className={`text-gray-400 cursor-pointer ${
              !starred ? "custom-fill-color-none" : "custom-fill-color-gray-400"
            }`}
          />
        )}
        <CaretIcon
          data-testid="accordion-trigger"
          className="text-gray-900 h-3 w-3 cursor-pointer rotate-180"
          onClick={onAccordionToggle}
        />
      </div>
    </div>
  );
};

export const AccordionBody: React.FC<AccordionBodyProps> = ({
  children,
  isOpen,
}) => {
  let height = isOpen ? "max-h-screen" : "max-h-[0px]";
  return (
    <div
      data-testid="accordion-body"
      className={`overflow-hidden transition-[max-height] delay-0 duration-1000 ease-in-out ${height}`}
    >
      {children}
    </div>
  );
};
