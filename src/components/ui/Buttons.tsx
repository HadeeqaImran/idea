import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, radii, spacing, typeScale } from '../../theme';

export function PillButton({
  label,
  compact,
  inverted,
  style,
}: {
  label: string;
  compact?: boolean;
  inverted?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        compact ? styles.buttonCompact : styles.buttonPrimary,
        inverted && styles.buttonInverted,
        style,
      ]}
    >
      <Text
        style={[
          compact ? styles.buttonCompactText : styles.buttonPrimaryText,
          inverted && styles.buttonInvertedText,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

export function SecondaryButton({
  label,
  compact,
}: {
  label: string;
  compact?: boolean;
}) {
  return (
    <View style={[compact ? styles.buttonCompactAlt : styles.buttonSecondary]}>
      <Text style={compact ? styles.buttonCompactAltText : styles.buttonSecondaryText}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonPrimary: {
    backgroundColor: colors.terracotta,
    borderRadius: radii.pill,
    paddingVertical: 12,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 46,
  },
  buttonPrimaryText: {
    ...typeScale.bodySm,
    fontWeight: '600',
    color: colors.white,
  },
  buttonCompact: {
    backgroundColor: colors.terracotta,
    borderRadius: radii.pill,
    paddingVertical: 8,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCompactText: {
    ...typeScale.label,
    color: colors.white,
    fontWeight: '600',
  },
  buttonSecondary: {
    flex: 1,
    backgroundColor: colors.warmCream,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: colors.terracotta,
    paddingVertical: 12,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
  },
  buttonSecondaryText: {
    ...typeScale.bodySm,
    color: colors.terracotta,
    fontWeight: '600',
  },
  buttonCompactAlt: {
    backgroundColor: colors.warmCream,
    borderRadius: radii.pill,
    paddingVertical: 8,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCompactAltText: {
    ...typeScale.label,
    color: colors.warmTaupe,
    fontWeight: '600',
  },
  buttonInverted: {
    backgroundColor: 'rgba(255,255,255,0.96)',
    width: '100%',
  },
  buttonInvertedText: {
    color: colors.terracotta,
  },
});
