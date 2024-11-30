import { IComboBoxOption, IComboBoxStyles } from "@fluentui/react";

export interface IComboBoxProps { 
    label?: string;
    options? : IComboBoxOption[];
    selectedKey?: string | number | undefined;
    defaultSelectedKey?: string | number | undefined;
    styles?: Partial<IComboBoxStyles>;
    allowFreeInput? : boolean;
    autoComplete? : string;
    onChange?: any;
    errorMessage?: string;
    }