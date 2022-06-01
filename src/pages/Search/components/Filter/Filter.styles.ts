import { Dimensions, StyleSheet } from 'react-native';

type StyleType = {
  borderRadius: number;
};

const styles = ({ borderRadius }: StyleType) =>
  StyleSheet.create({
    alignRow: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    footerContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingTop: 16,
    },
    justifyContentBetween: {
      justifyContent: 'space-between',
    },
    modalContainer: {
      backgroundColor: '#fff',
      borderRadius,
      left: 24,
      maxHeight: Dimensions.get('window').height - 200,
      width: Dimensions.get('window').width - 48,
    },
    modalContent: {
      padding: 24,
    },
    priceInput: {
      flex: 1,
    },
    priceText: {
      padding: 16,
    },
  });

export default styles;
