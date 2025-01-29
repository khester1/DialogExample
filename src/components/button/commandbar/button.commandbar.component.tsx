// src/components/button/ButtonCommandBarComponent.tsx
import * as React from "react";
import { IContextualMenuProps, IIconProps } from "@fluentui/react";
import { CommandBarButton, IButtonStyles } from "@fluentui/react/lib/Button";
import { IButtonProps } from "../button.base.interface";
import { sharedTitleStyles } from "../../styles/commonStyles";


export interface ButtonCommandBarProps extends IButtonProps  {
  iconName?: string;
  iconColor?: string;
  menuProps?: IContextualMenuProps;
};

export const ButtonCommandBarComponent: React.FC<ButtonCommandBarProps> = ({
  iconName,
  iconColor,
  menuProps,
  ...otherProps
}) => {

  const iconProps: IIconProps = iconName ? {
    iconName,
    styles: iconColor ? { root: { color: iconColor } } : {},
  } : {};

  // Apply shared styles to the button's text
  const buttonStyles: Partial<IButtonStyles> = {
    root: {
      ...sharedTitleStyles, // Apply the shared styles here
      paddingBottom: 0,
      marginBottom: 0,
    },
    label: {
      ...sharedTitleStyles, // Ensure the button label uses the same font settings
    }
  };

  return (
    <CommandBarButton
      {...otherProps}
      {...(iconName && { iconProps })}
      {...(menuProps && { menuProps })}
      styles={buttonStyles} // Apply custom styles to CommandBarButton
    />
  );
};
