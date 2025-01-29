import React, { useState } from "react";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { useBoolean } from "@fluentui/react-hooks";
import { Checkbox, DialogFooter, MessageBarType } from "@fluentui/react";
import { DialogWorkflowComponent } from "../default/dialog.workflowselector";
import { MessageBarWorkflowComponent } from "../../messageBar/messagebar.workflow.component";
import SectionWorkflowComponent from "../../section/section.workflow.component";
import FormWorkflowComponent from "../../form/form.workflow.component";

const DialogWorkflowSelector: React.FC = () => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(false);
  const [notification, setNotification] = useState<React.ReactNode | null>(
    null
  );

  const handleNextClick = () => {
    console.log("Next button clicked");

    // Define error messages
    const errorMessages = (
      <>
        <li>Field A is required.</li>
        <li>Field B must be a valid value.</li>
        <li>Field C cannot exceed 100 characters.</li>
      </>
    );

    // Set the notification dynamically
    setNotification(
      <MessageBarWorkflowComponent
        messageBarType={MessageBarType.error}
        subtext={
          <div style={{ textAlign: "left" }}>
            Validation failed:
            <ul>{errorMessages}</ul>
          </div>
        }
        showDismissButton={true}
        onDismiss={() => {
          console.log("Notification dismissed");
          setNotification(null);
        }}
      />
    );
  };

  return (
    <>
      {/* Button to open the dialog */}
      <PrimaryButton text="Open Dialog" onClick={toggleHideDialog} />

      {/* Dialog component */}
      <DialogWorkflowComponent
        title="Select a Workflow"
        subtext="Select one or more workflow actions to perform on the selected Orders."
        onValueChange={() => console.log("Value changed.")}
        hidden={hideDialog}
        toggleHideDialog={toggleHideDialog}
        minWidth="500px"
        options={
          <div>
            <FormWorkflowComponent>
              <SectionWorkflowComponent
                columnSpan={12}
                columnStart={1}
                rowPosition={1}
                notification={notification} // Pass the notification here
              >
                {/* Checkbox options */}
                <div style={{ gridColumn: "1 / span 8", gridRow: "4" }}>
                  <Checkbox label="Contract" />
                </div>
                <div style={{ gridColumn: "1 / span 8", gridRow: "5" }}>
                  <Checkbox label="Inventory" />
                </div>
                <div style={{ gridColumn: "1 / span 8", gridRow: "6" }}>
                  <Checkbox label="Transportation" />
                </div>
              </SectionWorkflowComponent>
            </FormWorkflowComponent>

            <DialogFooter>
              {/* Footer buttons */}
              <PrimaryButton onClick={handleNextClick} text="Next" />
              <DefaultButton onClick={toggleHideDialog} text="Cancel" />
            </DialogFooter>
          </div>
        }
      />
    </>
  );
};

export default DialogWorkflowSelector;
