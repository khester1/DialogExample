import React from "react";
import { Label, ILabelStyles } from "@fluentui/react";

export interface ILabelProps {
  text?: string;
  disabled?: boolean;
  required?: boolean;
  labelStyles?: ILabelStyles; // Custom styles prop
  isHeader?: boolean; // New prop for conditional header styling
  isBoldHeader?: boolean; // New prop for conditional bold header styling
  onClick?: () => void; // Handle click events
}

export const LabelWorkflowComponent: React.FC<
  ILabelProps & { boldParts?: string[] }
> = ({
  text,
  disabled,
  required,
  labelStyles,
  isHeader,
  isBoldHeader,
  onClick,
  boldParts = [],
}) => {
  const defaultStyles: ILabelStyles = {
    root: {
      fontSize: "14px",
      fontWeight: "400",
    },
  };

  const fullHeaderStyles: ILabelStyles = {
    root: {
      color: "#0078d4",
      fontWeight: "bold",
      textDecoration: "underline",
      fontSize: "14px",
      cursor: onClick ? "pointer" : "default", // Add pointer for clickable headers
    },
  };

  const boldHeaderStyles: ILabelStyles = {
    root: {
      fontWeight: "bold",
      fontSize: "14px",
    },
  };

  const getFinalStyles = (): ILabelStyles => {
    const finalStyles = { ...defaultStyles };

    if (isHeader) {
      finalStyles.root = Object.assign(
        {},
        finalStyles.root,
        fullHeaderStyles.root
      );
    } else if (isBoldHeader) {
      finalStyles.root = Object.assign(
        {},
        finalStyles.root,
        boldHeaderStyles.root
      );
    }

    if (labelStyles) {
      finalStyles.root = Object.assign({}, finalStyles.root, labelStyles.root);
    }

    return finalStyles;
  };

  const formatText = (text: string | undefined): React.ReactNode => {
    const safeText = text || "";

    if (!boldParts.length) {
      return safeText;
    }

    const parts = safeText.split(new RegExp(`(${boldParts.join("|")})`, "gi"));

    return parts.map((part, index) =>
      boldParts.includes(part) ? <strong key={index}>{part}</strong> : part
    );
  };

  return (
    <Label
      onClick={onClick}
      disabled={disabled}
      required={required}
      styles={getFinalStyles()}
    >
      {formatText(text)}
    </Label>
  );
};
