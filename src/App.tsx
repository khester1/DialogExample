import React, { useState } from "react";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { MessageBar, MessageBarType } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import { DialogFooter } from "@fluentui/react";
import { DialogComponent } from "./components/dialog/default/dialog.component";
import ReasonFormComponent from "./components/section/section.creditreleasereason";
import { IComboBoxOption } from "@fluentui/react";
import { Service, OrderUpdate } from "./components/services/service";
import DialogWorkflowOrderGrid from "./components/dialog/workflow/dialog.workflowordergrid";
import DialogWorkflowSelector from "./components/dialog/workflow/dialog.workflowselector";

export interface ICustomDialogProps {
  selectedItems?: string[] | undefined;
  userId?: string | undefined;
  Xrm?: any; // Add Xrm to the props
}

const App: React.FC<ICustomDialogProps> = ({}) => {
  return (
    <>
      <DialogWorkflowOrderGrid />
    </>
  );
};

export default App;
