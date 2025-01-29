import React, { useState, useMemo, useCallback, useEffect } from "react";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { useBoolean } from "@fluentui/react-hooks";

import { DialogFooter } from "@fluentui/react";
import { SearchWorkflowComponent } from "../../searchBox/search.worrkflowcomponent";
import SectionWorkflowComponent from "../../section/section.workflow.component";
import FormWorkflowComponent from "../../form/form.workflow.component";
import { DialogWorkflowComponent } from "../default/dialog.workflowselector";

const options = [
  { key: "1", name: "Option 1" },
  { key: "2", name: "Option 2" },
  { key: "3", name: "Option 3" },
];

const DialogWorkflowInventorySelector: React.FC = () => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(false);
  const [formValue, setFormValue] = React.useState("");
  const [notification, setNotification] = useState<React.ReactNode | null>(
    null
  );

  const handleValueChange = (newValue: boolean) => {
    console.log("Dialog value changed:", newValue);
    console.log("Form value:", formValue);
  };

  const handleSearch = (option: { key: string; name: string } | null) => {
    console.log("Selected option:", option);
  };

  return (
    <>
      <PrimaryButton text="Open Dialog" onClick={toggleHideDialog} />
      <DialogWorkflowComponent
        title="Select Inventory Location (origin)"
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
                <div style={{ gridColumn: "1 / span 4", gridRow: "3" }}>
                  <SearchWorkflowComponent
                    options={options}
                    onSearch={handleSearch}
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
            </DialogFooter>
          </div>
        }
      />
    </>
  );
};

export default DialogWorkflowInventorySelector;
