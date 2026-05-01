import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, shadows, spacing } from '../../theme';

export function FloatingButton({
  label,
  small,
  style,
}: {
  label: string;
  small?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[small ? styles.fabSmall : styles.fab, style]}>
      <Text style={small ? styles.fabSmallText : styles.fabText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  fabSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(253,246,238,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: {
    fontFamily: undefined,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '600',
    color: colors.white,
  },
  fabSmallText: {
    fontSize: 16,
    lineHeight: 20,
    color: colors.darkEspresso,
    fontWeight: '600',
    marginTop: spacing.xs,
  },
});
