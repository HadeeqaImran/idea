import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, typeScale } from '../../theme';

export function Avatar({
  label,
  dot,
  small,
  large,
  tone,
}: {
  label: string;
  dot?: boolean;
  small?: boolean;
  large?: boolean;
  tone?: 'gold';
}) {
  return (
    <View style={styles.avatarWrap}>
      <View
        style={[
          styles.avatar,
          small && styles.avatarSmall,
          large && styles.avatarLarge,
          tone === 'gold' && styles.avatarGold,
        ]}
      >
        <Text
          style={[
            styles.avatarText,
            small && styles.avatarTextSmall,
            large && styles.avatarTextLarge,
          ]}
        >
          {label}
        </Text>
      </View>
      {dot ? <View style={styles.avatarDot} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarSmall: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  avatarLarge: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  avatarGold: {
    backgroundColor: colors.warmGold,
  },
  avatarText: {
    ...typeScale.bodySm,
    color: colors.white,
    fontWeight: '600',
  },
  avatarTextSmall: {
    ...typeScale.label,
    color: colors.white,
    fontWeight: '700',
  },
  avatarTextLarge: {
    ...typeScale.heading,
    color: colors.white,
  },
  avatarDot: {
    position: 'absolute',
    top: -1,
    right: -1,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.terracotta,
    borderWidth: 2,
    borderColor: colors.linen,
  },
});
