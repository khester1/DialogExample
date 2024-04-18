import React, { useMemo } from "react";
import {
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
  ContextualMenu,
} from "@fluentui/react";
import styles from "./dialog.alert.module.css";
import { CustomDialogProps } from "../dialog.base.interface";

// Custom hook for managing boolean states
function useBoolean(
  defaultValue: boolean
): [
  boolean,
  { setTrue: () => void; setFalse: () => void; toggle: () => void }
] {
  const [value, setValue] = React.useState(defaultValue);

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  const toggle = () => setValue((v) => !v);

  return [value, { setTrue, setFalse, toggle }];
}

// Use modal props with explicit type annotations
const useModalProps = (
  isDraggable: boolean,
  labelId: string,
  subTextId: string
) =>
  useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      styles: { main: styles.dialogMain },
      isModeless: true,
      isDarkOverlay: false,
      dragOptions: isDraggable
        ? {
            moveMenuItemText: "Move",
            closeMenuItemText: "Close",
            menu: ContextualMenu,
            keepInBounds: true,
          }
        : undefined,
    }),
    [isDraggable, labelId, subTextId]
  );

export const DialogAlertComponent: React.FC<CustomDialogProps> = ({
  onSelect: onValueChange,
  subtext,
  title,
  primaryButtonText: buttonText,
}) => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(false);
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
  const labelId = React.useId();
  const subTextId = React.useId();

  const dialogContentProps = {
    type: DialogType.largeHeader,
    title: title || "Alert",
    subText: subtext,
  };

  const modalProps = useModalProps(isDraggable, labelId, subTextId);

  const updateValue = () => {
    toggleHideDialog();
    onValueChange("Success");
  };

  return (
    <Dialog
      hidden={hideDialog}
      onDismiss={toggleHideDialog}
      dialogContentProps={dialogContentProps}
      modalProps={modalProps}
    >
      <DialogFooter>
        <PrimaryButton onClick={updateValue} text={buttonText || "Ok"} />
      </DialogFooter>
    </Dialog>
  );
};
