import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicon from '@react-native-vector-icons/ionicons/static';
import { colors, radii, spacing, typeScale } from '../theme';
import {
  Chip,
  MiniMetric,
  PillButton,
  ProgressDots,
  SectionLabel,
  SelectionTile,
  SurfaceCard,
  WarmCard,
} from '../components/ui';

export function OnboardingScreen() {
  return (
    <>
      <View style={styles.splashCard}>
        <View style={styles.splashOrbLarge} />
        <View style={styles.splashOrbSmall} />
        <Ionicon name="home-outline" size={56} color={colors.white} />
        <Text style={styles.splashLogo}>pantrypal</Text>
        <Text style={styles.splashCopy}>
          Your warm home assistant for a calmer, better-run home.
        </Text>
        <PillButton label="Get started" inverted />
        <Text style={styles.splashLink}>Already have an account? Sign in</Text>
      </View>

      <SurfaceCard style={styles.stackGap}>
        <ProgressDots activeIndex={0} />
        <Text style={styles.displayTitle}>Tell us about{'\n'}your home</Text>
        <Text style={styles.sectionCopy}>
          So PantryPal can personalise your experience.
        </Text>
        <SectionLabel label="Household size" />
        <View style={styles.twoColumnGrid}>
          {['Just me', 'Couple', 'Small family', 'Large family'].map(option => (
            <SelectionTile key={option} label={option} active={option === 'Just me'} />
          ))}
        </View>
        <SectionLabel label="Dietary preferences" />
        <View style={styles.wrapRow}>
          <Chip label="Vegetarian" tone="terra" />
          <Chip label="Vegan" />
          <Chip label="Gluten-free" tone="sage" />
          <Chip label="Halal" />
          <Chip label="Dairy-free" />
          <Chip label="Keto" />
        </View>
        <SectionLabel label="Cooking confidence" />
        <View style={styles.threeColumnGrid}>
          <SelectionTile compact label="Beginner" />
          <SelectionTile compact label="Home cook" active />
          <SelectionTile compact label="Experienced" />
        </View>
        <PillButton label="Continue" style={styles.topMarginMd} />
      </SurfaceCard>

      <SurfaceCard style={styles.stackGap}>
        <ProgressDots activeIndex={1} />
        <Text style={styles.displayTitle}>What's usually{'\n'}in your kitchen?</Text>
        <Text style={styles.sectionCopy}>
          Tap everything you usually keep stocked.
        </Text>
        <View style={styles.iconGrid}>
          {([
            ['egg-outline', 'Eggs', true],
            ['nutrition-outline', 'Garlic', true],
            ['leaf-outline', 'Olive oil', false],
            ['restaurant-outline', 'Pasta', true],
            ['nutrition-outline', 'Rice', false],
            ['nutrition-outline', 'Onions', true],
            ['nutrition-outline', 'Tomatoes', false],
            ['nutrition-outline', 'Lemon', false],
            ['nutrition-outline', 'Butter', true],
          ] as const).map(([icon, label, selected]) => (
            <View
              key={label}
              style={[
                styles.iconTile,
                selected ? styles.iconTileActive : styles.iconTileInactive,
              ]}
            >
              <Ionicon
                name={icon}
                size={22}
                color={selected ? colors.white : colors.darkEspresso}
              />
              <Text
                style={[
                  styles.iconTileLabel,
                  selected ? styles.iconTileLabelActive : styles.iconTileLabelInactive,
                ]}
              >
                {label}
              </Text>
            </View>
          ))}
        </View>
        <PillButton label="Continue" />
      </SurfaceCard>

      <WarmCard style={styles.stackGap}>
        <ProgressDots activeIndex={3} />
        <Text style={styles.displayTitle}>You're home</Text>
        <Text style={styles.sectionCopy}>
          PantryPal is ready with pantry tracking, calm reminders, and a personal
          AI chef grounded in what you actually have.
        </Text>
        <View style={styles.statStrip}>
          <MiniMetric label="Pantry items" value="34" />
          <MiniMetric label="Recipes now" value="18" />
          <MiniMetric label="Alerts this week" value="3" />
        </View>
        <PillButton label="Enter PantryPal" />
      </WarmCard>
    </>
  );
}

const styles = StyleSheet.create({
  splashCard: {
    backgroundColor: colors.terracotta,
    borderRadius: radii.lg,
    padding: spacing.xxxl,
    overflow: 'hidden',
    alignItems: 'center',
  },
  splashOrbLarge: {
    position: 'absolute',
    top: -34,
    right: -34,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  splashOrbSmall: {
    position: 'absolute',
    bottom: -44,
    left: -20,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  splashLogo: {
    ...typeScale.displayXl,
    color: colors.white,
    fontSize: 44,
    lineHeight: 52,
  },
  splashCopy: {
    ...typeScale.bodyLg,
    color: 'rgba(255,255,255,0.78)',
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  splashLink: {
    ...typeScale.bodySm,
    color: 'rgba(255,255,255,0.62)',
    marginTop: spacing.md,
  },
  stackGap: {
    marginTop: spacing.md,
  },
  topMarginMd: {
    marginTop: spacing.md,
  },
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
  twoColumnGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  threeColumnGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  wrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  iconTile: {
    width: '30.5%',
    borderRadius: radii.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
  },
  iconTileActive: {
    backgroundColor: colors.terracotta,
  },
  iconTileInactive: {
    backgroundColor: colors.warmCream,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconTileLabel: {
    ...typeScale.label,
    marginTop: spacing.xs,
  },
  iconTileLabelActive: {
    color: colors.white,
  },
  iconTileLabelInactive: {
    color: colors.warmTaupe,
  },
  statStrip: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
});
