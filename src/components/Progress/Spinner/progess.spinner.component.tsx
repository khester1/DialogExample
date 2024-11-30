import * as React from "react";
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
import { IStackTokens, Stack } from "@fluentui/react/lib/Stack";
import { Label } from "@fluentui/react/lib/Label";

type ChildComponentProps = {
  message: string;
};

const styles = {
  spinnerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};

export const ProgressSpinnerComponent: React.FC<ChildComponentProps> = ({
  message,
}) => {
  return (
    <div style={styles.spinnerContainer}>
      <Spinner size={SpinnerSize.large} label={message} />
    </div>
  );
};
