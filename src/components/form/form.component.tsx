import React from "react";
import "./form.css"; // Regular CSS import, no module

interface FormLayoutProps {
  columnSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  children: React.ReactNode;
}

const FormComponent: React.FC<FormLayoutProps> = ({
  columnSpan = 12,
  children,
}) => {
  const gridClass = `span${columnSpan}`;

  return <div className={`gridContainer ${gridClass}`}>{children}</div>;
};

export default FormComponent;
