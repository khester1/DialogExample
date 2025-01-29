import React, { useState } from "react";
import { initializeIcons, MessageBar, MessageBarType } from "@fluentui/react";
import DialogWorkflowSelector from "./components/dialog/workflow/dialog.workflowselector";
import { DetailsListCustomFooterExample } from "./components/detailslist/details.example";

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
        // <DialogWorkflowContractGrid isOpen={true} onClose={handleDialogClose} />
        <DetailsListCustomFooterExample />
      )}
    </>
  );
};

export default App;
