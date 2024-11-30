import * as React from "react";
import { Dialog, DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import { useId } from "@fluentui/react-hooks";
import { mergeStyles } from "@fluentui/react";

const dialogMainStyle = mergeStyles({
  width: "90vw !important",
  maxWidth: "600px !important",
  minWidth: "600px !important",
  height: "80vh !important",
  maxHeight: "calc(100% - 50px) !important",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
  overflow: "visible",
});

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
      styles: {
        main: dialogMainStyle, // Apply custom merged styles
      },
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
