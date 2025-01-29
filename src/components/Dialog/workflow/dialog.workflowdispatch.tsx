import React, { useState, useMemo, useCallback, useEffect } from "react";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { useBoolean } from "@fluentui/react-hooks";

import { DialogFooter } from "@fluentui/react";

import { SearchWorkflowComponent } from "../../searchBox/search.worrkflowcomponent";

import { LabelWorkflowComponent } from "../../field/label.workflow.component";
import TextFieldWorkflowComponent from "../../text-field/text-field.workflow.component";
import SectionWorkflowComponent from "../../section/section.workflow.component";
import FormWorkflowComponent from "../../form/form.workflow.component";
import { DialogWorkflowComponent } from "../default/dialog.workflowselector";

const carrierOptions = [
  { key: "1", name: "Option 1" },
  { key: "2", name: "Option 2" },
  { key: "3", name: "Option 3" },
];

const driverOptions = [
  { key: "4", name: "Option 4" },
  { key: "5", name: "Option 5" },
  { key: "6", name: "Option 6" },
];

const DialogWorkflowDispatchSelector: React.FC = () => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(false);
  const [formValue, setFormValue] = React.useState("");
  const [notification, setNotification] = useState<React.ReactNode | null>(
    null
  );
  const handleValueChange = (newValue: boolean) => {
    console.log("Dialog value changed:", newValue);
    console.log("Form value:", formValue);
  };

  const handleCarrierSearch = (
    option: { key: string; name: string } | null
  ) => {
    console.log("Selected option:", option);
  };
  const handleDriverSearch = (option: { key: string; name: string } | null) => {
    console.log("Selected option:", option);
  };

  return (
    <>
      <PrimaryButton text="Open Dialog" onClick={toggleHideDialog} />
      <DialogWorkflowComponent
        title="Transportation Assignment"
        onValueChange={handleValueChange}
        hidden={hideDialog}
        toggleHideDialog={toggleHideDialog}
        minWidth="800px"
        options={
          <div>
            <FormWorkflowComponent>
              <SectionWorkflowComponent
                columnSpan={12}
                columnStart={1}
                rowPosition={1}
                notification={notification}
              >
                <div style={{ gridColumn: "1 / span 2", gridRow: "1" }}>
                  <LabelWorkflowComponent text="Select Carrier" />
                </div>
                <div style={{ gridColumn: "3/ span 3", gridRow: "1" }}>
                  <SearchWorkflowComponent
                    options={carrierOptions}
                    onSearch={handleCarrierSearch}
                  />
                </div>
                <div style={{ gridColumn: "8 / span 4", gridRow: "1" }}>
                  <LabelWorkflowComponent text="Certificate of Insurance: 6/4/2025" />
                </div>
                <div style={{ gridColumn: "8 / span 4", gridRow: "2" }}>
                  <LabelWorkflowComponent text="Service Agreement: 6/14/2023 - V2023" />
                </div>
                <div style={{ gridColumn: "1 / span 2", gridRow: "2" }}>
                  <LabelWorkflowComponent text="Select Driver" />
                </div>
                <div style={{ gridColumn: "3/ span 3", gridRow: "2" }}>
                  <SearchWorkflowComponent
                    options={driverOptions}
                    onSearch={handleDriverSearch}
                  />
                </div>
                <div style={{ gridColumn: "1 / span 2", gridRow: "3" }}>
                  <LabelWorkflowComponent text="Base Rate" />
                </div>
                <div style={{ gridColumn: "3 / span 2", gridRow: "3" }}>
                  <TextFieldWorkflowComponent
                    underlined={false}
                    textAlign="left"
                    fieldType="decimal"
                    overrideReadOnlyFontWeight={false}
                    showDollarSign={true}
                    value={""}
                    // onChange={(e) =>
                    //   handleFieldChange(
                    //     "stn_hoursotpayrate",
                    //     Number((e.target as HTMLInputElement).value) || 0
                    //   )
                    // }
                  />
                </div>

                <div style={{ gridColumn: "8 / span 4", gridRow: "3" }}>
                  <LabelWorkflowComponent
                    text="View Recent Orders"
                    isHeader
                    onClick={() => console.log("Header clicked!")}
                  />
                </div>
                <div style={{ gridColumn: "1 / span 2", gridRow: "4" }}>
                  <LabelWorkflowComponent text="% Fuel Subcharge" />
                </div>
                <div style={{ gridColumn: "3/ span 2", gridRow: "4" }}>
                  <TextFieldWorkflowComponent
                    underlined={false}
                    textAlign="left"
                    fieldType="decimal"
                    overrideReadOnlyFontWeight={false}
                    showDollarSign={true}
                    value={""}
                    // onChange={(e) =>
                    //   handleFieldChange(
                    //     "stn_hoursotpayrate",
                    //     Number((e.target as HTMLInputElement).value) || 0
                    //   )
                    // }
                  />
                </div>
                <div style={{ gridColumn: "6 / span 2", gridRow: "4" }}>
                  <LabelWorkflowComponent text="Applied Rate" />
                </div>
                <div style={{ gridColumn: "8/ span 2", gridRow: "4" }}>
                  <TextFieldWorkflowComponent
                    underlined={false}
                    textAlign="left"
                    fieldType="decimal"
                    overrideReadOnlyFontWeight={false}
                    showDollarSign={true}
                    readOnly={true}
                    value={""}
                    // onChange={(e) =>
                    //   handleFieldChange(
                    //     "stn_hoursotpayrate",
                    //     Number((e.target as HTMLInputElement).value) || 0
                    //   )
                    // }
                  />
                </div>
                <div style={{ gridColumn: "1 / span 2", gridRow: "5" }}>
                  <LabelWorkflowComponent text="Freight Addt'l" />
                </div>
                <div style={{ gridColumn: "3 / span 2", gridRow: "5" }}>
                  <TextFieldWorkflowComponent
                    underlined={false}
                    textAlign="left"
                    fieldType="decimal"
                    overrideReadOnlyFontWeight={false}
                    showDollarSign={true}
                    value={""}
                    // onChange={(e) =>
                    //   handleFieldChange(
                    //     "stn_hoursotpayrate",
                    //     Number((e.target as HTMLInputElement).value) || 0
                    //   )
                    // }
                  />
                </div>
              </SectionWorkflowComponent>
            </FormWorkflowComponent>
            <DialogFooter>
              <PrimaryButton
                onClick={() => handleValueChange(true)}
                text="Apply to Orders"
              />
              <DefaultButton
                onClick={toggleHideDialog}
                text="Cancel Workflow"
              />
              <DefaultButton onClick={toggleHideDialog} text="Complete" />
            </DialogFooter>
          </div>
        }
      />
    </>
  );
};

export default DialogWorkflowDispatchSelector;
