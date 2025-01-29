import { FontWeights } from "@fluentui/react";

// src/styles/proFormaStyles.ts
export const labelStyle = {
  gridColumn: "1/ span 6",
  display: "flex",
  // alignItems: "center",
};

export const labelStyleExpand = {
  gridColumn: "1/ span 6",
  display: "flex",
  alignItems: "center",
};

export const textFieldStyle = {
  gridColumn: "7 / span 2",
  textAlign: "center" as const,
};

export const textFieldStyleCheckBox = {
  gridColumn: "7 / span 5",
  textAlign: "center" as const,
};

export const textFieldStyleExpand = {
  gridColumn: "5 / span 2",
  textAlign: "center" as const,
};

export const textFieldStyleCheckboxExpand = {
  gridColumn: "5 / span 3",
  textAlign: "center" as const,
};

export const labelStyleDetails = {
  gridColumn: "9/ span 6",
  display: "flex",
  alignItems: "center",
};

export const labelAggregateStyleDetails = {
  gridColumn: "10/ span 6",
  display: "flex",
  alignItems: "center",
};

export const textFieldStyleDetails = {
  gridColumn: " 7/ span 2",
  textAlign: "center" as const,
};

export const textFieldAggregateStyleDetails = {
  gridColumn: " 7/ span 3",
  textAlign: "center" as const,
};

export const labelHeaderDetails = {
  gridColumn: " 7/ span 6",
  textAlign: "start" as const,
};

export const labelStyleExpandDetails = {
  gridColumn: "4/ span 6",
  display: "flex",
  alignItems: "center",
};

export const readonlyTextFieldStyle = {
  ...textFieldStyle,
  backgroundColor: "#f5f5f5",
  fontWeight: FontWeights.bold,
  cursor: "not-allowed",
};

export const calculateButton = {
  gridColumn: " 1/ span 4",
  textAlign: "start" as const,
};

export const calculateButtonExpand = {
  gridColumn: " 1 / span 4",
  textAlign: "start" as const,
};

export const saveButton = {
  gridColumn: " 7/ span 4",
  textAlign: "start" as const,
};

export const saveButtonExpand = {
  gridColumn: " 5/ span 4",
  textAlign: "start" as const,
};
