import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typeScale } from '../../theme';

export function SelectionTile({
  label,
  active,
  compact,
}: {
  label: string;
  active?: boolean;
  compact?: boolean;
}) {
  return (
    <View
      style={[
        compact ? styles.selectionTileCompact : styles.selectionTile,
        active ? styles.selectionTileActive : styles.selectionTileInactive,
      ]}
    >
      <Text
        style={[
          compact ? styles.selectionTextCompact : styles.selectionText,
          active ? styles.selectionTextActive : styles.selectionTextInactive,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  selectionTile: {
    width: '48.7%',
    borderRadius: radii.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
  },
  selectionTileCompact: {
    flex: 1,
    minWidth: 98,
    borderRadius: radii.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    alignItems: 'center',
  },
  selectionTileActive: {
    backgroundColor: colors.terracotta,
  },
  selectionTileInactive: {
    backgroundColor: colors.warmCream,
  },
  selectionText: {
    ...typeScale.bodySm,
    fontWeight: '500',
  },
  selectionTextCompact: {
    ...typeScale.label,
  },
  selectionTextActive: {
    color: colors.white,
  },
  selectionTextInactive: {
    color: colors.warmTaupe,
  },
});
