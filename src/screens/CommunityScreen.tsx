import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typeScale } from '../theme';
import {
  Avatar,
  Chip,
  MiniMetric,
  PillButton,
  SearchPill,
  SecondaryButton,
  SectionLabel,
  SurfaceCard,
} from '../components/ui';

function CookbookCard({
  emoji,
  title,
  author,
  copy,
  meta,
  rating,
  cta,
  premium,
  sage,
}: {
  emoji: string;
  title: string;
  author: string;
  copy: string;
  meta: string[];
  rating: string;
  cta: string;
  premium?: boolean;
  sage?: boolean;
}) {
  return (
    <SurfaceCard style={styles.cookbookCard}>
      <View style={[styles.cookbookHero, sage && styles.cookbookHeroSage]}>
        <Text style={styles.cookbookEmoji}>{emoji}</Text>
        {premium ? (
          <View style={styles.cookbookProBadge}>
            <Text style={styles.cookbookProBadgeText}>👨‍🍳 Professional chef</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.recipeBody}>
        <Text style={styles.headingTitle}>{title}</Text>
        <View style={styles.rowBetween}>
          <View style={styles.profileRow}>
            <Avatar label={author[0]} small />
            <Text style={styles.sectionMeta}>{author}</Text>
          </View>
          <Chip label={rating} tone={sage ? 'sage' : 'gold'} />
        </View>
        <Text style={styles.sectionBody}>{copy}</Text>
        <View style={styles.rowBetween}>
          <View style={styles.wrapRow}>
            {meta.map(item => (
              <Chip
                key={item}
                label={item}
                tone={
                  item.includes('Subscribed') ? 'sage'
                  : item.includes('recipes') ? 'terra'
                  : undefined
                }
              />
            ))}
          </View>
          {cta === 'Subscribe' ? (
            <PillButton label={cta} compact />
          ) : (
            <SecondaryButton label={cta} compact />
          )}
        </View>
      </View>
    </SurfaceCard>
  );
}

export function CommunityScreen() {
  return (
    <>
      <Text style={styles.displayTitle}>Community</Text>
      <SearchPill label="Find chefs, cookbooks…" />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      >
        <Chip label="Trending" tone="terra" />
        <Chip label="Subscribed" />
        <Chip label="Chef picks" />
        <Chip label="Near me" />
      </ScrollView>

      <SectionLabel label="Featured cookbooks" />
      <CookbookCard
        emoji="🫒"
        title="Mediterranean Simplicity"
        author="Marco Rossi · Milan, Italy"
        copy="Simple, honest Italian cooking. 48 recipes, all under 30 minutes. Used by 2,400 home cooks."
        meta={['48 recipes', '2.4k subscribers']}
        rating="★ 4.9"
        cta="Subscribe"
        premium
      />
      <CookbookCard
        emoji="🌱"
        title="Sunday Slow Cook"
        author="Amara Osei · London, UK"
        copy="Plant-based weekend cooking for the whole family. Warm, comforting, and deeply satisfying."
        meta={['32 recipes', 'Subscribed ✓']}
        rating="★ 4.7"
        cta="Message"
        sage
      />

      <SurfaceCard style={styles.creatorCard}>
        <View style={styles.creatorHero} />
        <View style={styles.creatorProfileRow}>
          <Avatar label="M" large />
          <View style={styles.rowGapSm}>
            <SecondaryButton label="💬 Message" compact />
            <PillButton label="Follow" compact />
          </View>
        </View>
        <Text style={styles.headingTitle}>Marco Rossi</Text>
        <Text style={styles.sectionMeta}>
          Professional chef · Milan, Italy · Michelin trained
        </Text>
        <Text style={styles.sectionBody}>
          &quot;I cook for my family every Sunday. These are the recipes I&apos;ve
          passed down. Simple, honest, Italian.&quot;
        </Text>
        <View style={styles.statStrip}>
          <MiniMetric label="recipes" value="48" />
          <MiniMetric label="followers" value="2.4k" />
          <MiniMetric label="rating" value="★4.9" />
        </View>
      </SurfaceCard>
    </>
  );
}

const styles = StyleSheet.create({
  displayTitle: {
    ...typeScale.displayLg,
    color: colors.darkEspresso,
  },
  horizontalList: {
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowGapSm: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  wrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  cookbookCard: {
    marginTop: spacing.md,
    padding: 0,
    overflow: 'hidden',
  },
  cookbookHero: {
    height: 100,
    backgroundColor: colors.firedClay,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cookbookHeroSage: {
    backgroundColor: colors.sage,
  },
  cookbookEmoji: {
    fontSize: 44,
  },
  cookbookProBadge: {
    position: 'absolute',
    bottom: spacing.sm,
    left: spacing.md,
    backgroundColor: 'rgba(253,246,238,0.92)',
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
  },
  cookbookProBadgeText: {
    ...typeScale.label,
    color: colors.terracotta,
    fontWeight: '700',
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
  sectionBody: {
    ...typeScale.bodySm,
    color: colors.darkEspresso,
    lineHeight: 20,
  },
  creatorCard: {
    marginTop: spacing.lg,
    overflow: 'hidden',
  },
  creatorHero: {
    height: 110,
    marginHorizontal: -spacing.lg,
    marginTop: -spacing.lg,
    backgroundColor: colors.firedClay,
  },
  creatorProfileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: -28,
    marginBottom: spacing.md,
  },
  statStrip: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
});
