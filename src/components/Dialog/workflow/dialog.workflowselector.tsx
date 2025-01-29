import React, { useState, useEffect } from "react";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { Checkbox, DialogFooter, MessageBarType } from "@fluentui/react";
import { DialogWorkflowComponent } from "../default/dialog.workflowselector";
import { MessageBarWorkflowComponent } from "../../messageBar/messagebar.workflow.component";
import SectionWorkflowComponent from "../../section/section.workflow.component";
import FormWorkflowComponent from "../../form/form.workflow.component";

interface DialogWorkflowSelectorProps {
  isOpen: boolean; // Controls whether the dialog is visible
  onClose: () => void; // Callback for closing the dialog
  onNavigateToContract: () => void; // Callback to navigate to DialogWorkflowContractGrid
}

const DialogWorkflowSelector: React.FC<DialogWorkflowSelectorProps> = ({
  isOpen,
  onClose,
  onNavigateToContract,
}) => {
  const [isContractSelected, setIsContractSelected] = useState(false);
  const [isInventorySelected, setIsInventorySelected] = useState(false);
  const [isTransportationSelected, setIsTransportationSelected] =
    useState(false);
  const [notification, setNotification] = useState<React.ReactNode | null>(
    null
  );
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  // Update "Next" button enable/disable state dynamically
  useEffect(() => {
    setIsNextEnabled(
      isContractSelected || isInventorySelected || isTransportationSelected
    );
  }, [isContractSelected, isInventorySelected, isTransportationSelected]);

  const handleContractChange = (
    ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
    checked?: boolean
  ) => {
    setIsContractSelected(!!checked);

    // Uncheck and disable dependent checkboxes if "Contract" is unchecked
    if (!checked) {
      setIsInventorySelected(false);
      setIsTransportationSelected(false);
    }
  };

  const handleInventoryChange = (
    ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
    checked?: boolean
  ) => {
    if (isContractSelected) {
      setIsInventorySelected(!!checked);
    }
  };

  const handleTransportationChange = (
    ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
    checked?: boolean
  ) => {
    if (isContractSelected) {
      setIsTransportationSelected(!!checked);
    }
  };

  const handleNextClick = () => {
    if (isContractSelected) {
      onNavigateToContract(); // Navigate to DialogWorkflowContractGrid
    } else {
      // Show a notification if no valid selection is made
      const errorMessages = (
        <>
          <li>Field A is required.</li>
          <li>Field B must be a valid value.</li>
          <li>Field C cannot exceed 100 characters.</li>
        </>
      );
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
          onDismiss={() => setNotification(null)}
        />
      );
    }
  };

  return (
    <DialogWorkflowComponent
      title="Select a Workflow"
      subtext="Select one or more workflow actions to perform on the selected Orders."
      onValueChange={() => console.log("Value changed.")}
      hidden={!isOpen}
      toggleHideDialog={onClose}
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
                <Checkbox
                  label="Contract"
                  checked={isContractSelected}
                  onChange={handleContractChange}
                />
              </div>
              <div style={{ gridColumn: "1 / span 8", gridRow: "5" }}>
                <Checkbox
                  label="Inventory"
                  checked={isInventorySelected}
                  onChange={handleInventoryChange}
                  disabled={!isContractSelected} // Disable if Contract is not selected
                />
              </div>
              <div style={{ gridColumn: "1 / span 8", gridRow: "6" }}>
                <Checkbox
                  label="Transportation"
                  checked={isTransportationSelected}
                  onChange={handleTransportationChange}
                  disabled={!isContractSelected} // Disable if Contract is not selected
                />
              </div>
            </SectionWorkflowComponent>
          </FormWorkflowComponent>

          <DialogFooter>
            {/* Footer buttons */}
            <PrimaryButton
              onClick={handleNextClick}
              text="Next"
              disabled={!isNextEnabled} // Disable if no checkbox is selected
            />
            <DefaultButton onClick={onClose} text="Cancel" />
          </DialogFooter>
        </div>
      }
    />
  );
};

export default DialogWorkflowSelector;
