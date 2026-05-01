import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Ionicon from '@react-native-vector-icons/ionicons/static';
import type { IoniconsIconName } from '@react-native-vector-icons/ionicons/static';

import { AppHeader, Avatar } from './src/components/ui';
import { DrawerProvider } from './src/context/DrawerContext';
import { colors, radii, spacing, typeScale } from './src/theme';
import { UserProvider, useUser, userInitial } from './src/context/UserContext';
import type { ModuleKey } from './src/types';
import { MODULES, TABS } from './src/constants/modules';
import {
  AlertsScreen,
  ChefScreen,
  CommunityScreen,
  HomeScreen,
  MealPlanScreen,
  OnboardingScreen,
  PantryScreen,
  ProfileScreen,
  RecipesScreen,
  ShoppingScreen,
} from './src/screens';

const DRAWER_WIDTH = 286;

function App() {
  return (
    <UserProvider>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <PantryPalApp />
    </UserProvider>
  );
}

function PantryPalApp() {
  const { user } = useUser();
  const [activeModule, setActiveModule] = useState<ModuleKey>('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const entrance = useRef(new Animated.Value(1)).current;
  const drawerProgress = useRef(new Animated.Value(0)).current;
  const drawerEmail = useMemo(() => {
    const normalized = user.name.toLowerCase().trim().replace(/\s+/g, '.');
    return `${normalized}@pantrypal.app`;
  }, [user.name]);

  const activeMeta = useMemo(
    () => MODULES.find(m => m.key === activeModule) ?? MODULES[1],
    [activeModule],
  );

  useEffect(() => {
    entrance.setValue(0);
    Animated.spring(entrance, {
      toValue: 1,
      useNativeDriver: true,
      speed: 16,
      bounciness: 5,
    }).start();
  }, [activeModule, entrance]);

  const translateY = entrance.interpolate({
    inputRange: [0, 1],
    outputRange: [14, 0],
  });

  const drawerTranslateX = drawerProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [-DRAWER_WIDTH, 0],
  });

  const drawerBackdropOpacity = drawerProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.35],
  });

  const openDrawer = () => {
    setIsDrawerOpen(true);
    Animated.timing(drawerProgress, {
      toValue: 1,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(drawerProgress, {
      toValue: 0,
      duration: 180,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setIsDrawerOpen(false);
      }
    });
  };

  const selectModuleFromDrawer = (module: ModuleKey) => {
    setActiveModule(module);
    closeDrawer();
  };

  return (
    <DrawerProvider value={{ isDrawerOpen, openDrawer, closeDrawer }}>
      <View style={styles.screen}>
      {/* <View style={[styles.topBar, { paddingTop: insets.top + spacing.md }]}>
        <Text style={styles.logo}>pantrypal</Text>
        <Text style={styles.tagline}>
          Your home. Your kitchen. Your peace of mind.
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.moduleRail}
        >
          {MODULES.map(module => {
            const selected = module.key === activeModule;
            return (
              <Pressable
                key={module.key}
                onPress={() => setActiveModule(module.key)}
                style={[styles.moduleChip, selected && styles.moduleChipActive]}
              >
                <Text
                  style={[
                    styles.moduleChipText,
                    selected && styles.moduleChipTextActive,
                  ]}
                >
                  {module.icon} {module.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View> */}

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: spacing.xl,
          paddingTop: spacing.xl,
          paddingBottom: 104 + spacing.lg,
        }}
      >
        <Animated.View style={{ opacity: entrance, transform: [{ translateY }] }}>
          <AppHeader
            title={activeMeta.title}
            subtitle={activeMeta.subtitle}
          />
          <ModuleView activeModule={activeModule} />
        </Animated.View>
      </ScrollView>

      <View
        style={[styles.bottomNav, { paddingBottom: spacing.md }]}
      >
        {TABS.map(tab => {
          const selected = activeModule === (tab.key as ModuleKey);
          return (
            <Pressable
              key={tab.key}
              onPress={() => setActiveModule(tab.key as ModuleKey)}
              style={styles.bottomTab}
            >
              <Ionicon
                name={tab.icon as IoniconsIconName}
                size={18}
                color={selected ? colors.terracotta : colors.warmTaupe}
              />
              <Text
                style={[styles.bottomTabLabel, selected && styles.bottomTabLabelActive]}
              >
                {tab.label}
              </Text>
              <View
                style={[styles.bottomTabDot, selected && styles.bottomTabDotActive]}
              />
            </Pressable>
          );
        })}
      </View>
      </KeyboardAvoidingView>
      </SafeAreaView>
      {isDrawerOpen ? (
        <View style={styles.drawerLayer} pointerEvents="box-none">
          <Pressable style={styles.drawerBackdropHitArea} onPress={closeDrawer}>
            <Animated.View style={[styles.drawerBackdrop, { opacity: drawerBackdropOpacity }]} />
          </Pressable>
          <Animated.View
            style={[styles.drawerPanel, { transform: [{ translateX: drawerTranslateX }] }]}
          >
            <SafeAreaView style={styles.drawerSafeArea}>
              <View style={styles.drawerHeader}>
                <Text style={styles.drawerBrand}>PantryPal</Text>
                <Pressable onPress={closeDrawer} style={styles.drawerCloseButton}>
                  <Ionicon name="close" size={20} color={colors.darkEspresso} />
                </Pressable>
              </View>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.drawerContent}
              >
                <View style={styles.drawerProfileCard}>
                  <View style={styles.drawerProfileOrbLarge} />
                  <View style={styles.drawerProfileOrbSmall} />
                  <View style={styles.drawerProfileRow}>
                    <Avatar label={userInitial(user)} large />
                    <View style={styles.drawerProfileTextWrap}>
                      <Text style={styles.drawerProfileName}>{user.name}</Text>
                      <Text style={styles.drawerProfileEmail}>{drawerEmail}</Text>
                    </View>
                  </View>
                  <View style={styles.drawerProfileMetaRow}>
                    <View style={styles.drawerMetaPill}>
                      <Ionicon name="location-outline" size={13} color={colors.white} />
                      <Text style={styles.drawerMetaPillText}>{user.location ?? 'Home'}</Text>
                    </View>
                    <View style={styles.drawerMetaPill}>
                      <Ionicon name="sparkles-outline" size={13} color={colors.white} />
                      <Text style={styles.drawerMetaPillText}>Premium</Text>
                    </View>
                  </View>
                </View>

                <Text style={styles.drawerSectionTitle}>Quick actions</Text>
                <View style={styles.drawerUtilityList}>
                  {[
                    {
                      icon: 'people-outline',
                      label: 'Household members',
                      meta: 'Manage access and invites',
                    },
                    {
                      icon: 'bookmark-outline',
                      label: 'Saved lists',
                      meta: 'Pinned shopping collections',
                    },
                    {
                      icon: 'card-outline',
                      label: 'Billing and plan',
                      meta: 'Payments and subscription',
                    },
                    {
                      icon: 'help-circle-outline',
                      label: 'Help center',
                      meta: 'Guides and support',
                    },
                  ].map(action => (
                    <Pressable key={action.label} style={styles.drawerUtilityItem}>
                      <View style={styles.drawerUtilityIconWrap}>
                        <Ionicon
                          name={action.icon as IoniconsIconName}
                          size={17}
                          color={colors.darkEspresso}
                        />
                      </View>
                      <View style={styles.drawerUtilityTextWrap}>
                        <Text style={styles.drawerUtilityLabel}>{action.label}</Text>
                        <Text style={styles.drawerUtilityMeta}>{action.meta}</Text>
                      </View>
                      <Ionicon
                        name="chevron-forward"
                        size={15}
                        color={colors.warmTaupe}
                      />
                    </Pressable>
                  ))}
                </View>

                <Text style={styles.drawerSectionTitle}>App modules</Text>
                <View style={styles.drawerMenuList}>
                  {MODULES.map(module => {
                    const selected = activeModule === module.key;
                    return (
                      <Pressable
                        key={module.key}
                        onPress={() => selectModuleFromDrawer(module.key)}
                        style={[styles.drawerItem, selected && styles.drawerItemActive]}
                      >
                        <Ionicon
                          name={module.icon as IoniconsIconName}
                          size={18}
                          color={selected ? colors.white : colors.darkEspresso}
                        />
                        <Text
                          style={[
                            styles.drawerItemLabel,
                            selected && styles.drawerItemLabelActive,
                          ]}
                        >
                          {module.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>

                <Pressable style={styles.drawerSignOutButton}>
                  <Ionicon name="log-out-outline" size={17} color={colors.firedClay} />
                  <Text style={styles.drawerSignOutText}>Sign out</Text>
                </Pressable>
              </ScrollView>
            </SafeAreaView>
          </Animated.View>
        </View>
      ) : null}
      </View>
    </DrawerProvider>
  );
}

function ModuleView({ activeModule }: { activeModule: ModuleKey }) {
  switch (activeModule) {
    case 'onboarding': return <OnboardingScreen />;
    case 'home':       return <HomeScreen />;
    case 'pantry':     return <PantryScreen />;
    case 'chef':       return <ChefScreen />;
    case 'recipes':    return <RecipesScreen />;
    case 'mealPlan':   return <MealPlanScreen />;
    case 'shopping':   return <ShoppingScreen />;
    case 'community':  return <CommunityScreen />;
    case 'alerts':     return <AlertsScreen />;
    case 'profile':    return <ProfileScreen />;
    default:           return null;
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.linen,
  },
  safeArea: {
    flex: 1,
  },
  topBar: {
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.linen,
  },
  logo: {
    ...typeScale.displayXl,
    color: colors.terracotta,
    textAlign: 'center',
  },
  tagline: {
    ...typeScale.bodySm,
    color: colors.warmTaupe,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  moduleRail: {
    gap: spacing.sm,
    paddingTop: spacing.xl,
    paddingBottom: spacing.sm,
  },
  moduleChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: radii.pill,
    backgroundColor: colors.linen,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  moduleChipActive: {
    backgroundColor: colors.terracotta,
    borderColor: colors.terracotta,
  },
  moduleChipText: {
    ...typeScale.label,
    color: colors.warmTaupe,
  },
  moduleChipTextActive: {
    color: colors.white,
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(253,246,238,0.96)',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  bottomTab: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    minWidth: 58,
  },
  bottomTabLabel: {
    ...typeScale.label,
    color: colors.warmTaupe,
  },
  bottomTabLabelActive: {
    color: colors.terracotta,
  },
  bottomTabDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'transparent',
  },
  bottomTabDotActive: {
    backgroundColor: colors.terracotta,
  },
  drawerLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 40,
  },
  drawerBackdropHitArea: {
    ...StyleSheet.absoluteFillObject,
  },
  drawerBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.darkEspresso,
  },
  drawerPanel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: DRAWER_WIDTH,
    backgroundColor: colors.linen,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  drawerSafeArea: {
    flex: 1,
  },
  drawerContent: {
    paddingBottom: spacing.xxxl,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  drawerBrand: {
    ...typeScale.displayLg,
    color: colors.darkEspresso,
  },
  drawerCloseButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.warmCream,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerProfileCard: {
    backgroundColor: colors.terracotta,
    borderRadius: radii.lg,
    padding: spacing.md,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  drawerProfileOrbLarge: {
    position: 'absolute',
    top: -30,
    right: -26,
    width: 118,
    height: 118,
    borderRadius: 59,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  drawerProfileOrbSmall: {
    position: 'absolute',
    bottom: -20,
    left: -14,
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  drawerProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  drawerProfileTextWrap: {
    flex: 1,
  },
  drawerProfileName: {
    ...typeScale.heading,
    color: colors.white,
  },
  drawerProfileEmail: {
    ...typeScale.label,
    color: 'rgba(255,255,255,0.82)',
    marginTop: 2,
  },
  drawerProfileMetaRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  drawerMetaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
  },
  drawerMetaPillText: {
    ...typeScale.label,
    color: colors.white,
  },
  drawerSectionTitle: {
    ...typeScale.label,
    color: colors.terracotta,
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  drawerUtilityList: {
    backgroundColor: colors.warmCream,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  drawerUtilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  drawerUtilityIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(196,103,58,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerUtilityTextWrap: {
    flex: 1,
  },
  drawerUtilityLabel: {
    ...typeScale.bodySm,
    color: colors.darkEspresso,
    fontWeight: '600',
  },
  drawerUtilityMeta: {
    ...typeScale.label,
    color: colors.warmTaupe,
    marginTop: 2,
  },
  drawerMenuList: {
    gap: spacing.sm,
    paddingBottom: spacing.md,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  drawerItemActive: {
    backgroundColor: colors.terracotta,
    borderColor: colors.terracotta,
  },
  drawerItemLabel: {
    ...typeScale.bodySm,
    color: colors.darkEspresso,
    fontWeight: '600',
  },
  drawerItemLabelActive: {
    color: colors.white,
  },
  drawerSignOutButton: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: 'rgba(139,62,30,0.2)',
    backgroundColor: 'rgba(245,230,208,0.6)',
    paddingVertical: spacing.sm,
  },
  drawerSignOutText: {
    ...typeScale.bodySm,
    color: colors.firedClay,
    fontWeight: '600',
  },
});

export default App;
