import React, { useState } from "react";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { MessageBar, MessageBarType } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import { DialogFooter } from "@fluentui/react";
import { DialogComponent } from "./components/dialog/default/dialog.component";
import ReasonFormComponent from "./components/section/section.creditreleasereason";
import { IComboBoxOption } from "@fluentui/react";
import { Service, Order } from "./services/service";
//SErvice Factory

export interface ICustomDialogProps {
  selectedItems: string[] | undefined;
  userId: string | undefined;
  Xrm: any; // Add Xrm to the props
}

// Hardcoded options
const options: IComboBoxOption[] = [
  { key: "272280000", text: "Approved Funds" },
  { key: "272280001", text: "Automatic Release" },
  { key: "272280002", text: "Approved CAD Account" },
  { key: "272280003", text: "Approved Check On The Way" },
  { key: "272280004", text: "Approved Funds In Hand But Not Applied" },
  { key: "272280005", text: "Approved Per The GM" },
  { key: "272280006", text: "Approved Internal Application Issues" },
  { key: "272280007", text: "Approved Logistics Issues" },
  { key: "272280008", text: "Approved Per Senior Management" },
  { key: "272280009", text: "Approved Load # Released, Truck Waiting" },
  { key: "272280010", text: "Approved Replacement Load" },
  { key: "272280011", text: "Approved Rejected/Returned Load" },
  { key: "272280012", text: "Approved Load Already Shipped Prior To..." },
  { key: "272280013", text: "Approved Per Trader" },
];

const App: React.FC<ICustomDialogProps> = ({ userId, selectedItems, Xrm }) => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(false);
  const [formValue, setFormValue] = useState<string>(""); // Selected value
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>(
    selectedItems || []
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Success message
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error message

  // Instantiate the Service class with the Xrm object
  const service = new Service(Xrm);

  const handleSubmit = async (confirmed: boolean) => {
    if (confirmed && formValue && userId) {
      try {
        // Clear previous messages
        setSuccessMessage(null);
        setErrorMessage(null);

        // Prepare the order updates
        const updates: Order[] = selectedOrderIds.map((orderId) => ({
          stn_orderid: orderId,
          stn_creditreleasedby: userId, // Pass userId directly
          stn_creditreleaseddate: new Date().toISOString(),
          stn_creditreleasereason: parseInt(formValue),
          statuscode: 924450003,
        }));

        // Use the Service class to update orders
        await service.updateOrders(updates);

        // Display success message
        setSuccessMessage("Orders updated successfully!");

        // Hide the dialog on success
        toggleHideDialog();
      } catch (error: any) {
        console.error("Failed to update orders:", error);

        // Display error message
        setErrorMessage(
          error.message || "An error occurred while updating orders."
        );
      }
    }
  };

  return (
    <div>
      {/* Success Notification */}
      {successMessage && (
        <MessageBar
          messageBarType={MessageBarType.success}
          isMultiline={false}
          onDismiss={() => setSuccessMessage(null)}
          dismissButtonAriaLabel="Close"
        >
          {successMessage}
        </MessageBar>
      )}

      {/* Error Notification */}
      {errorMessage && (
        <MessageBar
          messageBarType={MessageBarType.error}
          isMultiline={true}
          onDismiss={() => setErrorMessage(null)}
          dismissButtonAriaLabel="Close"
        >
          {errorMessage}
        </MessageBar>
      )}

      <DialogComponent
        title="Credit Release Reason"
        subtext="Select a reason for why the hold is getting released"
        onValueChange={handleSubmit}
        hidden={hideDialog}
        toggleHideDialog={toggleHideDialog}
        options={
          <div>
            <ReasonFormComponent
              options={options}
              onValueChange={(id) => setFormValue(id)}
            />
            <DialogFooter>
              <DefaultButton onClick={toggleHideDialog} text="Cancel" />
              <PrimaryButton
                onClick={() => handleSubmit(true)}
                text="Submit"
                disabled={!formValue}
              />
            </DialogFooter>
          </div>
        }
      />
    </div>
  );
};

export default App;
