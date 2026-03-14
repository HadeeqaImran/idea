import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../theme';

export function ProgressDots({ activeIndex }: { activeIndex: number }) {
  return (
    <View style={styles.progressDots}>
      {[0, 1, 2, 3].map(index => (
        <View
          key={index}
          style={[
            styles.progressDot,
            index === activeIndex && styles.progressDotActive,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    marginBottom: spacing.xl,
  },
  progressDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.wheat,
  },
  progressDotActive: {
    width: 20,
    backgroundColor: colors.terracotta,
  },
});
