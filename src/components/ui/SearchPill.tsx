import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicon from '@react-native-vector-icons/ionicons/static';
import { colors, radii, spacing, typeScale } from '../../theme';

export function SearchPill({ label }: { label: string }) {
  return (
    <View style={styles.searchPill}>
      <Ionicon name="search-outline" size={14} color={colors.warmTaupe} />
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
  searchText: {
    ...typeScale.bodySm,
    color: colors.warmTaupe,
    marginLeft: spacing.sm,
  },
});
