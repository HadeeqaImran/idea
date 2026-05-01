import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Ionicon from '@react-native-vector-icons/ionicons/static';
import type { IoniconsIconName } from '@react-native-vector-icons/ionicons/static';
import { colors, spacing, typeScale } from '../theme';
import {
  AppHeader,
  Avatar,
  Chip,
  FloatingButton,
  PillButton,
  RecipeCard,
  SearchPill,
  SectionLabel,
  SurfaceCard,
  WarmCard,
} from '../components/ui';

function IngredientRow({
  label,
  amount,
  owned,
  highlight,
  borderless,
}: {
  label: string;
  amount: string;
  owned?: boolean;
  highlight?: boolean;
  borderless?: boolean;
}) {
  return (
    <View style={[styles.ingredientRow, borderless && styles.rowNoBorder]}>
      <Text
        style={[
          styles.ingredientLabel,
          owned && styles.ingredientOwned,
          highlight && styles.ingredientMissing,
        ]}
      >
        {label}
      </Text>
      <Text
        style={[
          styles.rowMeta,
          highlight && styles.ingredientMissing,
          owned && styles.ingredientOwned,
        ]}
      >
        {amount}
      </Text>
    </View>
  );
}

function StepRow({
  number,
  text,
  done,
}: {
  number: string;
  text: string;
  done?: boolean;
}) {
  return (
    <View style={styles.stepRow}>
      <View style={[styles.stepBadge, done && styles.stepBadgeDone]}>
        <Text style={styles.stepBadgeText}>{number}</Text>
      </View>
      <Text style={styles.sectionBody}>{text}</Text>
    </View>
  );
}

function FactTile({
  icon,
  value,
  label,
}: {
  icon: string;
  value: string;
  label: string;
}) {
  return (
    <WarmCard style={styles.factTile}>
      <Ionicon
        name={icon as IoniconsIconName}
        size={16}
        color={colors.darkEspresso}
      />
      <Text style={styles.factValue}>{value}</Text>
      <Text style={styles.factLabel}>{label}</Text>
    </WarmCard>
  );
}

export function RecipesScreen() {
  return (
    <>
      <AppHeader title="Recipe Book" showMenuButton={false} style={styles.header} />
      <SearchPill label="Find recipes, cookbooks, family favourites…" />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      >
        <Chip label="Can cook now" tone="sage" />
        <Chip label="My cookbook" tone="terra" />
        <Chip label="Family" tone="gold" />
        <Chip label="Saved" />
      </ScrollView>

      <RecipeCard
        recipe={{
          icon: 'restaurant-outline',
          title: 'Pasta Aglio e Olio',
          subtitle: 'From your pantry · 5 of 5 ingredients',
          chips: ['20 min', 'Easy', 'Italian'],
          badge: 'Can cook now',
          tone: 'ready',
        }}
      />
      <RecipeCard
        recipe={{
          icon: 'nutrition-outline',
          title: 'Caprese Salad',
          subtitle: "From Nonna's kitchen · 10 min",
          chips: ['Add: basil', 'Quick'],
          badge: 'Need 1 item',
          tone: 'gold',
        }}
      />
      <RecipeCard
        recipe={{
          icon: 'cafe-outline',
          title: "Mum's Lentil Soup",
          subtitle: 'Private · Added by Mum · 45 min',
          chips: ['Heirloom', 'Vegetarian'],
          badge: 'Family',
          tone: 'gold',
        }}
      />

      <SurfaceCard style={styles.recipeDetailCard}>
        <View style={styles.recipeDetailHero}>
          <Ionicon name="restaurant-outline" size={68} color={colors.white} />
          <FloatingButton label="←" small style={styles.recipeHeroLeft} />
          <FloatingButton label="☆" small style={styles.recipeHeroRight} />
        </View>
        <View style={styles.recipeDetailBody}>
          <View style={styles.wrapRow}>
            <Chip label="✓ Ready to cook" tone="sage" />
            <Chip label="Italian" />
          </View>
          <Text style={styles.displayTitle}>Pasta Aglio e Olio</Text>
          <View style={styles.profileRow}>
            <Avatar label="N" tone="gold" small />
            <Text style={styles.sectionMeta}>Nonna Maria · Shared to family</Text>
          </View>
          <View style={styles.recipeFactGrid}>
            <FactTile icon="time-outline" value="20" label="mins" />
            <FactTile icon="people-outline" value="4" label="servings" />
            <FactTile icon="star-outline" value="Easy" label="level" />
            <FactTile icon="flame-outline" value="420" label="kcal" />
          </View>
          <SectionLabel label="Ingredients" />
          <SurfaceCard>
            <IngredientRow label="Spaghetti" amount="200g ✓" owned />
            <IngredientRow label="Garlic cloves" amount="6 cloves ✓" owned />
            <IngredientRow label="Extra virgin olive oil" amount="80ml ⚠" highlight />
            <IngredientRow label="Chilli flakes" amount="1 tsp ✓" owned />
            <IngredientRow label="Parmesan" amount="50g ✓" owned borderless />
          </SurfaceCard>
          <PillButton label="Start cooking" />
          <SectionLabel label="Steps" />
          <StepRow number="1" text="Bring a large pan of salted water to the boil. Cook pasta until al dente." done />
          <StepRow number="2" text="While pasta cooks, thinly slice the garlic and gently warm it in olive oil." />
          <StepRow number="3" text="Add chilli flakes and pasta water, then toss through the drained spaghetti." />
        </View>
      </SurfaceCard>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.md,
  },
  displayTitle: {
    ...typeScale.displayLg,
    color: colors.darkEspresso,
  },
  horizontalList: {
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  recipeDetailCard: {
    marginTop: spacing.lg,
    padding: 0,
    overflow: 'hidden',
  },
  recipeDetailHero: {
    height: 180,
    backgroundColor: colors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipeHeroLeft: {
    position: 'absolute',
    left: 14,
    top: 14,
  },
  recipeHeroRight: {
    position: 'absolute',
    right: 14,
    top: 14,
  },
  recipeDetailBody: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  wrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sectionMeta: {
    ...typeScale.bodySm,
    color: colors.warmTaupe,
  },
  recipeFactGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  factTile: {
    flex: 1,
    minWidth: 68,
    alignItems: 'center',
  },
  factValue: {
    ...typeScale.label,
    color: colors.darkEspresso,
    marginTop: spacing.xs,
  },
  factLabel: {
    ...typeScale.label,
    color: colors.warmTaupe,
  },
  rowNoBorder: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  rowMeta: {
    ...typeScale.label,
    color: colors.warmTaupe,
    marginTop: 2,
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  ingredientLabel: {
    ...typeScale.bodySm,
    color: colors.darkEspresso,
  },
  ingredientOwned: {
    color: colors.herb,
    fontWeight: '500',
  },
  ingredientMissing: {
    color: colors.terracotta,
  },
  stepRow: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  stepBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  stepBadgeDone: {
    backgroundColor: colors.sage,
  },
  stepBadgeText: {
    ...typeScale.label,
    color: colors.white,
    fontWeight: '700',
  },
  sectionBody: {
    ...typeScale.bodySm,
    color: colors.darkEspresso,
    lineHeight: 20,
    flex: 1,
  },
});
