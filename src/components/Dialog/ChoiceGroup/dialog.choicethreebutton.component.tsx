import * as React from "react";
import { Dialog, DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import {
  ChoiceGroup,
  IChoiceGroupOption,
} from "@fluentui/react/lib/ChoiceGroup";
import { useBoolean } from "@fluentui/react-hooks";
import { DialogProps } from "../dialog.base.interface";

const modelProps = {
  isBlocking: false,
  isModeless: true,
  isDarkOverlay: false,
  styles: { main: { maxWidth: 550 } },
};

type ChildComponentProps = {
  options: DialogProps[];
  onSelect: (newValue: string) => void;
  subtext?: string;
};

export const DialogChoiceThreeButtonComponent: React.FC<
  ChildComponentProps
> = ({ options: dialogOptions, subtext, onSelect: onSelect }) => {
  const [hideDialog, { toggle: closeDialog }] = useBoolean(false);
  const dialogContentProps = {
    type: DialogType.largeHeader,
    title: "Multiple Choice Options",
    subText: subtext,
  };
  const options: IChoiceGroupOption[] = dialogOptions.map((option) => ({
    key: option.Id,
    text: option.Name + " (" + option.CandidateCount + ")",
  }));
  const [selectedOption, setSelectedOption] = React.useState<any>(
    options[0].key
  );

  const merge = () => {
    closeDialog();
    const getSelectedOption = dialogOptions.find(
      (tearSheet) => tearSheet.Id === selectedOption
    );

    if (getSelectedOption) {
      onSelect(selectedOption);
    }
  };

  const Create = () => {
    closeDialog();
    const selectedTearSheet = dialogOptions.find(
      (tearSheet) => tearSheet.Id === selectedOption
    );

    if (selectedTearSheet) {
      onSelect("Create");
    }
  };

  const Cancel = () => {
    closeDialog();
    onSelect("Cancel");
  };

  const onChange = (
    ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
    option?: IChoiceGroupOption
  ): void => {
    if (option) {
      setSelectedOption(option.key);
    }
  };

  let dialogComponent = (
    <Dialog
      hidden={hideDialog}
      onDismiss={closeDialog}
      dialogContentProps={dialogContentProps}
      modalProps={modelProps}
    >
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
    </Dialog>
  );

  return <>{dialogComponent}</>;
};
