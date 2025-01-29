import * as React from "react";
import {
  MessageBar,
  MessageBarButton,
  MessageBarType,
  initializeIcons,
} from "@fluentui/react";
import { IMessageBarPropsCustom } from "./messagebar.base.interface";

initializeIcons();

type ActionButtonProps = {
  showButtons?: boolean;
  yesButtonText?: string;
  noButtonText?: string;
  onYesClick?: () => void;
  onNoClick?: () => void;
};

type MessageProps = IMessageBarPropsCustom & {
  subtext?: string | JSX.Element;
  actionButtons?: ActionButtonProps;
  dismissDuration?: number;
  showDismissButton?: boolean;
  onDismiss?: () => void;
};

export const MessageBarWorkflowComponent: React.FunctionComponent<
  MessageProps
> = ({
  actionButtons,
  dismissDuration,
  showDismissButton,
  onDismiss,
  ...props
}) => {
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Effect to handle dismiss duration
  React.useEffect(() => {
    if (dismissDuration) {
      timerRef.current = setTimeout(() => {
        if (onDismiss) {
          onDismiss();
        }
      }, dismissDuration);
    }

    return () => {
      // Clear timer on unmount or when dismissDuration changes
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [dismissDuration, onDismiss]);

  // Determine if the dismiss button should be shown
  const shouldShowDismissButton =
    showDismissButton !== undefined
      ? showDismissButton
      : !(actionButtons && actionButtons.showButtons);

  return (
    <MessageBar
      messageBarType={props.messageBarType}
      isMultiline={props.isMultiline}
      dismissButtonAriaLabel={shouldShowDismissButton ? "Close" : undefined}
      onDismiss={shouldShowDismissButton ? onDismiss : undefined}
      actions={
        actionButtons?.showButtons ? (
          <div>
            <MessageBarButton onClick={actionButtons.onYesClick}>
              {actionButtons.yesButtonText || "Yes"}
            </MessageBarButton>
            <MessageBarButton onClick={actionButtons.onNoClick}>
              {actionButtons.noButtonText || "No"}
            </MessageBarButton>
          </div>
        ) : undefined
      }
    >
      {props.subtext}
    </MessageBar>
  );
};
