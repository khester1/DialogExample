import React, { useState } from "react";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { initializeIcons, MessageBar, MessageBarType } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import { DialogFooter } from "@fluentui/react";
import { DialogComponent } from "./components/dialog/default/dialog.component";
import ReasonFormComponent from "./components/section/section.creditreleasereason";
import { IComboBoxOption } from "@fluentui/react";
import { Service, OrderUpdate } from "./components/services/service";
import DialogWorkflowOrderGrid from "./components/dialog/workflow/dialog.workflowordergrid";
import DialogWorkflowSelector from "./components/dialog/workflow/dialog.workflowselector";
import DialogWorkflowDispatchSelector from "./components/dialog/workflow/dialog.workflowdispatch";
import { DialogWorkflowComponent } from "./components/dialog/default/dialog.workflowselector";
import DialogWorkflowSupplierGrid from "./components/dialog/workflow/dialog.workflowsuppliergrid";
import DialogWorkflowInventorySelector from "./components/dialog/workflow/dialog.workflowinventory";
import DialogWorkflowContractGrid from "./components/dialog/workflow/dialog.workflowcontractgrid";

initializeIcons();

export interface ICustomDialogProps {
  selectedItems?: string[] | undefined;
  userId?: string | undefined;
  Xrm?: any; // Add Xrm to the props
}

const App: React.FC<ICustomDialogProps> = ({}) => {
  const [activeDialog, setActiveDialog] = useState<string>("workflowSelector");
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);

  const handleDialogClose = () => {
    setActiveDialog(""); // Close all dialogs
  };

  const handleWorkflowSelection = (workflow: string) => {
    setSelectedWorkflow(workflow);

    // Navigate to specific dialogs based on the workflow selection
    if (workflow === "contract") {
      setActiveDialog("contractGrid");
    } else {
      console.log(`Unsupported workflow: ${workflow}`);
    }
  };

  return (
    <>
      {activeDialog === "workflowSelector" && (
        <DialogWorkflowSelector
          isOpen={true}
          onClose={handleDialogClose}
          onWorkflowSelect={handleWorkflowSelection} // Pass the selection handler
        />
      )}

      {activeDialog === "contractGrid" && (
        <DialogWorkflowContractGrid isOpen={true} onClose={handleDialogClose} />
      )}
    </>
  );
};

export default App;
