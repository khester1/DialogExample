import React, { useState } from "react";
import { MessageBarType } from "@fluentui/react";
import { MessageBarComponent } from "./messagebar.component";

const MessageBarExample = () => {

    const [isMessageBarVisible, setMessageBarVisible] = useState(true);


    const handleNoClick = () => {
        alert("Cancelled");
        setMessageBarVisible(false);  // Hide the message bar
    };

    return (
        <>
            {/* Conditionally render the MessageBarComponent */}
            {isMessageBarVisible && (
                <MessageBarComponent
                    messageBarType={MessageBarType.success}
                    subtext="This message will disappear after 5 seconds."
                    isMultiline={false}
                  dismissDuration={5000}  // Auto dismiss after 5000 ms
                    showDismissButton={true}
                    actionButtons={{
                        showButtons: false,
                        yesButtonText: "Proceed",
                        noButtonText: "Cancel",
                        onYesClick: () => alert("Proceeding"),
                        onNoClick: handleNoClick  // Call handleNoClick on "No" button click
                    }}
                />
            )}
        </>
    );
};

export default MessageBarExample;
