import React, { useState } from "react";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { DialogFooter } from "@fluentui/react";
import { DetailsListWorkflowComponent } from "../../detailslist/detaillist.workflow.component";
import CommandBarWorkflowComponent from "../../commandbar/commandbar.workflow";
import { LabelWorkflowComponent } from "../../field/label.workflow.component";
import SectionWorkflowComponent from "../../section/section.workflow.component";
import FormWorkflowComponent from "../../form/form.workflow.component";
import { DialogWorkflowComponent } from "../default/dialog.workflowselector";

interface DialogWorkflowContractGridProps {
  isOpen: boolean; // Controls whether the dialog is visible
  onClose: () => void; // Callback for closing the dialog
}

const exampleItems = [
  {
    key: "1",
    contractnumber: "007-0234560-01",
    product: "AH",
    duedate: "2024-09-24",
    units: "136.40",
    pending: "75.00",
    estimatedremaining: "61.4",
    price: "$96.00",
    percentremaining: "45%",
    id: "1",
  },
  {
    key: "2",
    contractnumber: "007-0234560-02",
    product: "AH",
    duedate: "2024-10-24",
    units: "136.36",
    pending: "0.00",
    estimatedremaining: "136.36",
    price: "$96.00",
    percentremaining: "100%",
    id: "2",
  },
];

const DialogWorkflowContractGrid: React.FC<DialogWorkflowContractGridProps> = ({
  isOpen,
  onClose,
}) => {
  const [formValue, setFormValue] = useState("");
  const [notification, setNotification] = useState<React.ReactNode | null>(
    null
  );

  const handleValueChange = (newValue: boolean) => {
    console.log("Dialog value changed:", newValue);
    console.log("Form value:", formValue);
  };

  return (
    <DialogWorkflowComponent
      title="Find Contracts for Order Request"
      subtext=""
      onValueChange={handleValueChange}
      hidden={!isOpen}
      toggleHideDialog={onClose}
      minWidth="1200px"
      options={
        <div>
          <FormWorkflowComponent>
            <SectionWorkflowComponent
              columnSpan={12}
              columnStart={1}
              rowPosition={1}
              notification={notification}
            >
              {/* Add a wrapper div with border styles */}
              <div
                style={{
                  gridColumn: "1 / span 12",
                  gridRow: "2",
                  border: "1px solid #EDEBE9",
                  padding: "8px", // Adjust padding to align content properly
                  margin: "8px 0", // Spacing around the section
                }}
              >
                {/* Label aligned with the border */}
                <div
                  style={{
                    marginBottom: "8px",
                    paddingLeft: "8px", // Align text with the border
                    fontWeight: "bold", // Optional: Make the label bold
                  }}
                >
                  <LabelWorkflowComponent text="Contract Lines" isBoldHeader />
                </div>
                <div style={{ gridColumn: "1 / span 12", gridRow: "3" }}>
                  <CommandBarWorkflowComponent reverse />
                </div>
                <div style={{ gridColumn: "1 / span 12", gridRow: "4" }}>
                  <DetailsListWorkflowComponent items={exampleItems} />
                </div>
              </div>
            </SectionWorkflowComponent>
          </FormWorkflowComponent>
          <DialogFooter>
            <PrimaryButton
              onClick={() => handleValueChange(true)}
              text="Apply to Orders"
            />
            <DefaultButton onClick={onClose} text="Next" />
            <DefaultButton onClick={onClose} text="Cancel Workflow" />
          </DialogFooter>
        </div>
      }
    />
  );
};

export default DialogWorkflowContractGrid;
