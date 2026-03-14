import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typeScale } from '../theme';
import {
  FloatingButton,
  PillButton,
  SecondaryButton,
  SectionLabel,
  SurfaceCard,
} from '../components/ui';

function ShopRow({
  title,
  meta,
  price,
  done,
  borderless,
}: {
  title: string;
  meta: string;
  price: string;
  done?: boolean;
  borderless?: boolean;
}) {
  return (
    <View style={[styles.shopRow, borderless && styles.rowNoBorder]}>
      <View style={[styles.shopCheck, done && styles.shopCheckDone]}>
        {done ? <Text style={styles.shopCheckMark}>✓</Text> : null}
      </View>
      <View style={styles.flexOne}>
        <Text style={[styles.rowTitle, done && styles.shopDoneText]}>{title}</Text>
        <Text style={styles.rowMeta}>{meta}</Text>
      </View>
      <Text style={[styles.rowMeta, done && styles.shopDoneAccent]}>{price}</Text>
    </View>
  );
}

export function ShoppingScreen() {
  return (
    <>
      <View style={styles.rowBetween}>
        <Text style={styles.displayTitle}>Shopping</Text>
        <FloatingButton label="+" />
      </View>

      <View style={styles.summaryBanner}>
        <View>
          <Text style={styles.summaryCaption}>This week's list</Text>
          <Text style={styles.summaryValue}>7 items</Text>
        </View>
        <View style={styles.summaryRight}>
          <Text style={styles.summaryCaption}>Auto-generated from</Text>
          <Text style={styles.summaryMeta}>Meal plan + pantry</Text>
        </View>
      </View>

      <SectionLabel label="🥬 Produce" />
      <SurfaceCard style={styles.stackGap}>
        <ShopRow title="Fresh basil" meta="For Caprese salad · 1 bunch" price="~£1.50" />
        <ShopRow title="Cherry tomatoes" meta="Restocking (3 days left) · 400g" price="~£2.20" borderless />
      </SurfaceCard>

      <SectionLabel label="🥛 Dairy & Eggs" />
      <SurfaceCard style={styles.stackGap}>
        <ShopRow title="Full fat milk" meta="2 litre" price="✓ Got it" done />
        <ShopRow title="Feta cheese" meta="For Shakshuka · 200g" price="~£3.00" borderless />
      </SurfaceCard>

      <SectionLabel label="🍞 Bakery" />
      <SurfaceCard style={styles.stackGap}>
        <ShopRow title="Sourdough loaf" meta="For lunch this week" price="~£3.50" borderless />
      </SurfaceCard>

      <View style={styles.rowGapSm}>
        <SecondaryButton label="Share list" />
        <PillButton label="Send to partner" style={styles.flexOne} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowGapSm: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  flexOne: {
    flex: 1,
  },
  displayTitle: {
    ...typeScale.displayLg,
    color: colors.darkEspresso,
  },
  stackGap: {
    marginTop: spacing.md,
  },
  summaryBanner: {
    backgroundColor: colors.terracotta,
    borderRadius: radii.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    marginTop: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryCaption: {
    ...typeScale.label,
    color: 'rgba(255,255,255,0.75)',
  },
  summaryValue: {
    ...typeScale.displayLg,
    color: colors.white,
    marginTop: 2,
  },
  summaryRight: {
    alignItems: 'flex-end',
  },
  summaryMeta: {
    ...typeScale.bodySm,
    color: colors.white,
    fontWeight: '600',
  },
  shopRow: {
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
  shopCheck: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopCheckDone: {
    backgroundColor: colors.terracotta,
  },
  shopCheckMark: {
    ...typeScale.label,
    color: colors.white,
    fontWeight: '700',
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
  shopDoneText: {
    textDecorationLine: 'line-through',
    opacity: 0.55,
  },
  shopDoneAccent: {
    color: colors.sage,
  },
});
