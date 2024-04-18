import * as React from "react";
import { Dialog, DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import {
  ChoiceGroup,
  IChoiceGroupOption,
} from "@fluentui/react/lib/ChoiceGroup";
import { useBoolean } from "@fluentui/react-hooks";
import { DataProps } from "../../../base.interface";
import { CustomDialogProps } from "../dialog.base.interface";

const modelProps = {
  isBlocking: false,
  isModeless: true,
  isDarkOverlay: false,
  styles: { main: { maxWidth: 550 } },
};

type DialogChoiceProps = CustomDialogProps & {
  choices: DataProps[];
  maxAllowed?: number;
};

export const DialogChoiceComponent: React.FC<DialogChoiceProps> = ({
  ...props
}) => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(false);
  const dialogContentProps = {
    type: DialogType.largeHeader,
    title: props.title || "Select an option",
    subText: props.subtext || "Select an option from the list below",
  };

  const options: IChoiceGroupOption[] = props.choices.map((option) => ({
    key: option.Id,
    text: option.Name + " (" + option.Count + ")",
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
      props.onSelect(getSelectedOption.Id);
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
        <DefaultButton
          onClick={toggleHideDialog}
          text={props.secondaryButtonText || "Cancel"}
        />
        <PrimaryButton
          onClick={handleSave}
          text={props.primaryButtonText || "Select"}
        />
      </DialogFooter>
    </Dialog>
  );

  return <>{dialogComponent}</>;
};
