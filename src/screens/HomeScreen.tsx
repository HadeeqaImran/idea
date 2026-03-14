import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typeScale } from '../theme';
import {
  Avatar,
  HeroChip,
  MetricCard,
  RecipeCard,
  SectionLabel,
  SurfaceCard,
} from '../components/ui';
import { quickActions, tonightRecipes } from '../constants/modules';

export function HomeScreen() {
  return (
    <>
      <View style={styles.rowBetween}>
        <View>
          <Text style={styles.kickerText}>Good morning ☀️</Text>
          <Text style={styles.displayTitle}>Sarah</Text>
        </View>
        <Avatar label="S" dot />
      </View>

      <View style={styles.heroCard}>
        <View style={styles.heroOrb} />
        <Text style={styles.heroEyebrow}>YOUR CHEF SUGGESTS</Text>
        <Text style={styles.heroTitle}>Pasta Aglio e Olio</Text>
        <Text style={styles.heroText}>
          Uses your eggs, garlic and pasta before they expire.
        </Text>
        <View style={styles.wrapRow}>
          <HeroChip label="⏱ 20 min" />
          <HeroChip label="⭐ Easy" />
          <HeroChip label="Cook now →" strong />
        </View>
      </View>

      <SectionLabel label="Home Status" />
      <View style={styles.twoColumnGrid}>
        <MetricCard icon="🫙" value="34" label="Pantry items" progress={0.68} />
        <MetricCard
          icon="⚠️"
          value="3"
          label="Expiring soon"
          accent
          caption="Tap to see →"
        />
        <MetricCard icon="📖" value="18" label="Can make now" />
        <MetricCard icon="🛒" value="7" label="Shopping items" />
      </View>

      <SectionLabel label="Quick Actions" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      >
        {quickActions.map(action => (
          <SurfaceCard key={action.label} style={styles.actionCard}>
            <Text style={styles.actionEmoji}>{action.emoji}</Text>
            <Text style={styles.actionLabel}>{action.label}</Text>
          </SurfaceCard>
        ))}
      </ScrollView>

      <SectionLabel label="Tonight's Options" />
      {tonightRecipes.map(recipe => (
        <RecipeCard key={recipe.title} recipe={recipe} />
      ))}
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
  kickerText: {
    ...typeScale.label,
    color: colors.warmTaupe,
  },
  heroCard: {
    backgroundColor: colors.terracotta,
    borderRadius: radii.lg,
    padding: spacing.xl,
    marginTop: spacing.lg,
    overflow: 'hidden',
  },
  heroOrb: {
    position: 'absolute',
    top: -28,
    right: -18,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  heroEyebrow: {
    ...typeScale.label,
    color: 'rgba(255,255,255,0.74)',
    letterSpacing: 1,
  },
  heroTitle: {
    ...typeScale.heading,
    fontStyle: 'italic',
    color: colors.white,
    marginTop: spacing.sm,
  },
  heroText: {
    ...typeScale.bodySm,
    color: 'rgba(255,255,255,0.84)',
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  wrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  twoColumnGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  horizontalList: {
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  actionCard: {
    width: 98,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionEmoji: {
    fontSize: 24,
    marginBottom: spacing.sm,
  },
  actionLabel: {
    ...typeScale.label,
    color: colors.darkEspresso,
    textAlign: 'center',
  },
});
