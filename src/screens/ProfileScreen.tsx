import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicon from '@react-native-vector-icons/ionicons/static';
import type { IoniconsIconName } from '@react-native-vector-icons/ionicons/static';
import { colors, spacing, typeScale } from '../theme';
import { useUser, userInitial } from '../context/UserContext';
import {
  Avatar,
  Chip,
  MiniMetric,
  SectionLabel,
  SurfaceCard,
} from '../components/ui';

function MemberRow({
  name,
  detail,
  label,
  sage,
}: {
  name: string;
  detail: string;
  label: string;
  sage?: boolean;
}) {
  return (
    <View style={styles.memberRow}>
      <View style={styles.profileRow}>
        <Avatar label={label} tone={sage ? 'gold' : undefined} />
        <View>
          <Text style={styles.rowTitle}>{name}</Text>
          <Text style={styles.rowMeta}>{detail}</Text>
        </View>
      </View>
    </View>
  );
}

function SettingRow({
  icon,
  title,
  detail,
  enabled,
  borderless,
}: {
  icon: string;
  title: string;
  detail: string;
  enabled?: boolean;
  borderless?: boolean;
}) {
  return (
    <View style={[styles.settingRow, borderless && styles.rowNoBorder]}>
      <View style={styles.profileRow}>
        <Ionicon
          name={icon as IoniconsIconName}
          size={18}
          color={colors.darkEspresso}
        />
        <View>
          <Text style={styles.rowTitle}>{title}</Text>
          <Text style={styles.rowMeta}>{detail}</Text>
        </View>
      </View>
      <View style={[styles.toggle, !enabled && styles.toggleOff]}>
        <View style={[styles.toggleKnob, !enabled && styles.toggleKnobOff]} />
      </View>
    </View>
  );
}

export function ProfileScreen() {
  const { user } = useUser();
  return (
    <>
      <View style={styles.profileHeader}>
        <Avatar label={userInitial(user)} large />
        <Text style={styles.headingTitle}>{user.name}</Text>
        <Text style={styles.sectionMeta}>
          Home cook{user.location ? ` · ${user.location}` : ''}
          {user.memberSince ? ` · Member since ${user.memberSince}` : ''}
        </Text>
        {user.isPremium && <Chip label="PantryPal Premium" tone="gold" />}
      </View>

      <View style={styles.statStrip}>
        <MiniMetric label="Pantry items" value="34" />
        <MiniMetric label="Recipes saved" value="47" />
        <MiniMetric label="Cookbooks" value="5" />
      </View>

      <SectionLabel label="Household" />
      <SurfaceCard style={styles.stackGap}>
        <MemberRow name={`${user.name.split(' ')[0]} (you)`} detail="Admin" label={userInitial(user)} />
        <MemberRow name="Jamie" detail="Can add to pantry & shopping" label="J" sage />
        <Text style={styles.inviteText}>+ Invite household member</Text>
      </SurfaceCard>

      <SectionLabel label="Preferences" />
      <SurfaceCard style={styles.stackGap}>
        <SettingRow
          icon="notifications-outline"
          title="Expiry reminders"
          detail="3 days before"
          enabled
        />
        <SettingRow
          icon="moon-outline"
          title="Dark mode"
          detail="Follows system"
          borderless
        />
      </SurfaceCard>
    </>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    alignItems: 'center',
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
  statStrip: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  stackGap: {
    marginTop: spacing.md,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  memberRow: {
    paddingVertical: spacing.sm,
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
  inviteText: {
    ...typeScale.bodySm,
    color: colors.terracotta,
    fontWeight: '600',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowNoBorder: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  toggle: {
    width: 36,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.terracotta,
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  toggleOff: {
    backgroundColor: colors.wheat,
  },
  toggleKnob: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.white,
    alignSelf: 'flex-end',
  },
  toggleKnobOff: {
    alignSelf: 'flex-start',
  },
});
