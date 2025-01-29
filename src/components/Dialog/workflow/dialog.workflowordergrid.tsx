import React, { useState, useMemo, useCallback, useEffect } from "react";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { useBoolean } from "@fluentui/react-hooks";

import { DialogFooter } from "@fluentui/react";

import { DetailsListWorkflowOrdersComponent } from "../../detailslist/detaillist.workflow.orders.component";
import { LabelWorkflowComponent } from "../../field/label.workflow.component";
import SectionWorkflowComponent from "../../section/section.workflow.component";
import FormWorkflowComponent from "../../form/form.workflow.component";
import { DialogWorkflowComponent } from "../default/dialog.workflowselector";

const exampleItems = [
  {
    key: "1",
    shipdate: "2024-11-24",
    origin: "Pixley",
    affidavit: "1002-125646",
    carrier: "O'Reilly Trucking",
    baserate: "$35.00",
    freightadditional: "",
    releasenumber: "RN123",
    deliveryperiod: "2024-11-24 to 2024-11-30",
    id: "ID1",
    order: "Order1",
    perloadqty: "1000 lbs",
  },
  {
    key: "2",
    shipdate: "2024-11-20",
    origin: "Pixley",
    affidavit: "1002-123510",
    carrier: "O'Reilly Trucking",
    baserate: "$30.00",
    freightadditional: "$4.25",
    releasenumber: "RN124",
    deliveryperiod: "2024-11-20 to 2024-11-26",
    id: "ID2",
    order: "Order2",
    perloadqty: "1200 lbs",
  },
];

const DialogWorkflowOrderGrid: React.FC = () => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(false);
  const [formValue, setFormValue] = React.useState("");
  const [notification, setNotification] = useState<React.ReactNode | null>(
    null
  );

  const handleValueChange = (newValue: boolean) => {
    console.log("Dialog value changed:", newValue);
    console.log("Form value:", formValue);
  };

  const handleSearch = (option: { key: string; name: string }) => {
    console.log("Selected option:", option);
  };

  return (
    <>
      <PrimaryButton text="Open Dialog" onClick={toggleHideDialog} />
      <DialogWorkflowComponent
        title="Recent Order History"
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
                    <LabelWorkflowComponent text="Orders" isBoldHeader />
                  </div>

                  <div style={{ gridColumn: "1 / span 2", gridRow: "2" }}></div>
                  <div style={{ gridColumn: "1 / span 12", gridRow: "3" }}>
                    <DetailsListWorkflowOrdersComponent items={exampleItems} />
                  </div>
                </div>
              </SectionWorkflowComponent>
            </FormWorkflowComponent>
            <DialogFooter>
              <DefaultButton onClick={toggleHideDialog} text="Close" />
            </DialogFooter>
          </div>
        }
      />
    </>
  );
};

export default DialogWorkflowOrderGrid;
