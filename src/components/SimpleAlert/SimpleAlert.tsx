import React from 'react';
import { Button, Dialog, Paragraph } from 'react-native-paper';

import { SimpleAlertProps } from './SimpleAlert.types';

export const SimpleAlert: React.FC<SimpleAlertProps> = ({
  visible = false,
  onClose,
  title,
  content,
  testIDOkButton,
}) => {
  return (
    <Dialog visible={visible}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Content>
        <Paragraph>{content}</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onClose} testID={testIDOkButton}>
          Ok
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};
