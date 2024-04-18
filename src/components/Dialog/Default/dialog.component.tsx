import * as React from "react";
import { Dialog, DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import { useId, useBoolean } from "@fluentui/react-hooks";
import styles from "./dialog.module.css";
import { CustomDialogProps } from "../dialog.base.interface";

const dialogStyles = { main: { maxWidth: 450 } };

type DialogProps = CustomDialogProps & {
  maxAllowedCount: number;
  onSelect: (newValue: boolean) => void;
};

export const DialogComponent: React.FC<DialogProps> = ({
  onSelect: onValueChange,
  maxAllowedCount: maxDetails,
  subtext,
  ...props
}) => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(false);
  const labelId: string = useId("dialogLabel");
  const subTextId: string = useId("subTextLabel");

  const dialogContentProps = {
    type: DialogType.largeHeader,
    title: props.title || "Dialog",
    subText: subtext,
  };

  const modalProps = React.useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      isModeless: true,
      isDarkOverlay: false,
      styles: dialogStyles,
    }),
    [labelId, subTextId]
  );

  const confirm = () => {
    const newValue = true;
    toggleHideDialog();
    onValueChange(newValue);
  };

  const cancel = () => {
    const newValue = false;
    toggleHideDialog();
    onValueChange(newValue);
  };

  return (
    <>
      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
      >
        <DialogFooter>
          <DefaultButton
            onClick={cancel}
            text={props.secondaryButtonText || "Cancel"}
          />
          <PrimaryButton
            onClick={confirm}
            text={props.primaryButtonText || "Confirm"}
          />
        </DialogFooter>
      </Dialog>
    </>
  );
};
