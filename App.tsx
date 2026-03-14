import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radii, spacing, typeScale } from './src/theme';
import type { ModuleKey, TabKey } from './src/types';
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

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <HearthApp />
    </SafeAreaProvider>
  );
}

function HearthApp() {
  const insets = useSafeAreaInsets();
  const [activeModule, setActiveModule] = useState<ModuleKey>('home');
  const entrance = useRef(new Animated.Value(1)).current;

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

  return (
    <View style={styles.screen}>
      {/* <View style={[styles.topBar, { paddingTop: insets.top + spacing.md }]}>
        <Text style={styles.logo}>hearth</Text>
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

      <SafeAreaView
        edges={['top', 'left', 'right']}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: spacing.xl,
          paddingTop: spacing.xl,
          paddingBottom: 104 + Math.max(insets.bottom, spacing.lg),
        }}
      >
        <Animated.View style={{ opacity: entrance, transform: [{ translateY }] }}>
          <Text style={styles.moduleTitle}>{activeMeta.title}</Text>
          <Text style={styles.moduleSubtitle}>{activeMeta.subtitle}</Text>
          <ModuleView activeModule={activeModule} />
        </Animated.View>
      </ScrollView>

      <View
        style={[styles.bottomNav, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}
      >
        {TABS.map(tab => {
          const selected = activeModule === (tab.key as ModuleKey);
          return (
            <Pressable
              key={tab.key}
              onPress={() => setActiveModule(tab.key as ModuleKey)}
              style={styles.bottomTab}
            >
              <Text style={styles.bottomTabIcon}>{tab.icon}</Text>
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
    </View>
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
  moduleTitle: {
    ...typeScale.displayLg,
    color: colors.darkEspresso,
  },
  moduleSubtitle: {
    ...typeScale.bodySm,
    color: colors.warmTaupe,
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
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
  bottomTabIcon: {
    fontSize: 18,
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
});

export default App;
