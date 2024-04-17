import React, { useEffect, useState } from "react";
import "./App.css";
import { DialogComponent } from "./components/Dialog/Default/dialog.component";
import { DialogChoiceComponent } from "./components/Dialog/ChoiceGroup/dialog.choice.component";
import { DialogAlertComponent } from "./components/Dialog/Alert/dialog.alert.component";
import { DialogThreeButtonComponent } from "./components/Dialog/ThreeButton/dialog.threebuttton.component";
import { ProgressSpinnerComponent } from "./components/Progress/Spinner/progess.spinner.component";
import { DialogChoiceThreeButtonComponent } from "./components/Dialog/ChoiceGroup/dialog.choicethreebutton.component";
import { MessageBarComponent } from "./components/MessageBar/messagebar.component";
import { fetchTearSheets } from "./services";

export interface ICustomDialogProps {
  selectedItems: string[] | undefined;
  requestFrom: string | undefined;
  userId: string | undefined;
}

interface TearSheet {
  Id: string;
  Name: string;
  CandidateCount: string;
}
const DialogExample: React.FC<ICustomDialogProps> = (
  props: ICustomDialogProps
) => {
  const [ids, setIds] = useState<string[] | undefined>(props?.selectedItems);
  const [from, setFrom] = useState<string | undefined>(props?.requestFrom);
  const [userid, setUserid] = useState<string | undefined>(props?.userId);
  const [alertValue, setDialogResponseAlert] = useState<string>("");
  const [confirmValue, setDialogResponseConfirm] = useState<boolean>(false);
  const [selectedTearSheet, setSelectedTearSheet] = useState<TearSheet | null>(
    null
  );
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tearSheets, setTearSheets] = useState([]);
  const [exceedLimit, setExceedLimit] = useState(false);
  const [isRecruitingManager, setIsManager] = useState(false);
  const [maxAllowedCount, setMaxAllowedCount] = useState(0);
  const [maxTearSheetLimit, setMaxLimit] = useState(0);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    RequestType: "ValidateTearSheetCreation",
    UserId: userid,
  });
  useEffect(() => {
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        RequestType: "ValidateTearSheetCreation",
        UserId: userid,
      }),
      redirect: "follow",
    };

    fetchTearSheets(requestOptions)
      .then((response) => (response as Response).json())
      .then((responseData) => {
        setData(responseData || []);
        setTearSheets(responseData?.TearSheets);
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

  if (!data) {
    setIsLoading(false);

    return <div>No data available</div>;
  }

  //Get Candidate Count
  const totalCandidatesCount = countTotalCandidates(tearSheets);

  function countTotalCandidates(tearSheets: any[]) {
    if (!tearSheets) {
      return 0;
    }
    return tearSheets.reduce((total, tearSheet) => {
      return total + parseInt(tearSheet.CandidateCount, 10);
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
    else if (tearSheets.length > 1) {
      let subtitle = `This is a Manager with more than 1 tearsheet and ${totalCandidatesCount} candidates.`;

      dialogComponent = (
        <DialogChoiceThreeButtonComponent
          options={tearSheets as TearSheet[]}
          onSelect={dialogChoiceThreeButtonResponse}
          subtext={subtitle}
        />
      );
    }

    // If there is only one tear sheet (Manager)
    else if (tearSheets.length === 1) {
      let subtitle = `This is a manager with 1 tearsheet and  ${totalCandidatesCount} candidates. 
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
      let subtitle = `This is a recruiter with no tearsheets and ${ids?.length} candidates.`;

      dialogComponent = (
        <DialogComponent
          onValueChange={dialogResponse}
          maxAllowedCount={maxAllowedCount}
          subtext={subtitle}
        />
      );
    }

    // If the limit is not exceeded and there are multiple tear sheets (Recruiter)
    else if (tearSheets.length > 1) {
      let subtitle = `This is a recuiter with more than 1 tearsheet and ${totalCandidatesCount} candidates.`;

      dialogComponent = (
        <DialogChoiceComponent
          choices={tearSheets as TearSheet[]}
          onSelect={dialogChoiceResponse}
          maxAllowed={maxAllowedCount}
          subtext={subtitle}
        />
      );
    }

    // If the limit is not exceeded and there is only one tear sheet (Recruiter)
    else if (tearSheets.length == 1 && totalCandidatesCount < maxAllowedCount) {
      let subtitle = `This is a recruiter with 1 tearsheet and ${totalCandidatesCount} candidates.`;

      dialogComponent = (
        <DialogThreeButtonComponent
          value={totalCandidatesCount}
          onValueChange={dialogThreeButtonResponse}
          subtext={subtitle}
        />
      );
    }

    // If there is only one tear sheet and the total number of candidates is greater than or equal to the maximum allowed count (Manager)
    else if (
      tearSheets.length == 1 &&
      totalCandidatesCount >= maxAllowedCount
    ) {
      let subtitle = `This is a recruiter with 1 tearsheet and ${totalCandidatesCount} candidates. Would you like to create a new one?`;

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
    const dialogChoiceResponse = (tearSheet: TearSheet) => {
      setSelectedTearSheet(tearSheet);
      executeTearSheetAction("Merge", tearSheet.Id);
    };

    const dialogAlertResponse = (value: string) => {
      setDialogResponseAlert(value);
    };

    const dialogResponse = (value: boolean) => {
      setDialogResponseConfirm(value);
      if (value) {
        executeTearSheetAction("New");
      } else {
      }
    };

    const dialogThreeButtonResponse = (value: string) => {
      switch (value) {
        case "Cancel":
          alert("Cancel");
          break;
        case "Merge":
          executeTearSheetAction("Merge", tearSheets[0]);
          break;
        case "Create":
          executeTearSheetAction("New");
          break;
      }
    };

    const dialogChoiceThreeButtonResponse = (value: string) => {
      if (value === "Create") {
        executeTearSheetAction("New");
      } else if (value === "Cancel") {
        alert("Cancel");
      } else {
        executeTearSheetAction("Merge", value);
      }
    };
    return {
      dialogChoiceResponse,
      dialogResponse,
      dialogAlertResponse,
      dialogThreeButtonResponse,
      dialogChoiceThreeButtonResponse,
    };

    function executeTearSheetAction(actionType: string, tearSheetId?: string) {
      alert(`Action: ${actionType} TearSheetId: ${tearSheetId}`);
    }
  }
};

export default DialogExample;
