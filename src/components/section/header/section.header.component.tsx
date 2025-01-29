// src/components/header/SectionHeaderComponent.tsx
import React from "react";
import { mergeStyles } from "@fluentui/react";
import { ICommandBarItemProps, CommandBar } from "@fluentui/react";
import {
  ButtonCommandBarComponent,
  ButtonCommandBarProps,
} from "../../button/commandbar/button.commandbar.component";
import { sharedTitleStyles } from "../../styles/commonStyles";

interface SectionHeaderProps {
  text?: string;
  statusText?: string; // New prop for saved/unsaved status
  showCommandBar?: boolean;
  commandBarItems?: ICommandBarItemProps[];
  useCommandBarButton?: boolean;
  buttonProps?: ButtonCommandBarProps;
}

// Styles for the main header container
const headerClass = mergeStyles({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "nowrap",
  borderBottom: "1px solid #EDEBE9",
  marginBottom: "16px",
  minHeight: "48px",
  width: "100%",
});

// Styles for the title text
const titleClass = mergeStyles(sharedTitleStyles, {
  display: "flex",
  alignItems: "center",
});

// Styles for the status text
const statusTextClass = mergeStyles({
  marginLeft: "8px",
  fontSize: "0.9em",
  color: "#6c757d", // Light gray color for "Saved" or "Unsaved"
});

const SectionHeaderComponent: React.FC<SectionHeaderProps> = ({
  text,
  statusText,
  showCommandBar = false,
  commandBarItems = [],
  useCommandBarButton = false,
  buttonProps,
}) => {
  // Example: Assuming commandBarItems are divided into primary and overflowItems (those that move to the ellipsis)
  const overflowItems: ICommandBarItemProps[] =
    commandBarItems.length > 2 ? commandBarItems.slice(2) : [];

  return (
    <div className={headerClass}>
      {/* Render the title and optional status text */}
      <div className={titleClass}>
        {!useCommandBarButton && text && <span>{text}</span>}
        {statusText && <span className={statusTextClass}>{statusText}</span>}
      </div>

      {/* Render the CommandBar or button if specified */}
      {useCommandBarButton && buttonProps && (
        <ButtonCommandBarComponent {...buttonProps} />
      )}

      {showCommandBar && (
        <CommandBar
          items={commandBarItems.slice(0, 2)} // Primary items
          overflowItems={overflowItems} // Overflow items
          overflowButtonProps={{ ariaLabel: "More commands" }}
        />
      )}
    </div>
  );
};

export default SectionHeaderComponent;
