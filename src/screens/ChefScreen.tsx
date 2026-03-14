import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radii, shadows, spacing, typeScale } from '../theme';
import { Chip, PillButton, ReplyChip, SecondaryButton, SurfaceCard } from '../components/ui';

function ChatMessage({
  role,
  text,
  time,
  card,
}: {
  role: 'chef' | 'user';
  text: string;
  time: string;
  card?: React.ReactNode;
}) {
  const isUser = role === 'user';
  return (
    <View style={[styles.chatMessageRow, isUser && styles.chatMessageRowUser]}>
      <View style={[styles.chatAvatar, isUser && styles.chatAvatarUser]}>
        <Text>{isUser ? 'S' : '👨‍🍳'}</Text>
      </View>
      <View style={[styles.chatContent, isUser && styles.chatContentUser]}>
        <View style={[styles.chatBubble, isUser && styles.chatBubbleUser]}>
          <Text style={[styles.chatBubbleText, isUser && styles.chatBubbleTextUser]}>
            {text}
          </Text>
        </View>
        {card}
        <Text style={[styles.chatTime, isUser && styles.chatTimeUser]}>{time}</Text>
      </View>
    </View>
  );
}

export function ChefScreen() {
  return (
    <SurfaceCard style={styles.chatShell}>
      <View style={styles.chatHeader}>
        <View style={styles.chefBadge}>
          <Text style={styles.chefBadgeEmoji}>👨‍🍳</Text>
        </View>
        <View>
          <Text style={styles.chatHeaderName}>Sous</Text>
          <Text style={styles.chatHeaderMeta}>● Knows your pantry · Online</Text>
        </View>
        <Text style={styles.chatHeaderMenu}>⋯</Text>
      </View>

      <View style={styles.chatArea}>
        <ChatMessage
          role="chef"
          text="Good morning, Sarah! You've got eggs, garlic, cherry tomatoes expiring soon, and some pasta. Want me to make something out of those?"
          time="9:38 AM"
        />

        <View style={styles.replyWrap}>
          <ReplyChip label="Yes, let's cook!" active />
          <ReplyChip label="Something quick?" />
          <ReplyChip label="Meal plan week" />
        </View>

        <ChatMessage
          role="user"
          text="Something quick and easy, I have 25 minutes."
          time="9:39 AM"
        />

        <ChatMessage
          role="chef"
          text="Perfect. Pasta Aglio e Olio. Twenty minutes, everything in your kitchen, and honestly one of the best things you can make with garlic and pasta."
          time="9:39 AM"
          card={
            <View style={styles.inlineRecipeCard}>
              <View style={styles.inlineRecipeHero}>
                <Text style={styles.inlineRecipeEmoji}>🍝</Text>
              </View>
              <View style={styles.inlineRecipeBody}>
                <Text style={styles.inlineRecipeTitle}>Pasta Aglio e Olio</Text>
                <Text style={styles.inlineRecipeMeta}>
                  5 ingredients · 20 min · Easy
                </Text>
                <View style={styles.rowGapSm}>
                  <PillButton label="Start cooking" compact />
                  <SecondaryButton label="Save" compact />
                </View>
              </View>
            </View>
          }
        />

        <View style={styles.chatMessageRow}>
          <View style={styles.chatAvatar}>
            <Text>👨‍🍳</Text>
          </View>
          <View style={styles.typingBubble}>
            <View style={styles.typingDot} />
            <View style={styles.typingDot} />
            <View style={styles.typingDot} />
          </View>
        </View>
      </View>

      <View style={styles.chatInputBar}>
        <View style={styles.fakeInput}>
          <Text style={styles.fakeInputText}>Ask Sous anything…</Text>
        </View>
        <View style={styles.chatSend}>
          <Text style={styles.chatSendText}>↑</Text>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      >
        <Chip label="🍽 What's for dinner?" />
        <Chip label="📅 Plan my week" />
        <Chip label="🛒 What am I missing?" />
      </ScrollView>
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  chatShell: {
    padding: 0,
    overflow: 'hidden',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  chefBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  chefBadgeEmoji: {
    fontSize: 20,
  },
  chatHeaderName: {
    ...typeScale.heading,
    color: colors.darkEspresso,
  },
  chatHeaderMeta: {
    ...typeScale.label,
    color: colors.sage,
  },
  chatHeaderMenu: {
    marginLeft: 'auto',
    fontSize: 22,
    color: colors.warmTaupe,
  },
  chatArea: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  chatMessageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  chatMessageRowUser: {
    justifyContent: 'flex-end',
  },
  chatAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatAvatarUser: {
    backgroundColor: colors.terracotta,
  },
  chatContent: {
    maxWidth: '82%',
  },
  chatContentUser: {
    alignItems: 'flex-end',
  },
  chatBubble: {
    backgroundColor: colors.warmCream,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  chatBubbleUser: {
    backgroundColor: colors.terracotta,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 4,
  },
  chatBubbleText: {
    ...typeScale.bodySm,
    color: colors.darkEspresso,
  },
  chatBubbleTextUser: {
    color: colors.white,
  },
  chatTime: {
    ...typeScale.label,
    color: colors.warmTaupe,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
  chatTimeUser: {
    marginRight: spacing.xs,
  },
  replyWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginLeft: 36,
    marginBottom: spacing.sm,
  },
  inlineRecipeCard: {
    marginTop: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.card,
  },
  inlineRecipeHero: {
    height: 72,
    backgroundColor: colors.warmCream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inlineRecipeEmoji: {
    fontSize: 36,
  },
  inlineRecipeBody: {
    padding: spacing.md,
  },
  inlineRecipeTitle: {
    ...typeScale.heading,
    color: colors.darkEspresso,
  },
  inlineRecipeMeta: {
    ...typeScale.label,
    color: colors.warmTaupe,
    marginVertical: spacing.sm,
  },
  rowGapSm: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.warmCream,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.warmTaupe,
  },
  chatInputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  fakeInput: {
    flex: 1,
    backgroundColor: colors.warmCream,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  fakeInputText: {
    ...typeScale.bodySm,
    color: colors.warmTaupe,
  },
  chatSend: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatSendText: {
    ...typeScale.bodyLg,
    color: colors.white,
    fontWeight: '600',
  },
  horizontalList: {
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
});
