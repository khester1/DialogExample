// src/components/LabelComponent.tsx
import React from "react";
import { Label, ILabelStyles } from "@fluentui/react";
import { ILabelProps } from "./label.base.interface";

export const LabelComponent: React.FC<ILabelProps> = ({
  text,
  disabled,
  required,
  labelStyles,
  isHeader, // Full header style with color and underline
  isBoldHeader, // Bold header style without color or underline
}) => {
  const defaultStyles: ILabelStyles = {
    root: {
      fontSize: "14px",
      fontWeight: "400",
    },
  };

  // Define full header styles (color, bold, underline)
  const fullHeaderStyles: ILabelStyles = {
    root: {
      color: "#0078d4", // Blue color
      fontWeight: "bold",
      textDecoration: "underline",
      fontSize: "14px",
    },
  };

  // Define bold header styles (bold, font size, no color or underline)
  const boldHeaderStyles: ILabelStyles = {
    root: {
      fontWeight: "bold",
      fontSize: "14px",
    },
  };

  // Determine final styles based on props using Object.assign
  const getFinalStyles = (): ILabelStyles => {
    // Start with default styles
    const finalStyles = { ...defaultStyles };

    // Apply full header styles if `isHeader` is true
    if (isHeader) {
      finalStyles.root = Object.assign(
        {},
        finalStyles.root,
        fullHeaderStyles.root
      );
    }
    // Apply bold header styles if `isBoldHeader` is true
    else if (isBoldHeader) {
      finalStyles.root = Object.assign(
        {},
        finalStyles.root,
        boldHeaderStyles.root
      );
    }

    // Merge in any custom `labelStyles` from props
    if (labelStyles) {
      finalStyles.root = Object.assign({}, finalStyles.root, labelStyles.root);
    }

    return finalStyles;
  };

  return (
    <Label disabled={disabled} required={required} styles={getFinalStyles()}>
      {text}
    </Label>
  );
};
