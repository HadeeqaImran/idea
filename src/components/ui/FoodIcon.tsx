import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii } from '../../theme';

export function FoodIcon({ emoji }: { emoji: string }) {
  return (
    <View style={styles.foodIcon}>
      <Text style={styles.foodIconText}>{emoji}</Text>
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
  foodIconText: {
    fontSize: 18,
  },
});
