// src/components/SectionComponent.tsx
import React from "react";
import { IStackProps, Stack } from "@fluentui/react";
import SectionHeaderComponent from "./header/section.header.component";
import { ICommandBarItemProps } from "@fluentui/react";

interface SectionProps {
  title?: string;
  showCommandBar?: boolean;
  commandBarItems?: ICommandBarItemProps[];
  useCommandBarButton?: boolean;
  children?: React.ReactNode;
  columnSpan: number;
  rowPosition?: number;
  columnStart?: number;
  stackProps?: IStackProps;
  internalColumnCount?: number;
  notification?: React.ReactNode;
  statusText?: string; // New prop to pass status text to SectionHeaderComponent
}

const SectionComponent: React.FC<SectionProps> = ({
  title,
  showCommandBar = false,
  commandBarItems = [],
  useCommandBarButton = false,
  children,
  columnSpan,
  rowPosition,
  columnStart,
  stackProps = {},
  internalColumnCount = 12,
  notification,
  statusText, // New prop
}) => {
  const gridStyles: React.CSSProperties = {
    gridColumn: columnStart
      ? `${columnStart} / span ${columnSpan}`
      : `span ${columnSpan}`,
    ...(rowPosition && { gridRowStart: rowPosition }),
  };

  const combinedStyles: React.CSSProperties = {
    background: "#ffffff",
    // boxShadow:
    //   "0 1.6px 3.6px rgba(0, 0, 0, 0.11), 0 0.3px 0.9px rgba(0, 0, 0, 0.13)",
    borderRadius: "4px",
    padding: "3px 20px 20px 20px",
    minWidth: "300px",
    width: "100%",
    overflow: "hidden",
    ...gridStyles,
  };

  const internalGridStyles: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${internalColumnCount}, 1fr)`,
    gap: "7px",
  };

  return (
    <Stack {...stackProps} style={combinedStyles}>
      {/* Notification */}
      {notification && (
        <div style={{ marginBottom: "8px" }}>{notification}</div>
      )}

      {/* Section Header with Title, Status, and Command Bar */}
      {(title || showCommandBar || useCommandBarButton) && (
        <SectionHeaderComponent
          text={title || ""}
          showCommandBar={showCommandBar}
          commandBarItems={commandBarItems}
          useCommandBarButton={useCommandBarButton}
          statusText={statusText} // Pass statusText to SectionHeaderComponent
        />
      )}

      {/* Render children */}
      <div style={internalGridStyles}>{children}</div>
    </Stack>
  );
};

export default SectionComponent;
