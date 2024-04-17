import React, { useEffect, useState } from "react";
import "./App.css";
import { DialogComponent } from "./components/Dialog/Default/dialog.component";
import { DialogChoiceComponent } from "./components/Dialog/ChoiceGroup/dialog.choice.component";
import { DialogAlertComponent } from "./components/Dialog/Alert/dialog.alert.component";
import { DialogThreeButtonComponent } from "./components/Dialog/ThreeButton/dialog.threebuttton.component";
import { ProgressSpinnerComponent } from "./components/Progress/Spinner/progess.spinner.component";
import { DialogChoiceThreeButtonComponent } from "./components/Dialog/ChoiceGroup/dialog.choicethreebutton.component";
import { MessageBarComponent } from "./components/MessageBar/messagebar.component";

import { DialogProps } from "./base.interface";
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
  const [from, setFrom] = useState<string | undefined>(props?.requestFrom);
  const [userid, setUserid] = useState<string | undefined>(props?.userId);
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
  const totalCandidatesCount = countTotalCandidates(data);

  function countTotalCandidates(data: DialogProps[]) {
    if (!data) {
      return 0;
    }
    return data.reduce((total, options) => {
      return total + parseInt(options.CandidateCount, 10);
    }, 0);
  }

  //Dialog Component Logic
  const {
    dialogChoiceResponse,
    dialogResponse,
    dialogAlertResponse,
    dialogThreeButtonResponse,
    dialogChoiceThreeButtonResponse,
  } = handleDialogResponse();

  let dialogComponent = null;

  //Manager
  if (isRecruitingManager) {
    // If there are no candidates in any tear sheet (Manager)
    if (totalCandidatesCount === 0) {
      let subtitle = `This is a Manager. Total number of selected candidates: ${ids?.length}.`;

      dialogComponent = (
        <DialogComponent
          onValueChange={dialogResponse}
          maxAllowedCount={maxAllowedCount}
          subtext={subtitle}
        />
      );
    }

    // If there are multiple tear sheets (Manager)
    else if (data.length > 1) {
      let subtitle = `This is a Manager with more than 1 data and ${totalCandidatesCount} candidates.`;

      dialogComponent = (
        <DialogChoiceThreeButtonComponent
          options={data as DialogProps[]}
          onSelect={dialogChoiceThreeButtonResponse}
          subtext={subtitle}
        />
      );
    }

    // If there is only one tear sheet (Manager)
    else if (data.length === 1) {
      let subtitle = `This is a manager with 1 data and  ${totalCandidatesCount} candidates. 
    Would you like to create a new one?`;

      dialogComponent = (
        <DialogThreeButtonComponent
          value={totalCandidatesCount}
          onValueChange={dialogThreeButtonResponse}
          subtext={subtitle}
        />
      );
    }

    //Reruiter
  } else {
    // If the user is not a recruiting  manager and the limit is exceeded (Recruiter)
    if (exceedLimit == true || totalCandidatesCount >= maxAllowedCount) {
      let subtitle = `This is a recruiter with Exceed limit true.`;

      dialogComponent = (
        <DialogAlertComponent
          onValueChange={dialogAlertResponse}
          subtext={subtitle}
        />
      );
    }

    // If the limit is not exceeded and there are no tear sheets (Recruiter)
    else if (totalCandidatesCount === 0) {
      let subtitle = `This is a recruiter with no datas and ${ids?.length} candidates.`;

      dialogComponent = (
        <DialogComponent
          onValueChange={dialogResponse}
          maxAllowedCount={maxAllowedCount}
          subtext={subtitle}
        />
      );
    }

    // If the limit is not exceeded and there are multiple tear sheets (Recruiter)
    else if (data.length > 1) {
      let subtitle = `This is a recuiter with more than 1 data and ${totalCandidatesCount} candidates.`;

      dialogComponent = (
        <DialogChoiceComponent
          choices={data as DialogProps[]}
          onSelect={dialogChoiceResponse}
          maxAllowed={maxAllowedCount}
          subtext={subtitle}
        />
      );
    }

    // If the limit is not exceeded and there is only one tear sheet (Recruiter)
    else if (data.length == 1 && totalCandidatesCount < maxAllowedCount) {
      let subtitle = `This is a recruiter with 1 data and ${totalCandidatesCount} candidates.`;

      dialogComponent = (
        <DialogThreeButtonComponent
          value={totalCandidatesCount}
          onValueChange={dialogThreeButtonResponse}
          subtext={subtitle}
        />
      );
    }

    // If there is only one tear sheet and the total number of candidates is greater than or equal to the maximum allowed count (Manager)
    else if (data.length == 1 && totalCandidatesCount >= maxAllowedCount) {
      let subtitle = `This is a recruiter with 1 data and ${totalCandidatesCount} candidates. Would you like to create a new one?`;

      dialogComponent = (
        <DialogComponent
          onValueChange={dialogResponse}
          maxAllowedCount={maxAllowedCount}
          subtext={subtitle}
        />
      );
    }
  }
  return (
    <>
      {dialogComponent}
      {/* <MessageBarComponent/> */}
    </>
  );

  function handleDialogResponse() {
    const dialogChoiceResponse = (data: DialogProps) => {
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
