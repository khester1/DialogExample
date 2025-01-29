import React, { useState, useMemo, useCallback, useEffect } from "react";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { useBoolean } from "@fluentui/react-hooks";

import { DialogFooter, MessageBarType } from "@fluentui/react";
import { DialogWorkflowComponent } from "../default/dialog.workflowselector";
import FormWorkflowComponent from "../../form/form.workflow.component";
import SectionWorkflowComponent from "../../section/section.workflow.component";
import { LabelWorkflowComponent } from "../../field/label.workflow.component";
import CommandBarWorkflowComponent from "../../commandbar/commandbar.workflow";
import { DetailsListWorkflowComponent } from "../../detailslist/detaillist.workflow.component";
import { DetailsListWorkflowSupplierComponent } from "../../detailslist/detaillist.workflow.supplier.component";

const DialogWorkflowSupplierGrid: React.FC = () => {
  const contractItems = [
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

  const contractLinesItems = [
    {
      key: "1",
      releasenumber: "JDH23405-01",
      deliveryperiod: "2508",
      origin: "BRADEN HULLING",
      order: "JDH-0010321",
      perloadqty: "50.00",
      id: "1",
    },
    {
      key: "2",
      releasenumber: "JDH23405-02",
      deliveryperiod: "2508",
      origin: "BRADEN HULLING",
      order: "JDH-0010321",
      perloadqty: "50.00",
      id: "2",
    },
  ];

  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(false);
  const [formValue, setFormValue] = React.useState("");
  const [showMessageBar, setShowMessageBar] = useState(true);
  const [notification, setNotification] = useState<React.ReactNode | null>(
    null
  );

  const handleValueChange = (newValue: boolean) => {
    console.log("Dialog value changed:", newValue);
    console.log("Form value:", formValue);
  };

  return (
    <>
      <PrimaryButton text="Open Dialog" onClick={toggleHideDialog} />
      <DialogWorkflowComponent
        title="Select Supplier Contract"
        subtext=""
        onValueChange={handleValueChange}
        hidden={hideDialog}
        toggleHideDialog={toggleHideDialog}
        cancelButtonText="Cancel"
        confirmButtonText="Next"
        options={
          <div>
            <FormWorkflowComponent>
              <SectionWorkflowComponent
                columnSpan={12}
                columnStart={1}
                rowPosition={1}
                notification={notification}
              >
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
                    <LabelWorkflowComponent
                      text="Purchase Contracts"
                      isBoldHeader
                    />
                  </div>
                  <div style={{ gridColumn: "1 / span 12", gridRow: "3" }}>
                    <CommandBarWorkflowComponent reverse />
                  </div>
                  <div style={{ gridColumn: "1 / span 12", gridRow: "4" }}>
                    <DetailsListWorkflowComponent items={contractItems} />
                  </div>
                </div>
                {/* Add a wrapper div with border styles */}
                <div
                  style={{
                    gridColumn: "1 / span 12",
                    gridRow: "6",
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
                    <LabelWorkflowComponent
                      text="Contract Schedule"
                      isBoldHeader
                    />
                  </div>
                  <div style={{ gridColumn: "1 / span 12", gridRow: "3" }}>
                    <CommandBarWorkflowComponent reverse />
                  </div>
                  <div style={{ gridColumn: "1 / span 12", gridRow: "4" }}>
                    <DetailsListWorkflowSupplierComponent
                      items={contractLinesItems}
                    />
                  </div>
                </div>
              </SectionWorkflowComponent>
            </FormWorkflowComponent>
            <DialogFooter>
              <PrimaryButton
                onClick={() => handleValueChange(true)}
                text="Apply to Orders"
              />
              <DefaultButton onClick={toggleHideDialog} text="Next" />
              <DefaultButton
                onClick={toggleHideDialog}
                text="Cancel Workflow"
              />
            </DialogFooter>
          </div>
        }
      />
    </>
  );
};

export default DialogWorkflowSupplierGrid;
