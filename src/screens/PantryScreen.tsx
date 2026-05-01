import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Ionicon from '@react-native-vector-icons/ionicons/static';
import type { IoniconsIconName } from '@react-native-vector-icons/ionicons/static';
import { colors, radii, spacing, typeScale } from '../theme';
import {
  AppHeader,
  FloatingButton,
  FoodIcon,
  PillButton,
  SearchPill,
  SectionLabel,
  SurfaceCard,
} from '../components/ui';

function PantryRow({
  icon,
  title,
  meta,
  badge,
  success,
  danger,
  borderless,
}: {
  icon: string;
  title: string;
  meta: string;
  badge: string;
  success?: boolean;
  danger?: boolean;
  borderless?: boolean;
}) {
  return (
    <View style={[styles.pantryRow, borderless && styles.rowNoBorder]}>
      <FoodIcon icon={icon} />
      <View style={styles.flexOne}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowMeta}>{meta}</Text>
      </View>
      <View
        style={[
          styles.expiryBadge,
          success && styles.expiryBadgeSuccess,
          danger && styles.expiryBadgeDanger,
        ]}
      >
        <Text
          style={[
            styles.expiryBadgeText,
            success && styles.expiryBadgeTextSuccess,
            danger && styles.expiryBadgeTextDanger,
          ]}
        >
          {badge}
        </Text>
      </View>
    </View>
  );
}

function MethodTile({
  icon,
  label,
  active,
}: {
  icon: string;
  label: string;
  active?: boolean;
}) {
  return (
    <View style={[styles.methodTile, active && styles.methodTileActive]}>
      <Ionicon
        name={icon as IoniconsIconName}
        size={22}
        color={active ? colors.white : colors.darkEspresso}
      />
      <Text style={[styles.methodLabel, active && styles.methodLabelActive]}>
        {label}
      </Text>
    </View>
  );
}

export function PantryScreen() {
  return (
    <>
      <AppHeader
        title="My Pantry"
        rightAccessory={<FloatingButton label="+" />}
        showMenuButton={false}
        style={styles.header}
      />

      <SearchPill label="Search your pantry…" />

      <SectionLabel label="Sections" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      >
        {([
          ['snow-outline', 'Fridge', '14 items', true],
          ['file-tray-full-outline', 'Pantry', '22 items', false],
          ['snow-outline', 'Freezer', '8 items', false],
          ['home-outline', 'Household', '11 items', false],
          ['medkit-outline', 'Medicine', '6 items', false],
        ] as const).map(([icon, label, count, active]) => (
          <View
            key={label}
            style={[
              styles.shelfCard,
              active ? styles.shelfCardActive : styles.shelfCardInactive,
            ]}
          >
            <Ionicon
              name={icon as IoniconsIconName}
              size={26}
              color={active ? colors.white : colors.darkEspresso}
            />
            <Text style={[styles.shelfTitle, active ? styles.shelfTitleActive : null]}>
              {label}
            </Text>
            <Text style={[styles.shelfCount, active ? styles.shelfCountActive : null]}>
              {count}
            </Text>
          </View>
        ))}
      </ScrollView>

      <SurfaceCard style={[styles.stackGap, styles.expiryCardEmphasis]}>
        <View style={styles.rowBetween}>
          <SectionLabel label="Expiring soon" noMargin />
          <Text style={styles.inlineAccent}>Use these up</Text>
        </View>
        <PantryRow icon="flask-outline" title="Full fat milk" meta="Fridge · 900ml" badge="Tomorrow" danger />
        <PantryRow icon="leaf-outline" title="Cherry tomatoes" meta="Fridge · 200g" badge="2 days" />
        <PantryRow icon="pizza-outline" title="Mozzarella" meta="Fridge · 125g" badge="3 days" borderless />
        <PillButton label="Show recipes using these" compact />
      </SurfaceCard>

      <SectionLabel label="Fridge" />
      <SurfaceCard style={styles.stackGap}>
        <PantryRow icon="egg-outline" title="Free-range eggs" meta="6 remaining" badge="12 days" success />
        <PantryRow icon="nutrition-outline" title="Salted butter" meta="250g block" badge="18 days" success />
        <PantryRow icon="leaf" title="Spinach" meta="200g bag" badge="5 days" success borderless />
      </SurfaceCard>

      <SurfaceCard style={styles.stackGap}>
        <Text style={styles.headingTitle}>Add to pantry</Text>
        <Text style={styles.sectionCopy}>
          Scan a barcode, photo your receipt, or type it in.
        </Text>
        <View style={styles.scanViewport}>
          <View style={[styles.scanCorner, styles.scanCornerTopLeft]} />
          <View style={[styles.scanCorner, styles.scanCornerTopRight]} />
          <View style={[styles.scanCorner, styles.scanCornerBottomLeft]} />
          <View style={[styles.scanCorner, styles.scanCornerBottomRight]} />
          <View style={styles.scanLine} />
          <Text style={styles.scanText}>Point at barcode or product label</Text>
        </View>
        <View style={styles.threeColumnGrid}>
          <MethodTile label="Photo receipt" icon="camera-outline" />
          <MethodTile label="Scan barcode" icon="barcode-outline" active />
          <MethodTile label="Type item" icon="pencil-outline" />
        </View>
      </SurfaceCard>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.md,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stackGap: {
    marginTop: spacing.md,
  },
  flexOne: {
    flex: 1,
  },
  horizontalList: {
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  shelfCard: {
    minWidth: 114,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shelfCardActive: {
    backgroundColor: colors.terracotta,
    borderWidth: 0,
  },
  shelfCardInactive: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  shelfTitle: {
    ...typeScale.label,
    color: colors.darkEspresso,
    marginTop: spacing.sm,
  },
  shelfTitleActive: {
    color: colors.white,
  },
  shelfCount: {
    ...typeScale.label,
    color: colors.warmTaupe,
    marginTop: 2,
  },
  shelfCountActive: {
    color: 'rgba(255,255,255,0.76)',
  },
  expiryCardEmphasis: {
    backgroundColor: colors.terracottaWash,
    borderColor: 'rgba(196,103,58,0.25)',
  },
  inlineAccent: {
    ...typeScale.label,
    color: colors.terracotta,
  },
  pantryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowNoBorder: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  rowTitle: {
    ...typeScale.bodySm,
    color: colors.darkEspresso,
    fontWeight: '500',
  },
  rowMeta: {
    ...typeScale.label,
    color: colors.warmTaupe,
    marginTop: 2,
  },
  expiryBadge: {
    backgroundColor: 'rgba(196,103,58,0.15)',
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  expiryBadgeSuccess: {
    backgroundColor: colors.sageWash,
  },
  expiryBadgeDanger: {
    backgroundColor: 'rgba(220,60,60,0.1)',
  },
  expiryBadgeText: {
    ...typeScale.label,
    color: colors.firedClay,
  },
  expiryBadgeTextSuccess: {
    color: colors.herb,
  },
  expiryBadgeTextDanger: {
    color: '#A02020',
  },
  headingTitle: {
    ...typeScale.heading,
    color: colors.darkEspresso,
  },
  sectionCopy: {
    ...typeScale.bodySm,
    color: colors.warmTaupe,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  scanViewport: {
    height: 156,
    borderRadius: radii.md,
    backgroundColor: '#1A1208',
    marginBottom: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  scanCorner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: colors.terracotta,
  },
  scanCornerTopLeft: {
    top: 16,
    left: 16,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  scanCornerTopRight: {
    top: 16,
    right: 16,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  scanCornerBottomLeft: {
    left: 16,
    bottom: 16,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
  },
  scanCornerBottomRight: {
    right: 16,
    bottom: 16,
    borderRightWidth: 3,
    borderBottomWidth: 3,
  },
  scanLine: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: '50%',
    height: 2,
    backgroundColor: colors.terracotta,
  },
  scanText: {
    ...typeScale.label,
    color: 'rgba(255,255,255,0.5)',
    position: 'absolute',
    bottom: 12,
  },
  threeColumnGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  methodTile: {
    flex: 1,
    minWidth: 98,
    backgroundColor: colors.warmCream,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    alignItems: 'center',
  },
  methodTileActive: {
    backgroundColor: colors.terracotta,
    borderColor: colors.terracotta,
  },
  methodLabel: {
    ...typeScale.label,
    color: colors.darkEspresso,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  methodLabelActive: {
    color: colors.white,
  },
});
