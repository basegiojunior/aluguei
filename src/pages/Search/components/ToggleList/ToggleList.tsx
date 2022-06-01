import React from 'react';
import { ScrollView } from 'react-native';
import { List, Subheading, ToggleButton, useTheme } from 'react-native-paper';

import styles from './ToggleList.styles';
import { ToggleListProps } from './ToggleList.types';

export const ToggleList: React.FC<ToggleListProps> = ({
  value,
  onChange,
  list,
  title,
}) => {
  const { colors } = useTheme();

  return (
    <>
      <Subheading>{title}</Subheading>
      <List.Section>
        <ScrollView horizontal>
          <ToggleButton.Row onValueChange={onChange} value={value}>
            {list.map(option => (
              <ToggleButton
                color={
                  value === option.value ? colors.surface : colors.onSurface
                }
                icon={option.icon}
                size={28}
                style={[
                  styles.toggle,
                  {
                    backgroundColor:
                      value === option.value ? colors.primary : colors.surface,
                  },
                ]}
                value={option.value}
              />
            ))}
          </ToggleButton.Row>
        </ScrollView>
      </List.Section>
    </>
  );
};
