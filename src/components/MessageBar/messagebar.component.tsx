import * as React from 'react';
import {
  Link,
  Stack,
  StackItem,
  MessageBar,
  MessageBarType,
  ChoiceGroup,
  IStackProps,
  MessageBarButton,
  Text,
  IChoiceGroupStyles,
  initializeIcons
} from '@fluentui/react';

initializeIcons();


interface IExampleProps {
  resetChoice?: () => void;
}

const horizontalStackProps: IStackProps = {
  horizontal: true,
  wrap: true,
  tokens: { childrenGap: 16 },
};
const verticalStackProps: IStackProps = {
  grow: true,
  styles: { root: { overflow: 'hidden', width: '60%' } },
  tokens: { childrenGap: 20 },
};
const choiceGroupStyles: Partial<IChoiceGroupStyles> = { label: { maxWidth: 250 } };

const DefaultExample = () => (
  <MessageBar>
    Info (default) MessageBar.
    <Link href="www.bing.com" target="_blank" underline>
      Visit our website.
    </Link>
  </MessageBar>
);

const ErrorExample = (p: IExampleProps) => (
  <MessageBar
    messageBarType={MessageBarType.error}
    isMultiline={false}
    onDismiss={p.resetChoice}
    dismissButtonAriaLabel="Close"
  >
    Error MessageBar with single line, with dismiss button.
    <Link href="www.bing.com" target="_blank" underline>
      Visit our website.
    </Link>
  </MessageBar>
);

const BlockedExample = (p: IExampleProps) => (
  <MessageBar
    messageBarType={MessageBarType.blocked}
    isMultiline={false}
    onDismiss={p.resetChoice}
    dismissButtonAriaLabel="Close"
    truncated={true}
    overflowButtonAriaLabel="See more"
  >
    <b>Blocked MessageBar - single line, with dismiss button and truncated text.</b> Truncation is not available if you
    use action buttons or multiline and should be used sparingly. Lorem ipsum dolor sit amet, consectetur adipiscing
    elit. Morbi luctus, purus a lobortis tristique, odio augue pharetra metus, ac placerat nunc mi nec dui. Vestibulum
    aliquam et nunc semper scelerisque. Curabitur vitae orci nec quam condimentum porttitor et sed lacus. Vivamus ac
    efficitur leo. Cras faucibus mauris libero, ac placerat erat euismod et. Donec pulvinar commodo odio sit amet
    faucibus. In hac habitasse platea dictumst. Duis eu ante commodo, condimentum nibh pellentesque, laoreet enim. Fusce
    massa lorem, ultrices eu mi a, fermentum suscipit magna. Integer porta purus pulvinar, hendrerit felis eget,
    condimentum mauris.
  </MessageBar>
);

const SevereExample = (p: IExampleProps) => (
  <MessageBar
    messageBarType={MessageBarType.severeWarning}
    actions={
      <div>
        <MessageBarButton>Yes</MessageBarButton>
        <MessageBarButton>No</MessageBarButton>
      </div>
    }
  >
    SevereWarning MessageBar with action buttons which defaults to multiline.
    <Link href="www.bing.com" target="_blank" underline>
      Visit our website.
    </Link>
  </MessageBar>
);

const SuccessExample = () => (
  <MessageBar
    actions={
      <div>
        <MessageBarButton>Yes</MessageBarButton>
        <MessageBarButton>No</MessageBarButton>
      </div>
    }
    messageBarType={MessageBarType.success}
    isMultiline={false}
  >
    Success MessageBar with single line and action buttons.
    <Link href="www.bing.com" target="_blank" underline>
      Visit our website.
    </Link>
  </MessageBar>
);

const WarningExample = (p: IExampleProps) => (
  <MessageBar
    messageBarType={MessageBarType.warning}
    isMultiline={false}
    onDismiss={p.resetChoice}
    dismissButtonAriaLabel="Close"
    actions={
      <div>
        <MessageBarButton>Action</MessageBarButton>
      </div>
    }
  >
    Warning MessageBar content.
    <Link href="www.bing.com" target="_blank" underline>
      Visit our website.
    </Link>
  </MessageBar>
);

const WarningExample2 = (p: IExampleProps) => (
  <MessageBar
    onDismiss={p.resetChoice}
    dismissButtonAriaLabel="Close"
    messageBarType={MessageBarType.warning}
    actions={
      <div>
        <MessageBarButton>Yes</MessageBarButton>
        <MessageBarButton>No</MessageBarButton>
      </div>
    }
  >
    <b>Warning defaults to multiline</b>. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus, purus a
    lobortis tristique, odio augue pharetra metus, ac placerat nunc mi nec dui. Vestibulum aliquam et nunc semper
    scelerisque. Curabitur vitae orci nec quam condimentum porttitor et sed lacus. Vivamus ac efficitur leo. Cras
    faucibus mauris libero, ac placerat erat euismod et. Donec pulvinar commodo odio sit amet faucibus. In hac habitasse
    platea dictumst. Duis eu ante commodo, condimentum nibh pellentesque, laoreet enim. Fusce massa lorem, ultrices eu
    mi a, fermentum suscipit magna. Integer porta purus pulvinar, hendrerit felis eget, condimentum mauris.
    <Link href="www.bing.com" target="_blank" underline>
      Visit our website.
    </Link>
  </MessageBar>
);


export const MessageBarComponent: React.FunctionComponent = () => {
  const [choice, setChoice] = React.useState<string | undefined>(undefined);

  return (
    <>
        <SuccessExample />
    </>
  );
};
