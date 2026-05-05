import React, { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
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
import {
  NavigationContainer,
  type NavigatorScreenParams,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {
  createBottomTabNavigator,
  type BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Avatar } from './src/components/ui';
import { MODULES, TABS } from './src/constants/modules';
import { DrawerProvider } from './src/context/DrawerContext';
import { UserProvider, useUser, userInitial } from './src/context/UserContext';
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
import { colors, radii, spacing, typeScale } from './src/theme';
import type { ModuleKey, TabKey } from './src/types';

type MainTabParamList = {
  home: undefined;
  pantry: undefined;
  chef: undefined;
  recipes: undefined;
  community: undefined;
};

type DrawerOnlyRoute = Exclude<ModuleKey, TabKey>;

type RootStackParamList = {
  tabs: NavigatorScreenParams<MainTabParamList>;
} & {
  [K in DrawerOnlyRoute]: undefined;
};

const DRAWER_WIDTH = 286;
const ALL_MODULE_KEYS: ModuleKey[] = MODULES.map(module => module.key);
const TAB_KEYS: Array<keyof MainTabParamList> = [
  'home',
  'pantry',
  'chef',
  'recipes',
  'community',
];

const QUICK_ACTIONS: Array<{
  icon: IoniconsIconName;
  label: string;
  meta: string;
}> = [
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
];

const navigationRef = createNavigationContainerRef<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function ScreenScaffold({ children }: { children: ReactNode }) {
  const entrance = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(entrance, {
      toValue: 1,
      useNativeDriver: true,
      speed: 16,
      bounciness: 5,
    }).start();
  }, [entrance]);

  const translateY = entrance.interpolate({
    inputRange: [0, 1],
    outputRange: [14, 0],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.screenContent}
        >
          <Animated.View style={{ opacity: entrance, transform: [{ translateY }] }}>
            {children}
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function HomeRoute() {
  return (
    <ScreenScaffold>
      <HomeScreen />
    </ScreenScaffold>
  );
}

function PantryRoute() {
  return (
    <ScreenScaffold>
      <PantryScreen />
    </ScreenScaffold>
  );
}

function ChefRoute() {
  return (
    <ScreenScaffold>
      <ChefScreen />
    </ScreenScaffold>
  );
}

function RecipesRoute() {
  return (
    <ScreenScaffold>
      <RecipesScreen />
    </ScreenScaffold>
  );
}

function CommunityRoute() {
  return (
    <ScreenScaffold>
      <CommunityScreen />
    </ScreenScaffold>
  );
}

function OnboardingRoute() {
  return (
    <ScreenScaffold>
      <OnboardingScreen />
    </ScreenScaffold>
  );
}

function MealPlanRoute() {
  return (
    <ScreenScaffold>
      <MealPlanScreen />
    </ScreenScaffold>
  );
}

function ShoppingRoute() {
  return (
    <ScreenScaffold>
      <ShoppingScreen />
    </ScreenScaffold>
  );
}

function AlertsRoute() {
  return (
    <ScreenScaffold>
      <AlertsScreen />
    </ScreenScaffold>
  );
}

function ProfileRoute() {
  return (
    <ScreenScaffold>
      <ProfileScreen />
    </ScreenScaffold>
  );
}

function getTabScreenOptions({
  route,
}: {
  route: { name: keyof MainTabParamList };
}): BottomTabNavigationOptions {
  const tabMeta = TABS.find(tab => tab.key === route.name);
  const iconName = (tabMeta?.icon as IoniconsIconName) ?? 'ellipse-outline';

  return {
    headerShown: false,
    tabBarLabel: tabMeta?.label ?? route.name,
    tabBarIcon: ({ focused }) => (
      <Ionicon
        name={iconName}
        size={18}
        color={focused ? colors.terracotta : colors.warmTaupe}
      />
    ),
    tabBarActiveTintColor: colors.terracotta,
    tabBarInactiveTintColor: colors.warmTaupe,
    tabBarLabelStyle: {
      ...typeScale.label,
      marginBottom: 2,
    },
    tabBarItemStyle: styles.bottomTab,
    tabBarStyle: styles.bottomNav,
    tabBarHideOnKeyboard: true,
    sceneStyle: styles.scene,
  };
}

function MainTabsNavigator() {
  return (
    <Tab.Navigator initialRouteName="home" screenOptions={getTabScreenOptions}>
      <Tab.Screen name="home" component={HomeRoute} />
      <Tab.Screen name="pantry" component={PantryRoute} />
      <Tab.Screen name="chef" component={ChefRoute} />
      <Tab.Screen name="recipes" component={RecipesRoute} />
      <Tab.Screen name="community" component={CommunityRoute} />
    </Tab.Navigator>
  );
}

function RootStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="tabs" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="tabs" component={MainTabsNavigator} />
      <Stack.Screen name="onboarding" component={OnboardingRoute} />
      <Stack.Screen name="mealPlan" component={MealPlanRoute} />
      <Stack.Screen name="shopping" component={ShoppingRoute} />
      <Stack.Screen name="alerts" component={AlertsRoute} />
      <Stack.Screen name="profile" component={ProfileRoute} />
    </Stack.Navigator>
  );
}

function PantryPalApp() {
  const { user } = useUser();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeModule, setActiveModule] = useState<ModuleKey>('home');

  const drawerEmail = useMemo(() => {
    const normalized = user.name.toLowerCase().trim().replace(/\s+/g, '.');
    return `${normalized}@pantrypal.app`;
  }, [user.name]);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const updateActiveModuleFromNavigation = () => {
    if (!navigationRef.isReady()) {
      return;
    }

    const currentRoute = navigationRef.getCurrentRoute();
    const routeName = currentRoute?.name;

    if (!routeName) {
      return;
    }

    if (ALL_MODULE_KEYS.includes(routeName as ModuleKey)) {
      setActiveModule(routeName as ModuleKey);
      return;
    }

  };

  const selectModule = (module: ModuleKey) => {
    if (!navigationRef.isReady()) {
      return;
    }

    if (TAB_KEYS.includes(module as keyof MainTabParamList)) {
      navigationRef.navigate('tabs', {
        screen: module as keyof MainTabParamList,
      });
    } else {
      navigationRef.navigate(module as DrawerOnlyRoute);
    }

    closeDrawer();
  };

  return (
    <DrawerProvider value={{ isDrawerOpen, openDrawer, closeDrawer }}>
      <View style={styles.screen}>
        <NavigationContainer
          ref={navigationRef}
          onReady={updateActiveModuleFromNavigation}
          onStateChange={updateActiveModuleFromNavigation}
        >
          <RootStackNavigator />
        </NavigationContainer>

        {isDrawerOpen ? (
          <View style={styles.drawerLayer} pointerEvents="box-none">
            <Pressable style={styles.drawerBackdropHitArea} onPress={closeDrawer}>
              <View style={styles.drawerBackdrop} />
            </Pressable>
            <View style={styles.drawerPanel}>
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
                    {QUICK_ACTIONS.map(action => (
                      <Pressable key={action.label} style={styles.drawerUtilityItem}>
                        <View style={styles.drawerUtilityIconWrap}>
                          <Ionicon name={action.icon} size={17} color={colors.darkEspresso} />
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
                          onPress={() => selectModule(module.key)}
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
            </View>
          </View>
        ) : null}
      </View>
    </DrawerProvider>
  );
}

function App() {
  return (
    <UserProvider>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <PantryPalApp />
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.linen,
  },
  safeArea: {
    flex: 1,
  },
  scene: {
    backgroundColor: colors.linen,
  },
  screenContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: 104 + spacing.lg,
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 76,
    backgroundColor: 'rgba(253,246,238,0.96)',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  bottomTab: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 58,
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
    backgroundColor: 'rgba(44,31,20,0.35)',
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
