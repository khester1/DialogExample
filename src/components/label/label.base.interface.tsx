import { ILabelStyles } from "@fluentui/react";

export interface ILabelProps {
  text?: string;
  disabled?: boolean;
  required?: boolean;
  labelStyles?: ILabelStyles; // Custom styles prop
  isHeader?: boolean; // New prop for conditional header styling
  isBoldHeader?: boolean; // New prop for conditional bold header styling
}
