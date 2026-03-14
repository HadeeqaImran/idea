import { Platform, TextStyle, ViewStyle } from 'react-native';

export const colors = {
  linen: '#FDF6EE',
  warmCream: '#F5E6D0',
  wheat: '#E8C9A4',
  terracotta: '#C4673A',
  firedClay: '#8B3E1E',
  sage: '#5E7A5C',
  herb: '#3D5C3B',
  warmTaupe: '#7A6152',
  darkEspresso: '#2C1F14',
  warmGold: '#B8925A',
  white: '#FFFFFF',
  border: 'rgba(196,103,58,0.15)',
  terracottaWash: 'rgba(196,103,58,0.08)',
  sageWash: 'rgba(94,122,92,0.12)',
  goldWash: 'rgba(184,146,90,0.15)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const radii = {
  sm: 8,
  md: 14,
  lg: 22,
  xl: 28,
  pill: 999,
} as const;

export const shadows = {
  card: Platform.select<ViewStyle>({
    ios: {
      shadowColor: colors.terracotta,
      shadowOpacity: 0.08,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 2 },
    },
    android: {
      elevation: 3,
    },
    default: {},
  }) as ViewStyle,
  strong: Platform.select<ViewStyle>({
    ios: {
      shadowColor: colors.darkEspresso,
      shadowOpacity: 0.12,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 10 },
    },
    android: {
      elevation: 6,
    },
    default: {},
  }) as ViewStyle,
};

const displayRegular = Platform.select({
  ios: 'Lora',
  android: 'Lora',
  default: 'serif',
});

const displayItalic = Platform.select({
  ios: 'Lora Italic',
  android: 'Lora-Italic',
  default: 'serif',
});

const body = Platform.select({
  ios: 'DM Sans',
  android: 'DMSans',
  default: 'sans-serif',
});

export const fonts = {
  displayRegular,
  displayItalic,
  body,
} as const;

export const typeScale = {
  displayXl: {
    fontFamily: fonts.displayItalic,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '400',
  } satisfies TextStyle,
  displayLg: {
    fontFamily: fonts.displayRegular,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '600',
  } satisfies TextStyle,
  heading: {
    fontFamily: fonts.displayRegular,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
  } satisfies TextStyle,
  bodyLg: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  } satisfies TextStyle,
  bodySm: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  } satisfies TextStyle,
  label: {
    fontFamily: fonts.body,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  } satisfies TextStyle,
};
