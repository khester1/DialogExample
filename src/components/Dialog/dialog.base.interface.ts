export interface CustomDialogProps {
    subtext?: string;
    title?: string;
    primaryButtonText?: string;
    secondaryButtonText?: string;
    onSelect: (newValue: any) => void;
  };


  