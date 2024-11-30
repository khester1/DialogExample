import * as React from "react";
import { DefaultButton, PrimaryButton } from "@fluentui/react";
import { IButtonProps } from "../button.base.interface";

type ButtonDefaultProps = IButtonProps & {
  backgroundColor?: string;
  color?: string;
  disabled?: boolean; // Ensure disabled prop is passed down
};

export const ButtonDefaultComponent: React.FC<ButtonDefaultProps> = ({
  backgroundColor,
  color,
  isPrimary,
  disabled = false, // Default to false if disabled is not provided
  ...props
}) => {
  return (
    <>
      {isPrimary ? (
        <PrimaryButton
          {...props}
          style={{ backgroundColor, color }}
          disabled={disabled} // Ensure the disabled prop is passed
        />
      ) : (
        <DefaultButton
          {...props}
          style={{ backgroundColor, color }}
          disabled={disabled} // Ensure the disabled prop is passed
        />
      )}
    </>
  );
};
