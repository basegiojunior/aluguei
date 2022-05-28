import React, { createContext, useState } from 'react';
import { Button, Dialog, Paragraph } from 'react-native-paper';

type SimpleAlertProps = {
  onClose?: () => void;
  title?: string;
  content?: string;
  testIDOkButton?: string;
};

type PropsAlertContext = {
  showAlert: ({
    onClose,
    title,
    content,
    testIDOkButton,
  }: SimpleAlertProps) => void;
};

const DEFAULT_VALUE: PropsAlertContext = {
  showAlert: () => null,
};

const AlertContext = createContext<PropsAlertContext>(DEFAULT_VALUE);

export const AlertContextProvider: React.FC = ({ children }) => {
  const [alertProps, setAlertProps] = useState<SimpleAlertProps>({});
  const [visible, setVisible] = useState(false);

  function showAlert(alertParams: SimpleAlertProps) {
    setVisible(true);
    setAlertProps(alertParams);
  }

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Dialog
        onDismiss={() => {
          setVisible(false);
          alertProps.onClose && alertProps.onClose();
        }}
        visible={visible}>
        <Dialog.Title>{alertProps.title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{alertProps.content}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              setVisible(false);
              alertProps.onClose && alertProps.onClose();
            }}
            testID={alertProps.testIDOkButton}>
            Ok
          </Button>
        </Dialog.Actions>
      </Dialog>
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => React.useContext(AlertContext);
