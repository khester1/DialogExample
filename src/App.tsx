import React, { useEffect, useState } from "react";
import "./App.css";
import { DialogComponent } from "./components/Dialog/Default/dialog.component";
import { DialogChoiceComponent } from "./components/Dialog/ChoiceGroup/dialog.choice.component";
import { DialogAlertComponent } from "./components/Dialog/Alert/dialog.alert.component";
import { ProgressSpinnerComponent } from "./components/Progress/Spinner/progess.spinner.component";

import { DataProps } from "./base.interface";
import { fetchData } from "./services/mockService";

export interface ICustomDialogProps {
  selectedItems: string[] | undefined;
  requestFrom: string | undefined;
  userId: string | undefined;
}

const DialogExample: React.FC<ICustomDialogProps> = (
  props: ICustomDialogProps
) => {
  const [ids, setIds] = useState<string[] | undefined>(props?.selectedItems);
  const [userid] = useState<string | undefined>(props?.userId);
  const [alertValue, setDialogResponseAlert] = useState<string>("");
  const [confirmValue, setDialogResponseConfirm] = useState<boolean>(false);
  const [initPayload, setInitPayload] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [exceedLimit, setExceedLimit] = useState(false);
  const [isRecruitingManager, setIsManager] = useState(false);
  const [maxAllowedCount, setMaxAllowedCount] = useState(0);
  const [maxdataLimit, setMaxLimit] = useState(0);

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
        setExceedLimit(responseData?.ExceedLimit);
        setIsManager(responseData?.ISManager);
        setMaxAllowedCount(responseData?.MaxAllowedCount);
        setMaxLimit(responseData?.MaxLimit);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Fetching data failed: ", error);
        setIsLoading(false);
      });
  }, [userid]);

  if (isLoading) {
    return <ProgressSpinnerComponent message="Loading..." />;
  }

  if (!initPayload) {
    setIsLoading(false);

    return <div>No data available</div>;
  }

  //Get Candidate Count
  const totalCount = countTotal(data);

  function countTotal(data: DataProps[]) {
    if (!data) {
      return 0;
    }
    return data.reduce((total, options) => {
      return total + parseInt(options.Count, 10);
    }, 0);
  }

  //Dialog Component Logic
  const { dialogChoiceResponse, dialogResponse, dialogAlertResponse } =
    handleDialogResponse();

  let dialogComponent = null;

  //Manager
  if (isRecruitingManager) {
    let subtitle = `This is a Manager. Total number of selected candidates: ${ids?.length}.`;

    dialogComponent = (
      <DialogComponent
        onSelect={dialogResponse}
        maxAllowedCount={maxAllowedCount}
        subtext={subtitle}
      />
    );

    //Reruiter
  } else {
    // If the user is not a recruiting  manager and the limit is exceeded (Recruiter)
    if (exceedLimit == true || totalCount >= maxAllowedCount) {
      let subtitle = `This is a recruiter with Exceed limit true.`;

      dialogComponent = (
        <DialogAlertComponent
          onSelect={dialogAlertResponse}
          subtext={subtitle}
        />
      );
    }

    // If the limit is not exceeded and there are multiple tear sheets (Recruiter)
    else if (data.length > 1) {
      let subtitle = `This is a recuiter with more than 1 data and ${totalCount} candidates.`;

      dialogComponent = (
        <DialogChoiceComponent
          choices={data as DataProps[]}
          onSelect={dialogChoiceResponse}
          maxAllowed={maxAllowedCount}
          subtext={subtitle}
        />
      );
    }
  }
  return <>{dialogComponent}</>;

  function handleDialogResponse() {
    const dialogChoiceResponse = (data: DataProps) => {
      executedataAction("Merge", data.Id);
    };

    const dialogAlertResponse = (value: string) => {
      setDialogResponseAlert(value);
    };

    const dialogResponse = (value: boolean) => {
      setDialogResponseConfirm(value);
      if (value) {
        executedataAction("New");
      } else {
      }
    };

    const dialogThreeButtonResponse = (value: string) => {
      switch (value) {
        case "Cancel":
          alert("Cancel");
          break;
        case "Merge":
          executedataAction("Merge", data[0]);
          break;
        case "Create":
          executedataAction("New");
          break;
      }
    };

    const dialogChoiceThreeButtonResponse = (value: string) => {
      if (value === "Create") {
        executedataAction("New");
      } else if (value === "Cancel") {
        alert("Cancel");
      } else {
        executedataAction("Merge", value);
      }
    };
    return {
      dialogChoiceResponse,
      dialogResponse,
      dialogAlertResponse,
      dialogThreeButtonResponse,
      dialogChoiceThreeButtonResponse,
    };

    function executedataAction(actionType: string, dataId?: string) {
      alert(`Action: ${actionType} dataId: ${dataId}`);
    }
  }
};

export default DialogExample;
