import * as React from 'react';
import { IContextualMenuProps } from '@fluentui/react';
import { ButtonCommandBarComponent } from './button.commandbar.component';

const ButtonCommandBarExample: React.FC = () => {
  const menuProps: IContextualMenuProps = {
    items: [
      {
        key: 'newItem',
        text: 'New',
        iconProps: { iconName: 'Add' },
        subMenuProps: {
          items: [
            {
              key: 'emailMessage',
              text: 'Email message',
              iconProps: { iconName: 'Mail' },
            },
            {
              key: 'calendarEvent',
              text: 'Calendar event',
              iconProps: { iconName: 'Calendar' },
            },
          ],
        },
      },
      {
        key: 'upload',
        text: 'Upload',
        iconProps: { iconName: 'Upload' },
      },
      {
        key: 'share',
        text: 'Share',
        iconProps: { iconName: 'Share' },
      },
    ],
  };

  const buttonProps = {
    iconName: 'Add',
    iconColor: 'blue',
    text: 'New Command',
    menuProps: menuProps,
    onClick: () => console.log('CommandBarButton clicked!'),
  };

  return (
    <div>
      <ButtonCommandBarComponent {...buttonProps} />
    </div>
  );
};

export default ButtonCommandBarExample;
