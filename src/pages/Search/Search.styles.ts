import { StyleSheet } from 'react-native';
import { DarkTheme } from 'react-native-paper';
import { Theme } from 'react-native-paper/lib/typescript/types';

export const HeaderTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    placeholder: '#eee',
    primary: '#fff',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'flex-start',
    height: 'auto',
    paddingBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  headerInput: { backgroundColor: 'transparent', flex: 1 },
  mapContainer: {
    flex: 1,
  },
});

export default styles;
