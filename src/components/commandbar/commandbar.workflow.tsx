import React from "react";
import { Stack, IStackStyles, ICommandBarItemProps } from "@fluentui/react";
import { dynamicsTheme } from "../styles/theme";
import { CommandBarComponent } from "./commandbar.component";

interface CommandComponentProps {
  reverse?: boolean; // Add a prop to control the order
  stackSpacing?: number; // Add a prop to control the spacing
}

const CommandBarWorkflowComponent: React.FC<CommandComponentProps> = ({
  reverse,
  stackSpacing = 10,
}) => {
  const justifyContent = reverse ? "flex-end" : "flex-start";
  // Custom styles to align items inline
  const stackStyles: IStackStyles = {
    root: {
      display: "flex",
      flexDirection: "row", // Flex direction is always row but justifyContent controls alignment
      justifyContent: justifyContent, // Dynamically adjust based on reverse
      alignItems: "center",
      width: "100%",
      borderBottom: "1px solid",
      borderBottomColor: dynamicsTheme.palette.neutralLight,
    },
  };

  let items = [
    {
      key: "newItem",
      text: "New",
      iconProps: { iconName: "Add" },
    },
  ];

  return (
    <Stack
      horizontal
      styles={stackStyles}
      tokens={{ childrenGap: stackSpacing }}
    >
      <CommandBarComponent items={items} />
    </Stack>
  );
};

export default CommandBarWorkflowComponent;
