import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { useBoolean } from '@fluentui/react-hooks';
import styles from './dialog.choice.module.css';
import { on } from 'events';

interface TearSheet {
  Id: string;
  Name: string;
  CandidateCount: string;
}

const modelProps = {
  isBlocking: false,
  isModeless: true,
  isDarkOverlay: false,
  styles: { main: { maxWidth: 550 } },
};

type ChildComponentProps = {
  tearSheets: TearSheet[];
  onTearSheetSelect: (tearSheet: TearSheet) => void;
  subtext?: string;
  maxAllowed?: number;
}

export const DialogChoiceComponent: React.FC<ChildComponentProps> = ({ ...props } ) => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(false);
  const dialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Merge Candidates',
    subText: props.subtext,
  };
  // If tearsheet.CandidateCount is 0, then disable the option
  const options: IChoiceGroupOption[] = props.tearSheets.map(tearSheet => ({

    key: tearSheet.Id,
    text: tearSheet.Name + " (" + tearSheet.CandidateCount + ")",
    disabled: tearSheet?.CandidateCount?.toString() === props.maxAllowed?.toString()
  }));

  const [selectedOption, setSelectedOption] = React.useState<any>(() => {
    const firstEnabledOption = options.find(option => !option.disabled);
    return firstEnabledOption ? firstEnabledOption.key : options[0].key;
  });
  
  const handleSave = () => {
    toggleHideDialog();
    const selectedTearSheet = props.tearSheets.find(tearSheet => tearSheet.Id === selectedOption);
    
    if (selectedTearSheet) {
      props.onTearSheetSelect(selectedTearSheet);
    }
  };

  const onChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption): void => {
    if (option) {
        setSelectedOption(option.key);
    }
};

  let dialogComponent =<Dialog
  hidden={hideDialog}
  onDismiss={toggleHideDialog}
  dialogContentProps={dialogContentProps}
  modalProps={modelProps}>
  <ChoiceGroup
   defaultSelectedKey={selectedOption}
    options={options} 
    onChange={onChange} // Set the onChange handler here
    />
  <DialogFooter>
    <DefaultButton onClick={toggleHideDialog} text="Cancel" />
    <PrimaryButton onClick={handleSave} text="Merge" />
  </DialogFooter>
</Dialog>;

  return (
    <>
      {dialogComponent}
    </>
  );
};
