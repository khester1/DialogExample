import * as React from "react";
import { Dialog, DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import { useId, useBoolean } from "@fluentui/react-hooks";
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
};

const dialogStyles = {
  main: {
    width: "auto", // Let the dialog auto-size based on content
    minWidth: "1000px !important", // Optional: set a minimum width if needed
    maxWidth: "100%", // Optional: set a max width based on screen size
  },
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
}) => {
  const labelId: string = useId("dialogLabel");
  const subTextId: string = useId("subTextLabel");

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
      styles: dialogStyles, // Ensure dynamic width here
    }),
    [labelId, subTextId]
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
        // Render custom components passed via the options prop
        options
      ) : (
        // Default footer with Cancel and Confirm buttons
        <DialogFooter>
          <DefaultButton onClick={cancel} text={cancelButtonText} />
          <PrimaryButton onClick={confirm} text={confirmButtonText} />
        </DialogFooter>
      )}
    </Dialog>
  );
};
