import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import { DialogComponent } from "./components/Dialog/Default/dialog.component";
import { DialogChoiceComponent } from "./components/Dialog/ChoiceGroup/dialog.choice.component";
import { DialogAlertComponent } from "./components/Dialog/Alert/dialog.alert.component";
import { ProgressSpinnerComponent } from "./components/Progress/Spinner/progess.spinner.component";
import { DataProps } from "./base.interface";
import { fetchData } from "./services/mockService";

export interface ICustomDialogProps {
  selectedItems: string[] | undefined;
  userId: string | undefined;
}

const DialogExample: React.FC<ICustomDialogProps> = (props) => {
  const [userid] = useState<string | undefined>(props?.userId);
  const [initPayload, setInitPayload] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dialogChoice, setDialogChoice] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        RequestType: "ExampleRequestType",
        UserId: userid,
      }),
      redirect: "follow",
    };

    fetchData(requestOptions)
      .then((response) => (response as Response).json())
      .then((responseData) => {
        setInitPayload(responseData || []);
        setData(responseData?.Data);
        setDialogChoice(responseData?.DialogComponentChoice);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Fetching data failed: ", error);
        setIsLoading(false);
      });
  }, [userid]);

  const executedataAction = useCallback((data?: DataProps) => {
    console.log(`Id: ${data?.Id} Name: ${data?.Name} Count: ${data?.Count}`);
  }, []);

  const dialogChoiceResponse = useCallback(
    (data: DataProps) => {
      executedataAction(data);
    },
    [executedataAction]
  );

  const dialogAlertResponse = useCallback((value: string) => {
    console.log("Alert Response: ", value);
  }, []);

  const dialogResponse = useCallback(
    (value: boolean) => {
      if (value) {
        console.log("Confirm Response: ", value);
      }
    },
    [executedataAction]
  );

  if (isLoading) {
    return <ProgressSpinnerComponent message="Loading..." />;
  }

  if (!initPayload) {
    setIsLoading(false);
    return <div>No data available</div>;
  }

  let dialogComponent = null;

  switch (dialogChoice) {
    case "Confirm":
      dialogComponent = (
        <DialogComponent
          onSelect={dialogResponse}
          subtext="This is a Default Dialog."
        />
      );
      break;
    case "ChoiceGroup":
      dialogComponent = (
        <DialogChoiceComponent
          choices={data as DataProps[]}
          onSelect={dialogChoiceResponse}
          subtext="This is a Choice Dialog."
        />
      );
      break;
    case "Alert":
      dialogComponent = (
        <DialogAlertComponent
          onSelect={dialogAlertResponse}
          subtext="This is an Alert Dialog."
        />
      );
      break;
    default:
      break;
  }

  return <>{dialogComponent}</>;
};

export default DialogExample;
