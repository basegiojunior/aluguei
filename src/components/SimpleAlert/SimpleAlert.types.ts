export interface SimpleAlertProps {
  visible?: boolean;
  onClose?: () => void;
  title?: string;
  content?: string;
  testIDOkButton?: string;
}
