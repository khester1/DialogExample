import * as React from "react";
import { Dialog, DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import {
  ChoiceGroup,
  IChoiceGroupOption,
} from "@fluentui/react/lib/ChoiceGroup";
import { useBoolean } from "@fluentui/react-hooks";
import { DialogProps } from "../../../base.interface";

const modelProps = {
  isBlocking: false,
  isModeless: true,
  isDarkOverlay: false,
  styles: { main: { maxWidth: 550 } },
};

type DialogChoiceProps = {
  choices: DialogProps[];
  onSelect: (choice: DialogProps) => void;
  subtext?: string;
  maxAllowed?: number;
};

export const DialogChoiceComponent: React.FC<DialogChoiceProps> = ({
  ...props
}) => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(false);
  const dialogContentProps = {
    type: DialogType.largeHeader,
    title: "Two Choice Options",
    subText: props.subtext,
  };
  // If CandidateCount is 0, then disable the option
  const options: IChoiceGroupOption[] = props.choices.map((option) => ({
    key: option.Id,
    text: option.Name + " (" + option.CandidateCount + ")",
    disabled:
      option?.CandidateCount?.toString() === props.maxAllowed?.toString(),
  }));

  const [selectedOption, setSelectedOption] = React.useState<any>(() => {
    const firstEnabledOption = options.find((option) => !option.disabled);
    return firstEnabledOption ? firstEnabledOption.key : options[0].key;
  });

  const handleSave = () => {
    toggleHideDialog();
    const getSelectedOption = props.choices.find(
      (option) => option.Id === selectedOption
    );

    if (getSelectedOption) {
      props.onSelect(getSelectedOption);
    }
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
      onDismiss={toggleHideDialog}
      dialogContentProps={dialogContentProps}
      modalProps={modelProps}
    >
      <ChoiceGroup
        defaultSelectedKey={selectedOption}
        options={options}
        onChange={onChange}
      />
      <DialogFooter>
        <DefaultButton onClick={toggleHideDialog} text="Cancel" />
        <PrimaryButton onClick={handleSave} text="Select" />
      </DialogFooter>
    </Dialog>
  );

  return <>{dialogComponent}</>;
};
