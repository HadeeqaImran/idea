import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicon from '@react-native-vector-icons/ionicons/static';
import type { IoniconsIconName } from '@react-native-vector-icons/ionicons/static';
import { colors, radii, spacing, typeScale } from '../../theme';
import type { Recipe } from '../../types';
import { Chip } from './Chip';
import { SurfaceCard } from './Cards';

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <SurfaceCard style={styles.recipeCard}>
      <View
        style={[
          styles.recipeHero,
          recipe.tone === 'sage' && styles.recipeHeroSage,
          recipe.tone === 'gold' && styles.recipeHeroGold,
        ]}
      >
        <Ionicon
          name={recipe.icon as IoniconsIconName}
          size={44}
          color={colors.darkEspresso}
        />
        <View
          style={[
            styles.recipeBadge,
            recipe.tone === 'sage' && styles.recipeBadgeSage,
            recipe.tone === 'gold' && styles.recipeBadgeGold,
          ]}
        >
          <Text
            style={[
              styles.recipeBadgeText,
              recipe.tone === 'gold' && styles.recipeBadgeTextGold,
            ]}
          >
            {recipe.badge}
          </Text>
        </View>
      </View>
      <View style={styles.recipeBody}>
        <Text style={styles.headingTitle}>{recipe.title}</Text>
        <Text style={styles.sectionMeta}>{recipe.subtitle}</Text>
        <View style={styles.wrapRow}>
          {recipe.chips.map(chip => (
            <Chip
              key={chip}
              label={chip}
              tone={
                chip.includes('Ready') ? 'sage'
                : chip.includes('Heirloom') ? 'gold'
                : chip.includes('+') ? 'terra'
                : undefined
              }
            />
          ))}
        </View>
      </View>
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  recipeCard: {
    marginTop: spacing.md,
    overflow: 'hidden',
    padding: 0,
  },
  recipeHero: {
    height: 116,
    backgroundColor: colors.warmCream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipeHeroSage: {
    backgroundColor: '#EAF2E9',
  },
  recipeHeroGold: {
    backgroundColor: colors.linen,
  },
  recipeBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.terracotta,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  recipeBadgeSage: {
    backgroundColor: colors.sage,
  },
  recipeBadgeGold: {
    backgroundColor: colors.warmGold,
  },
  recipeBadgeText: {
    ...typeScale.label,
    color: colors.white,
  },
  recipeBadgeTextGold: {
    color: colors.white,
  },
  recipeBody: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  headingTitle: {
    ...typeScale.heading,
    color: colors.darkEspresso,
  },
  sectionMeta: {
    ...typeScale.bodySm,
    color: colors.warmTaupe,
  },
  wrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});
