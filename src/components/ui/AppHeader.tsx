import React, { type ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import Ionicon from '@react-native-vector-icons/ionicons/static';
import type { IoniconsIconName } from '@react-native-vector-icons/ionicons/static';

import { useDrawer } from '../../context/DrawerContext';
import { colors, spacing, typeScale } from '../../theme';

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  subtitleAccessory?: ReactNode;
  showMenuButton?: boolean;
  onMenuPress?: () => void;
  menuIconName?: IoniconsIconName;
  leftAccessory?: ReactNode;
  rightAccessory?: ReactNode;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  textContainerStyle?: StyleProp<ViewStyle>;
};

export function AppHeader({
  title,
  subtitle,
  subtitleAccessory,
  showMenuButton = true,
  onMenuPress,
  menuIconName = 'menu-outline',
  leftAccessory,
  rightAccessory,
  style,
  titleStyle,
  subtitleStyle,
  textContainerStyle,
}: AppHeaderProps) {
  const { openDrawer } = useDrawer();
  const shouldShowMenuButton = showMenuButton && !leftAccessory;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        {leftAccessory ? <View style={styles.accessory}>{leftAccessory}</View> : null}
        {shouldShowMenuButton ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open menu"
            onPress={onMenuPress ?? openDrawer}
            style={styles.menuButton}
          >
            <Ionicon name={menuIconName} size={20} color={colors.darkEspresso} />
          </Pressable>
        ) : null}
        <View style={[styles.textContainer, textContainerStyle]}>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
          {subtitle ? (
            <View style={styles.subtitleRow}>
              <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
              {subtitleAccessory ? <View>{subtitleAccessory}</View> : null}
            </View>
          ) : null}
        </View>
        {rightAccessory ? <View style={styles.accessory}>{rightAccessory}</View> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...typeScale.displayLg,
    color: colors.darkEspresso,
  },
  subtitle: {
    ...typeScale.bodySm,
    color: colors.warmTaupe,
    marginTop: spacing.xs,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  accessory: {
    flexShrink: 0,
  },
  menuButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.warmCream,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
