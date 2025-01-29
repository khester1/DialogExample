import React from "react";
import styles from "../form/form.workflow.module.css";

interface FormLayoutProps {
  columnSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  children: React.ReactNode;
}

const FormWorkflowComponent: React.FC<FormLayoutProps> = ({ columnSpan = 12, children }) => {
  // Dynamically create the class for the column span, default to full span (12 columns)
  const gridClass = `span${columnSpan}`;

  return (
    <div className={`${styles.gridContainer} ${styles[gridClass]}`}>
      {children}
    </div>
  );
};

export default FormWorkflowComponent;
