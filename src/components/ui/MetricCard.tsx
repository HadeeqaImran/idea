import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicon from '@react-native-vector-icons/ionicons/static';
import type { IoniconsIconName } from '@react-native-vector-icons/ionicons/static';
import { colors, radii, spacing, typeScale } from '../../theme';
import { WarmCard } from './Cards';

export function MetricCard({
  icon,
  value,
  label,
  progress,
  accent,
  caption,
}: {
  icon: string;
  value: string;
  label: string;
  progress?: number;
  accent?: boolean;
  caption?: string;
}) {
  return (
    <WarmCard style={styles.metricCard}>
      <Ionicon name={icon as IoniconsIconName} size={20} color={colors.darkEspresso} />
      <Text style={[styles.metricValue, accent && styles.metricValueAccent]}>
        {value}
      </Text>
      <Text style={styles.metricLabel}>{label}</Text>
      {typeof progress === 'number' ? (
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
      ) : null}
      {caption ? <Text style={styles.metricCaption}>{caption}</Text> : null}
    </WarmCard>
  );
}

export function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <WarmCard style={styles.miniMetric}>
      <Text style={styles.miniMetricValue}>{value}</Text>
      <Text style={styles.miniMetricLabel}>{label}</Text>
    </WarmCard>
  );
}

const styles = StyleSheet.create({
  metricCard: {
    width: '48.7%',
  },
  metricValue: {
    fontFamily: undefined,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '600',
    color: colors.darkEspresso,
  },
  metricValueAccent: {
    color: colors.terracotta,
  },
  metricLabel: {
    ...typeScale.label,
    color: colors.warmTaupe,
    marginTop: 2,
  },
  metricCaption: {
    ...typeScale.label,
    color: colors.terracotta,
    marginTop: spacing.sm,
  },
  progressTrack: {
    height: 5,
    borderRadius: radii.pill,
    backgroundColor: colors.warmCream,
    overflow: 'hidden',
    marginTop: spacing.sm,
  },
  progressFill: {
    height: 5,
    borderRadius: radii.pill,
    backgroundColor: colors.terracotta,
  },
  miniMetric: {
    flex: 1,
    alignItems: 'center',
  },
  miniMetricValue: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '600',
    color: colors.darkEspresso,
  },
  miniMetricLabel: {
    ...typeScale.label,
    color: colors.warmTaupe,
    textAlign: 'center',
  },
});
