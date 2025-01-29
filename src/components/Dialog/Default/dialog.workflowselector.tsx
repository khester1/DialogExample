import * as React from "react";
import { Dialog, DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import { useId } from "@fluentui/react-hooks";
import { mergeStyles } from "@fluentui/react"; // Import mergeStyles
import styles from "./dialog.module.css";

type DialogProps = {
  onValueChange: (newValue: boolean) => void;
  subtext?: string;
  hidden: boolean;
  toggleHideDialog: () => void;
  title: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  options?: React.ReactNode;
  minWidth?: string;
};

export const DialogWorkflowComponent: React.FC<DialogProps> = ({
  onValueChange,
  subtext,
  hidden,
  toggleHideDialog,
  title,
  cancelButtonText = "Cancel",
  confirmButtonText = "Submit",
  options,
  minWidth = "1000px",
}) => {
  const labelId: string = useId("dialogLabel");
  const subTextId: string = useId("subTextLabel");

  // Use mergeStyles to add !important dynamically
  const dialogClassName = mergeStyles({
    minWidth: `${minWidth} !important`,
    maxWidth: "100%",
  });

  const dialogContentProps = {
    type: DialogType.largeHeader,
    title: title,
    closeButtonAriaLabel: "Close",
    subText: subtext,
  };

  const modalProps = React.useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      isModeless: true,
      isDarkOverlay: false,
      styles: { main: dialogClassName }, // Apply merged styles
    }),
    [labelId, subTextId, dialogClassName]
  );

  const confirm = () => {
    onValueChange(true);
    toggleHideDialog();
  };

  const cancel = () => {
    onValueChange(false);
    toggleHideDialog();
  };

  return (
    <Dialog
      hidden={hidden}
      onDismiss={toggleHideDialog}
      dialogContentProps={dialogContentProps}
      modalProps={modalProps} // Use the modified modalProps
    >
      {options ? (
        options // Render custom components passed via the options prop
      ) : (
        <DialogFooter>
          <DefaultButton onClick={cancel} text={cancelButtonText} />
          <PrimaryButton onClick={confirm} text={confirmButtonText} />
        </DialogFooter>
      )}
    </Dialog>
  );
};
