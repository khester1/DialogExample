import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { useId, useBoolean } from '@fluentui/react-hooks';
import { on } from 'events';

const dialogStyles = { main: { maxWidth: 450 } };


type ChildComponentProps = {
  value: number;
  onValueChange: (newValue: string) => void;
  subtext?: string;
}

export const DialogThreeButtonComponent: React.FC<ChildComponentProps> = ({value, subtext, onValueChange}) => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(false);
  const labelId: string = useId('dialogLabel');
  const subTextId: string = useId('subTextLabel');
  const numberOfCandidates = 0;

  const dialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Merge or Create Tear Sheet',
    closeButtonAriaLabel: 'Close',
    subText: subtext,
  };

  const modalProps = React.useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      isModeless: true,
      isDarkOverlay: false,
      styles: dialogStyles
    }),
    [labelId, subTextId],
  );

const Cancel = () => { 
    toggleHideDialog();
    onValueChange("Cancel");
}

const Merge = () => {
    toggleHideDialog();
onValueChange("Merge");
  }

const Create = () => {
    toggleHideDialog();
onValueChange("Create");
}

  return (
    <>
      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
      >
        <DialogFooter>
          <DefaultButton onClick={Cancel} text="Cancel" />
          <DefaultButton onClick={Merge} text="Merge" />
          <PrimaryButton onClick={Create} text="New" />
        </DialogFooter>
      </Dialog>
    </>
  );
};
