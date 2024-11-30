import * as React from "react";
import { Dialog, DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import { useId } from "@fluentui/react-hooks";
import { IModalStyles } from "@fluentui/react";
import "./DialogComponent.css"; // Import custom CSS

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

// Updated styles
const dialogStyles: IModalStyles = {
  root: undefined, // No custom styles for the root container
  main: {
    width: "90vw",
    maxWidth: "1000px",
    minWidth: "1000px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1000,
  },
  scrollableContent: undefined, // No custom styles for scrollable content
  keyboardMoveIconContainer: undefined, // No custom styles for keyboard move icon container
  keyboardMoveIcon: undefined, // No custom styles for keyboard move icon
  layer: {
    // position: "fixed",
    // top: "0",
    // left: "0",
    // height: "100vh",
    // width: "100vw",
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
  },
};

export const DialogComponent: React.FC<DialogProps> = ({
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
      isModeless: false,
      isDarkOverlay: true,
      styles: dialogStyles,
      className: "custom-dialog", // Add custom class
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
      modalProps={modalProps}
    >
      {options ? (
        options
      ) : (
        <DialogFooter>
          <DefaultButton onClick={cancel} text={cancelButtonText} />
          <PrimaryButton onClick={confirm} text={confirmButtonText} />
        </DialogFooter>
      )}
    </Dialog>
  );
};
