// src/components/CommandBar/CommandBarComponent.tsx
import * as React from "react";
import { CommandBar, ICommandBarProps } from "@fluentui/react/lib/CommandBar";
import { Stack, IStackStyles } from "@fluentui/react";
import { dynamicsTheme } from "../styles/theme";

// Define props for the CommandBar
type CommandBarProps = ICommandBarProps & {};

// Define the CommandBarComponent
export const CommandBarComponent: React.FC<CommandBarProps> = (props) => {
  // Define Stack styles for layout
  const stackStyles: IStackStyles = {
    root: {
     // borderRight: "1px solid",
      borderRightColor: dynamicsTheme.palette.neutralLight,
      // borderLeft: "1px solid",
      borderLeftColor: dynamicsTheme.palette.neutralLight,
    },
  };

  const commandBarStyles = {
    padding: "0 0px 0 0px", // You can adjust padding if necessary
  };

  return (
    <Stack styles={stackStyles}>
      <CommandBar {...props} styles={{ root: commandBarStyles }} />
    </Stack>
  );
};
