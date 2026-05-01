import React from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicon from '@react-native-vector-icons/ionicons/static';
import type { IoniconsIconName } from '@react-native-vector-icons/ionicons/static';
import { colors, radii } from '../../theme';

export function FoodIcon({ icon }: { icon: string }) {
  return (
    <View style={styles.foodIcon}>
      <Ionicon name={icon as IoniconsIconName} size={18} color={colors.darkEspresso} />
    </View>
  );
}

const styles = StyleSheet.create({
  foodIcon: {
    width: 36,
    height: 36,
    borderRadius: radii.sm,
    backgroundColor: colors.warmCream,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
