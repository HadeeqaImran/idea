import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors, spacing, typeScale } from '../../theme';

export function SectionLabel({
  label,
  noMargin,
}: {
  label: string;
  noMargin?: boolean;
}) {
  return (
    <Text style={[styles.sectionLabel, noMargin ? undefined : styles.topMarginLg]}>
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  sectionLabel: {
    ...typeScale.label,
    color: colors.terracotta,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
  },
  topMarginLg: {
    marginTop: spacing.lg,
  },
});
