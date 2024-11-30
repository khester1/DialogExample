import * as React from "react";
import { ComboBox } from "@fluentui/react";
import type {
  IComboBox,
  IComboBoxOption,
  IComboBoxStyles,
} from "@fluentui/react";
import { IComboBoxProps } from "../combobox.base.interface";

// Default ComboBox styles
const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 300 } };

export const ComboBoxSingleComponent: React.FC<IComboBoxProps> = ({
  onChange,
  ...props
}) => {
  // Handle ComboBox change
  const handleChange = React.useCallback(
    (
      event: React.FormEvent<IComboBox>,
      option?: IComboBoxOption,
      index?: number,
      value?: string
    ): void => {
      // Call the parent `onChange` callback with the selected or freeform value
      onChange?.(option?.key?.toString() ?? value ?? "");
    },
    [onChange]
  );

  return (
    <ComboBox
      label={props.label}
      options={props.options || []} // Dynamically set options
      styles={props.styles || comboBoxStyles}
      allowFreeInput={props.allowFreeInput ?? true}
      autoComplete={(props.autoComplete as "on" | "off" | undefined) || "on"}
      defaultSelectedKey={props.defaultSelectedKey}
      selectedKey={props.selectedKey}
      onChange={handleChange} // Pass the event handler
      errorMessage={props.errorMessage}
    />
  );
};
