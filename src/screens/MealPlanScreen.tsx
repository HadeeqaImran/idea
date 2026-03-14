import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typeScale } from '../theme';
import { PillButton, SectionLabel, WarmCard } from '../components/ui';

function MealSlot({
  slot,
  title,
  type,
  emoji,
  active,
}: {
  slot: string;
  title: string;
  type: string;
  emoji: string;
  active?: boolean;
}) {
  return (
    <View style={styles.mealRow}>
      <Text style={styles.mealSlotLabel}>{slot}</Text>
      <View style={[styles.mealCard, active && styles.mealCardActive]}>
        <Text style={styles.mealEmoji}>{emoji}</Text>
        <View>
          <Text style={[styles.mealType, active && styles.mealTypeActive]}>{type}</Text>
          <Text style={styles.mealTitle}>{title}</Text>
        </View>
      </View>
    </View>
  );
}

function EmptyMealSlot({ slot, label }: { slot: string; label: string }) {
  return (
    <View style={styles.mealRow}>
      <Text style={styles.mealSlotLabel}>{slot}</Text>
      <View style={styles.mealEmpty}>
        <Text style={styles.mealEmptyText}>☀️ {label}</Text>
      </View>
    </View>
  );
}

function BalanceTile({
  label,
  value,
  positive,
}: {
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <View style={styles.balanceTile}>
      <Text style={[styles.balanceValue, positive && styles.balanceValuePositive]}>
        {value}
      </Text>
      <Text style={styles.balanceLabel}>{label}</Text>
    </View>
  );
}

export function MealPlanScreen() {
  return (
    <>
      <View style={styles.rowBetween}>
        <View>
          <Text style={styles.displayTitle}>This Week</Text>
          <Text style={styles.sectionMeta}>10–16 March</Text>
        </View>
        <PillButton label="✨ AI plan" compact />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      >
        {([
          ['MON', '10', true],
          ['TUE', '11', false],
          ['WED', '12', false],
          ['THU', '13', false],
          ['FRI', '14', false],
          ['SAT', '15', false],
          ['SUN', '16', false],
        ] as const).map(([day, date, active]) => (
          <View
            key={day}
            style={[styles.dayPill, active ? styles.dayPillActive : styles.dayPillInactive]}
          >
            <Text style={[styles.dayPillLabel, active ? styles.dayPillLabelActive : null]}>
              {day}
            </Text>
            <Text style={[styles.dayPillValue, active ? styles.dayPillValueActive : null]}>
              {date}
            </Text>
          </View>
        ))}
      </ScrollView>

      <SectionLabel label="Monday, 10 March" />
      <MealSlot slot="B" title="Overnight oats with berries" type="Breakfast" emoji="🥣" />
      <MealSlot slot="L" title="Caprese salad + sourdough" type="Lunch" emoji="🥗" />
      <MealSlot slot="D" title="Pasta Aglio e Olio" type="Dinner · Tonight" emoji="🍝" active />

      <SectionLabel label="Tuesday, 11 March" />
      <EmptyMealSlot slot="B" label="Tap to add breakfast" />
      <MealSlot slot="D" title="Shakshuka" type="Dinner" emoji="🍲" />

      <WarmCard style={styles.stackGap}>
        <SectionLabel label="This week's nutrition balance" noMargin />
        <View style={styles.threeColumnGrid}>
          <BalanceTile label="Veg coverage" value="Good" positive />
          <BalanceTile label="Protein variety" value="Low" />
          <BalanceTile label="Calories" value="Balanced" positive />
        </View>
      </WarmCard>
    </>
  );
}

const styles = StyleSheet.create({
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  displayTitle: {
    ...typeScale.displayLg,
    color: colors.darkEspresso,
  },
  sectionMeta: {
    ...typeScale.bodySm,
    color: colors.warmTaupe,
  },
  horizontalList: {
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  stackGap: {
    marginTop: spacing.md,
  },
  threeColumnGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  dayPill: {
    width: 52,
    borderRadius: radii.sm,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayPillActive: {
    backgroundColor: colors.terracotta,
  },
  dayPillInactive: {
    backgroundColor: colors.warmCream,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dayPillLabel: {
    ...typeScale.label,
    color: colors.warmTaupe,
  },
  dayPillLabelActive: {
    color: 'rgba(255,255,255,0.7)',
  },
  dayPillValue: {
    ...typeScale.heading,
    color: colors.darkEspresso,
  },
  dayPillValueActive: {
    color: colors.white,
  },
  mealRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
    alignItems: 'flex-start',
  },
  mealSlotLabel: {
    ...typeScale.label,
    width: 22,
    color: colors.warmTaupe,
    paddingTop: spacing.md,
  },
  mealCard: {
    flex: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  mealCardActive: {
    backgroundColor: colors.terracottaWash,
    borderColor: colors.terracotta,
  },
  mealEmoji: {
    fontSize: 16,
  },
  mealType: {
    ...typeScale.label,
    color: colors.warmTaupe,
  },
  mealTypeActive: {
    color: colors.terracotta,
  },
  mealTitle: {
    ...typeScale.bodySm,
    color: colors.darkEspresso,
    fontWeight: '500',
  },
  mealEmpty: {
    flex: 1,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.wheat,
    backgroundColor: 'rgba(232,201,164,0.3)',
    padding: spacing.md,
  },
  mealEmptyText: {
    ...typeScale.bodySm,
    color: colors.warmTaupe,
  },
  balanceTile: {
    flex: 1,
    alignItems: 'center',
  },
  balanceValue: {
    ...typeScale.heading,
    color: colors.terracotta,
  },
  balanceValuePositive: {
    color: colors.sage,
  },
  balanceLabel: {
    ...typeScale.label,
    color: colors.warmTaupe,
    textAlign: 'center',
  },
});
