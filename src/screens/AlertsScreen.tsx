import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typeScale } from '../theme';
import { PillButton, SecondaryButton, SectionLabel, SurfaceCard } from '../components/ui';

function AlertRow({
  icon,
  title,
  copy,
  actions,
  tone,
  borderless,
}: {
  icon: string;
  title: string;
  copy: string;
  actions: string[];
  tone: 'terra' | 'sage' | 'gold';
  borderless?: boolean;
}) {
  return (
    <View style={[styles.alertRow, borderless && styles.rowNoBorder]}>
      <View
        style={[
          styles.alertIconWrap,
          tone === 'terra' && styles.alertIconTerra,
          tone === 'sage' && styles.alertIconSage,
          tone === 'gold' && styles.alertIconGold,
        ]}
      >
        <Text>{icon}</Text>
      </View>
      <View style={styles.flexOne}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.sectionBody}>{copy}</Text>
        <View style={styles.rowGapSm}>
          {actions.map((action, index) =>
            index === 0 ? (
              <PillButton key={action} label={action} compact />
            ) : (
              <SecondaryButton key={action} label={action} compact />
            ),
          )}
        </View>
      </View>
    </View>
  );
}

function SimpleAlert({
  icon,
  title,
  copy,
  meta,
  sage,
  borderless,
}: {
  icon: string;
  title: string;
  copy: string;
  meta: string;
  sage?: boolean;
  borderless?: boolean;
}) {
  return (
    <View style={[styles.alertRow, borderless && styles.rowNoBorder]}>
      <View style={[styles.alertIconWrap, sage && styles.alertIconSage]}>
        <Text>{icon}</Text>
      </View>
      <View style={styles.flexOne}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowMeta}>{copy}</Text>
      </View>
      <Text style={styles.smallMeta}>{meta}</Text>
    </View>
  );
}

export function AlertsScreen() {
  return (
    <>
      <Text style={styles.displayTitle}>Alerts</Text>
      <Text style={styles.sectionCopy}>3 things need your attention.</Text>

      <SectionLabel label="Today" />
      <SurfaceCard style={styles.stackGap}>
        <AlertRow
          icon="⚠️"
          title="Milk expires tomorrow"
          copy="You have 900ml left. Three recipes use it. Want to cook one tonight?"
          actions={['See recipes', 'Dismiss']}
          tone="terra"
        />
        <AlertRow
          icon="📖"
          title="Marco posted 2 new recipes"
          copy="In Mediterranean Simplicity: Penne Arrabbiata and Ribollita. You have everything for one."
          actions={['View recipes']}
          tone="sage"
        />
        <AlertRow
          icon="🛒"
          title="Shopping list updated"
          copy="Hearth added three items from your meal plan: fresh basil, feta, and cherry tomatoes."
          actions={['View list']}
          tone="gold"
          borderless
        />
      </SurfaceCard>

      <SectionLabel label="Earlier this week" />
      <SurfaceCard style={styles.stackGap}>
        <SimpleAlert
          icon="💬"
          title="Amara replied to your comment"
          copy='On Roasted Aubergine: "Try adding a little tahini…"'
          meta="Mon"
        />
        <SimpleAlert
          icon="🌿"
          title="Your pantry is well stocked"
          copy="34 items, 18 recipes available. Great week to try something new."
          meta="Sun"
          sage
          borderless
        />
      </SurfaceCard>
    </>
  );
}

const styles = StyleSheet.create({
  displayTitle: {
    ...typeScale.displayLg,
    color: colors.darkEspresso,
  },
  sectionCopy: {
    ...typeScale.bodySm,
    color: colors.warmTaupe,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  stackGap: {
    marginTop: spacing.md,
  },
  flexOne: {
    flex: 1,
  },
  rowGapSm: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  alertRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowNoBorder: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  alertIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.warmCream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertIconTerra: {
    backgroundColor: 'rgba(196,103,58,0.12)',
  },
  alertIconSage: {
    backgroundColor: colors.sageWash,
  },
  alertIconGold: {
    backgroundColor: colors.goldWash,
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
  sectionBody: {
    ...typeScale.bodySm,
    color: colors.darkEspresso,
    lineHeight: 20,
    marginTop: 2,
  },
  smallMeta: {
    ...typeScale.label,
    color: colors.warmTaupe,
  },
});
