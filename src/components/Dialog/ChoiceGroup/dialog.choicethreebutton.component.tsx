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
  onTearSheetSelect: (newValue: string) => void;
  subtext?: string;
}

export const DialogChoiceThreeButtonComponent: React.FC<ChildComponentProps> = ({ tearSheets, subtext, onTearSheetSelect } ) => {
  const [hideDialog, { toggle: closeDialog }] = useBoolean(false);
  const dialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Merge or Create Tear Sheet',
    subText: subtext,
  };
  const options: IChoiceGroupOption[] = tearSheets.map(tearSheet => ({ key: tearSheet.Id, text: tearSheet.Name + " (" + tearSheet.CandidateCount + ")"}));
  const [selectedOption, setSelectedOption] = React.useState<any>(options[0].key); 
  
  const merge = () => {
    closeDialog();
    const selectedTearSheet = tearSheets.find(tearSheet => tearSheet.Id === selectedOption);
    
    if (selectedTearSheet) {
      onTearSheetSelect(selectedOption);
    }
  };

  const Create = () => {
    closeDialog();
    const selectedTearSheet = tearSheets.find(tearSheet => tearSheet.Id === selectedOption);
    
    if (selectedTearSheet) {
      onTearSheetSelect("Create");
    }
  };

  const Cancel = () => {
    closeDialog();
    onTearSheetSelect("Cancel");
  }

  const onChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption): void => {
    if (option) {
        setSelectedOption(option.key);
    }
};

  let dialogComponent =<Dialog
  hidden={hideDialog}
  onDismiss={closeDialog}
  dialogContentProps={dialogContentProps}
  modalProps={modelProps}>
  <ChoiceGroup
   defaultSelectedKey={options[0].key}
    options={options} 
    onChange={onChange}
    />
  <DialogFooter>
    <DefaultButton onClick={Cancel} text="Cancel" />
    <DefaultButton onClick={merge} text="Merge" />
    <PrimaryButton onClick={Create} text="New" />
  </DialogFooter>
</Dialog>;

  return (
    <>
      {dialogComponent}
    </>
  );
};
