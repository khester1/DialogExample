import React, { useState } from "react";
import { TextField, IconButton, ITextFieldProps } from "@fluentui/react";
import {
  readonlyTextFieldStyle,
  textFieldStyle,
} from "./text-field.workflow.component.styles";

export interface ExtendedTextFieldCustomProps extends ITextFieldProps {
  highlightColor?: string;
  customTextColor?: string; // Add custom text color prop
  textAlign?: "left" | "center" | "right";
  fieldType?: "text" | "decimal" | "number";
  showDollarSign?: boolean;
  showPercent?: boolean;
  useCommas?: boolean; // Add flag for comma formatting
  overrideReadOnlyFontWeight?: boolean;
}

const TextFieldWorkflowComponent: React.FC<ExtendedTextFieldCustomProps> = (
  props
) => {
  const {
    value = "",
    onChange,
    showPercent = false,
    showDollarSign = false,
    useCommas = false,
    highlightColor,
    textAlign = "left",
    readOnly = false,
    disabled = false,
    fieldType = "text",
    underlined = false,
    overrideReadOnlyFontWeight = false,
    ...restProps
  } = props;

  // Helper function to format the value
  const formatValue = (
    input: string,
    isPercent: boolean,
    isDollar: boolean,
    useCommas: boolean
  ): string => {
    if (input === "") return ""; // Empty input stays empty

    const sanitizedInput = input.replace(/,/g, ""); // Remove commas before parsing
    const numericValue = parseFloat(sanitizedInput);

    if (isNaN(numericValue)) return input; // If not a valid number, return raw input

    // Format as percentage
    if (isPercent) return (numericValue * 100).toFixed(1);

    // Format as currency or add commas
    if (isDollar || useCommas) {
      return numericValue.toLocaleString("en-US", {
        minimumFractionDigits: isDollar ? 2 : 0,
        maximumFractionDigits: isDollar ? 2 : 0,
      });
    }

    // Default to plain number
    return numericValue.toString();
  };

  const parseInputValue = (input: string): string => {
    if (!input || isNaN(Number(input.replace(/,/g, "")))) return input;
    return showPercent
      ? (parseFloat(input.replace(/,/g, "")) / 100).toString()
      : input.replace(/,/g, "");
  };

  // Validate the input based on `fieldType`
  const validateInput = (input: string): boolean => {
    const sanitizedInput = input.replace(/,/g, ""); // Remove commas for validation

    if (sanitizedInput === "") return true;

    if (showPercent) {
      // Allow values between 0–100 with up to one decimal place
      return /^(100(\.0{0,1})?|[0-9]{1,2}(\.[0-9]?)?)?$/.test(sanitizedInput);
    }

    switch (fieldType) {
      case "decimal":
        return /^-?\d*\.?\d*$/.test(sanitizedInput); // Allow numbers with decimals
      case "number":
        return /^-?\d*$/.test(sanitizedInput); // Allow whole numbers only
      default:
        return true; // Allow any text
    }
  };

  const [inputValue, setInputValue] = useState<string>(() => {
    if (value !== null && value !== undefined) {
      return formatValue(
        value.toString(),
        showPercent,
        showDollarSign,
        useCommas
      );
    }
    return "";
  });

  const handleInputChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    if (newValue === undefined) return;

    if (newValue === "") {
      setInputValue("");
      if (onChange) {
        onChange(event, "");
      }
      return;
    }

    const sanitizedValue = newValue.replace(/,/g, "");

    if (validateInput(sanitizedValue)) {
      setInputValue(newValue); // Keep the value with commas during editing
      if (onChange) {
        onChange(event, sanitizedValue); // Pass sanitized value to the parent
      }
    }
  };

  const handleBlur = () => {
    if (inputValue === "") return; // Do nothing if the field is empty

    const sanitizedValue = parseInputValue(inputValue); // Sanitize the value
    const formattedValue = formatValue(
      sanitizedValue,
      showPercent,
      showDollarSign,
      useCommas
    );

    setInputValue(formattedValue);
  };

  const appliedBackgroundColor =
    inputValue && highlightColor ? highlightColor : "transparent";

  const fontWeight = overrideReadOnlyFontWeight ? "bold" : "lighter";

  return (
    <div
    //   style={{ position: "relative", display: "flex", alignItems: "center" }}
    >
      <TextField
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        readOnly={readOnly}
        disabled={disabled}
        prefix={showDollarSign && !showPercent ? "$" : undefined}
        suffix={showPercent ? "%" : undefined}
        underlined={underlined}
        style={{
          ...(readOnly ? readonlyTextFieldStyle : textFieldStyle),
          backgroundColor: appliedBackgroundColor,
          textAlign: textAlign,
          fontWeight: fontWeight, // Apply the conditional font weight
          color: props.customTextColor || "inherit",
        }}
        {...restProps}
      />
    </div>
  );
};

export default TextFieldWorkflowComponent;
