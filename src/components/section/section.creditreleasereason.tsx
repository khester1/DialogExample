import React from "react";
import SectionComponent from "./section.component";
import FormComponent from "../form/form.component";
import { LabelComponent } from "../label/label.component";
import { ComboBoxSingleComponent } from "../combobox/single/combobox.single.component";
import { IComboBoxOption, IComboBoxStyles } from "@fluentui/react";

interface ReasonFormProps {
  options: IComboBoxOption[];
  onValueChange: (value: string) => void; // Callback to parent
}

const ReasonFormComponent: React.FC<ReasonFormProps> = ({
  options,
  onValueChange,
}) => {
  const comboBoxProps = {
    options: options,
    allowFreeInput: true,
    autoComplete: "on",
    selectedKey: undefined,
    onChange: onValueChange,
    styles: { root: { maxWidth: 1300 } } as Partial<IComboBoxStyles>,
  };

  return (
    <FormComponent>
      <SectionComponent columnSpan={12} columnStart={1} rowPosition={1}>
        <div style={{ gridColumn: "1 / span 4", gridRow: "1" }}>
          <LabelComponent text="Credit Release Reason" />
        </div>
        <div style={{ gridColumn: "5 / span 8", gridRow: "1" }}>
          <ComboBoxSingleComponent {...comboBoxProps} />
        </div>
      </SectionComponent>
    </FormComponent>
  );
};

export default ReasonFormComponent;
