import { IButtonStyles, IContextualMenuProps, IIconProps } from "@fluentui/react";

export interface IButtonProps {
  isPrimary?: boolean;
  checked?: boolean;
  disabled?: boolean;
  text?: string;
  tooltip?: string;
  menuProps?: IContextualMenuProps;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface CustomIconStyles {
  root: {
    color?: string;
  };
}


// Extending IIconProps to include custom styles
export interface CustomIconProps extends IIconProps {
  styles?: CustomIconStyles;
}

export interface IButtonIconProps extends IButtonProps {
  iconName?: string;
  iconColor?: string; // Consider removing if using CustomIconProps fully for color
  iconProps?: CustomIconProps; // Use the extended interface with custom styles
  styles?: IButtonStyles; // Add this line to include custom styles
}
