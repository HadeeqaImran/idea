import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, typeScale } from '../../theme';

export function Chip({
  label,
  tone,
}: {
  label: string;
  tone?: 'terra' | 'sage' | 'gold';
}) {
  return (
    <View
      style={[
        styles.chip,
        tone === 'terra' && styles.chipTerra,
        tone === 'sage' && styles.chipSage,
        tone === 'gold' && styles.chipGold,
      ]}
    >
      <Text
        style={[
          styles.chipText,
          tone === 'terra' && styles.chipTextTerra,
          tone === 'sage' && styles.chipTextSage,
          tone === 'gold' && styles.chipTextGold,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

export function HeroChip({ label, strong }: { label: string; strong?: boolean }) {
  return (
    <View style={[styles.heroChip, strong && styles.heroChipStrong]}>
      <Text style={[styles.heroChipText, strong && styles.heroChipTextStrong]}>
        {label}
      </Text>
    </View>
  );
}

export function ReplyChip({ label, active }: { label: string; active?: boolean }) {
  return (
    <View style={[styles.replyChip, active && styles.replyChipActive]}>
      <Text style={[styles.replyChipText, active && styles.replyChipTextActive]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: radii.pill,
    backgroundColor: colors.warmCream,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  chipTerra: {
    backgroundColor: 'rgba(196,103,58,0.12)',
    borderWidth: 0,
  },
  chipSage: {
    backgroundColor: colors.sageWash,
    borderWidth: 0,
  },
  chipGold: {
    backgroundColor: colors.goldWash,
    borderWidth: 0,
  },
  chipText: {
    ...typeScale.label,
    color: colors.warmTaupe,
  },
  chipTextTerra: {
    color: colors.firedClay,
  },
  chipTextSage: {
    color: colors.herb,
  },
  chipTextGold: {
    color: '#7A5E2A',
  },
  heroChip: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  heroChipStrong: {
    backgroundColor: 'rgba(255,255,255,0.96)',
    marginLeft: 'auto',
  },
  heroChipText: {
    ...typeScale.label,
    color: colors.white,
  },
  heroChipTextStrong: {
    color: colors.terracotta,
    fontWeight: '700',
  },
  replyChip: {
    backgroundColor: colors.warmCream,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  replyChipActive: {
    borderColor: colors.terracotta,
  },
  replyChipText: {
    ...typeScale.label,
    color: colors.warmTaupe,
  },
  replyChipTextActive: {
    color: colors.terracotta,
  },
});
