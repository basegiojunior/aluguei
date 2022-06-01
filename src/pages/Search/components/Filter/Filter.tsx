import React from 'react';
import { ScrollView, View } from 'react-native';
import {
  Button,
  List,
  Modal,
  Subheading,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

import ToggleList from '../ToggleList';
import styles from './Filter.styles';
import { FilterProps } from './Filter.types';

const ROOMS_OPTIONS = [
  { icon: 'numeric-1', value: '1' },
  { icon: 'numeric-2', value: '2' },
  { icon: 'numeric-3', value: '3' },
  { icon: 'numeric-4', value: '4' },
  { icon: 'numeric-5', value: '5' },
  { icon: 'numeric-6', value: '6' },
  { icon: 'numeric-7', value: '7' },
  { icon: 'numeric-8', value: '8' },
  { icon: 'numeric-9-plus', value: '9+' },
];

export const Filter: React.FC<FilterProps> = ({ visible, onDimiss }) => {
  const { roundness, colors } = useTheme();

  const [min, setMin] = React.useState('');
  const [max, setMax] = React.useState('');
  const [bathroom, setBathroom] = React.useState('');
  const [bedroom, setBedroom] = React.useState('');

  function removeNonNumbers(value: string) {
    return value.replace(/\D/g, '');
  }

  function onChangeMin(newValue: string) {
    console.log('before', newValue);
    const newValueOnlyNumbers = removeNonNumbers(newValue);
    console.log('after', newValueOnlyNumbers);
    setMin(newValueOnlyNumbers);
  }

  function onChangeMax(newValue: string) {
    const newValueOnlyNumbers = removeNonNumbers(newValue);
    setMax(newValueOnlyNumbers);
  }

  const filterStyle = styles({ borderRadius: roundness });
  return (
    <Modal
      contentContainerStyle={filterStyle.modalContainer}
      onDismiss={onDimiss}
      visible={visible}>
      <ScrollView contentContainerStyle={filterStyle.modalContent}>
        <Subheading>Preço entre</Subheading>
        <List.Section>
          <View style={filterStyle.alignRow}>
            <TextInput
              label="Mínimo"
              left={<TextInput.Affix text="R$ " />}
              onChangeText={onChangeMin}
              right={<TextInput.Affix text=",00" />}
              style={filterStyle.priceInput}
              value={min}
            />
            <Text style={filterStyle.priceText}>e</Text>
            <TextInput
              label="Máximo"
              left={<TextInput.Affix text="R$ " />}
              onChangeText={onChangeMax}
              right={<TextInput.Affix text=",00" />}
              style={filterStyle.priceInput}
              value={max}
            />
          </View>
        </List.Section>

        <ToggleList
          list={ROOMS_OPTIONS}
          onChange={setBedroom}
          title="Quartos"
          value={bedroom}
        />
        <ToggleList
          list={ROOMS_OPTIONS}
          onChange={setBathroom}
          title="Banheiros"
          value={bathroom}
        />

        <View style={filterStyle.footerContainer}>
          <Button color={colors.error} mode="text" onPress={onDimiss}>
            Cancelar
          </Button>
          <Button mode="text">Aplicar</Button>
        </View>
      </ScrollView>
    </Modal>
  );
};
