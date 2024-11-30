import { IButtonProps, IIconProps, IMessageBarStyleProps, IMessageBarStyles, IStyleFunctionOrObject, ITheme, MessageBarType } from "@fluentui/react";

export interface IMessageBarPropsCustom { 
actions ?: JSX.Element;
className ?: string;
componentRef ?: React.RefObject<HTMLDivElement>;
delayedRender ?: boolean;
dismissButtonAriaLabel ?: string;
dismissIconProps ? : IIconProps;
expandButtonProps ?: IButtonProps;
isMultiline ?: boolean;
messageBarIconProps ?: IIconProps;
messageBarType ?: MessageBarType;
onDismiss ?: () => void;
onExpandButtonToggled ?: (isExpanded: boolean) => void;
overflowButtonAriaLabel ?: string;
role ?: string;
styles ?: IStyleFunctionOrObject<IMessageBarStyleProps, IMessageBarStyles>;
theme ?: ITheme;
truncated ?: boolean;
}



export interface MessageBarTypeCustom {
    success: 'success';
    warning: 'warning';
    error: 'error';
    blocked: 'blocked';
    severeWarning: 'severeWarning';
    successNoIcon: 'successNoIcon';
    warningNoIcon: 'warningNoIcon';
    errorNoIcon: 'errorNoIcon';
    blockedNoIcon: 'blockedNoIcon';
    info: 'info';
    remove: 'remove';
  }
