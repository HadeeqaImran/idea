import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Ionicon from '@react-native-vector-icons/ionicons/static';
import type { IoniconsIconName } from '@react-native-vector-icons/ionicons/static';
import { useUser, firstName, userInitial } from '../context/UserContext';
import { colors, radii, spacing, typeScale } from '../theme';
import {
  AppHeader,
  Avatar,
  HeroChip,
  MetricCard,
  RecipeCard,
  SectionLabel,
  SurfaceCard,
} from '../components/ui';
import { quickActions, tonightRecipes } from '../constants/modules';
import { getGreetingWithIconByTimeOfDay } from '../utils/timeOfDayCalculator';

export function HomeScreen() {
  const { user } = useUser();

  const {greeting, icon } = useMemo(() => getGreetingWithIconByTimeOfDay(), []);

  return (
    <>
      <AppHeader
        title={firstName(user)}
        subtitle={greeting}
        subtitleAccessory={<Ionicon name={icon} size={14} color={colors.warmTaupe} />}
        rightAccessory={<Avatar label={userInitial(user)} dot />}
        showMenuButton={false}
        style={styles.header}
      />

      <View style={styles.heroCard}>
        <View style={styles.heroOrb} />
        <Text style={styles.heroEyebrow}>YOUR CHEF SUGGESTS</Text>
        <Text style={styles.heroTitle}>Pasta Aglio e Olio</Text>
        <Text style={styles.heroText}>
          Uses your eggs, garlic and pasta before they expire.
        </Text>
        <View style={styles.wrapRow}>
          <HeroChip label="20 min" />
          <HeroChip label="Easy" />
          <HeroChip label="Cook now →" strong />
        </View>
      </View>

      <SectionLabel label="Home Status" />
      <View style={styles.twoColumnGrid}>
        <MetricCard icon="file-tray-full-outline" value="34" label="Pantry items" progress={0.68} />
        <MetricCard
          icon="alert-outline"
          value="3"
          label="Expiring soon"
          accent
          caption="Tap to see →"
        />
        <MetricCard icon="book-outline" value="18" label="Can make now" />
        <MetricCard icon="cart-outline" value="7" label="Shopping items" />
      </View>

      <SectionLabel label="Quick Actions" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      >
        {quickActions.map(action => (
          <SurfaceCard key={action.label} style={styles.actionCard}>
            <Ionicon
              name={action.icon as IoniconsIconName}
              size={24}
              color={colors.darkEspresso}
            />
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
  header: {
    marginBottom: spacing.md,
  },
  heroCard: {
    backgroundColor: colors.terracotta,
    borderRadius: radii.lg,
    padding: spacing.xl,
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
  actionLabel: {
    ...typeScale.label,
    color: colors.darkEspresso,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
