import * as React from "react";
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
import { IStackTokens, Stack } from "@fluentui/react/lib/Stack";
import { Label } from "@fluentui/react/lib/Label";
import styles from "./progess.module.css";

type ChildComponentProps = {
  message: string;
};

export const ProgressSpinnerComponent: React.FC<ChildComponentProps> = ({
  message,
}) => {
  return (
    <div className={styles.spinnerContainer}>
      <Spinner size={SpinnerSize.large} label={message} />
    </div>
  );
};
