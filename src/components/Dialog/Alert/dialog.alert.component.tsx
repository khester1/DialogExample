import * as React from "react";
import { Dialog, DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import { hiddenContentStyle, mergeStyles } from "@fluentui/react/lib/Styling";
import { Toggle } from "@fluentui/react/lib/Toggle";
import { ContextualMenu } from "@fluentui/react/lib/ContextualMenu";
import { useId, useBoolean } from "@fluentui/react-hooks";
import styles from "./dialog.module.css";

const dialogStyles = { main: { maxWidth: 450 } };
const dragOptions = {
  moveMenuItemText: "Move",
  closeMenuItemText: "Close",
  menu: ContextualMenu,
  keepInBounds: true,
};

type ChildComponentProps = {
  subtext?: string;
  onValueChange: (newValue: string) => void;
};

export const DialogAlertComponent: React.FC<ChildComponentProps> = ({
  onValueChange,
  subtext,
}) => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(false);
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
  const labelId: string = useId("dialogLabel");
  const subTextId: string = useId("subTextLabel");

  const dialogContentProps = {
    type: DialogType.largeHeader,
    title: "Limit Reached",
    closeButtonAriaLabel: "Close",
    subText: subtext,
  };

  const modalProps = React.useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      styles: dialogStyles,
      isModeless: true,
      isDarkOverlay: false,
      dragOptions: isDraggable ? dragOptions : undefined,
    }),
    [isDraggable, labelId, subTextId]
  );
  const updateValue = () => {
    toggleHideDialog();
    onValueChange("Success");
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
          <PrimaryButton onClick={updateValue} text="Ok" />
        </DialogFooter>
      </Dialog>
    </>
  );
};
