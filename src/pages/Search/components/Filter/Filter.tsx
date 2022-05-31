import React from 'react';
import { ScrollView, View } from 'react-native';
import { List, Modal, Text, TextInput, useTheme } from 'react-native-paper';

import styles from './Filter.styles';
import { FilterProps } from './Filter.types';

export const Filter: React.FC<FilterProps> = ({ visible, onDimiss }) => {
  const { roundness } = useTheme();

  const filterStyle = styles({ borderRadius: roundness });
  return (
    <Modal
      contentContainerStyle={filterStyle.modalContainer}
      onDismiss={onDimiss}
      visible={visible}>
      <ScrollView contentContainerStyle={filterStyle.modalContent}>
        <List.Section>
          <List.Subheader>Preço entre</List.Subheader>
          <View style={filterStyle.priceRow}>
            <TextInput
              label="Mínimo"
              left={<TextInput.Affix text="R$ " />}
              right={<TextInput.Affix text=",00" />}
              style={filterStyle.priceInput}
            />
            <Text style={filterStyle.priceText}>e</Text>
            <TextInput
              label="Máximo"
              left={<TextInput.Affix text="R$ " />}
              right={<TextInput.Affix text=",00" />}
              style={filterStyle.priceInput}
            />
          </View>
        </List.Section>
        <List.Section>
          <List.Subheader>Banheiros</List.Subheader>
        </List.Section>
      </ScrollView>
    </Modal>
  );
};
