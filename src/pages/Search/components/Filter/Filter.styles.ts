import { Dimensions, StyleSheet } from 'react-native';

type StyleType = {
  borderRadius: number;
};

const styles = ({ borderRadius }: StyleType) =>
  StyleSheet.create({
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
    priceRow: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 8,
    },
    priceText: {
      padding: 16,
    },
  });

export default styles;
