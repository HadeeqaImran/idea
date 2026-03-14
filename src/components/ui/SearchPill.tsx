import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typeScale } from '../../theme';

export function SearchPill({ label }: { label: string }) {
  return (
    <View style={styles.searchPill}>
      <Text style={styles.searchIcon}>🔍</Text>
      <Text style={styles.searchText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  searchPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warmCream,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
    marginTop: spacing.md,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: spacing.sm,
  },
  searchText: {
    ...typeScale.bodySm,
    color: colors.warmTaupe,
  },
});
