import type { ModuleKey, TabKey, ActionCard, Recipe } from '../types';

export const MODULES: Array<{
  key: ModuleKey;
  label: string;
  icon: string;
  title: string;
  subtitle: string;
}> = [
  {
    key: 'onboarding',
    label: 'Onboarding',
    icon: '🌅',
    title: 'A warm first run',
    subtitle: 'Set the household, stock the pantry basics, and establish the tone.',
  },
  {
    key: 'home',
    label: 'Home',
    icon: '🏠',
    title: 'Your daily dashboard',
    subtitle: 'Morning status, quick actions, and what to cook tonight.',
  },
  {
    key: 'pantry',
    label: 'Pantry',
    icon: '🫙',
    title: 'Whole-home inventory',
    subtitle: 'Fridge, pantry, freezer, household supplies, and expiry tracking.',
  },
  {
    key: 'chef',
    label: 'AI Chef',
    icon: '👨‍🍳',
    title: 'Sous, your quiet partner',
    subtitle: 'Conversational help grounded in what is actually at home.',
  },
  {
    key: 'recipes',
    label: 'Recipes',
    icon: '📖',
    title: 'A domestic cookbook',
    subtitle: 'Cook now, save family recipes, and step into guided cooking.',
  },
  {
    key: 'mealPlan',
    label: 'Meal Plan',
    icon: '📅',
    title: 'Weekly planning',
    subtitle: 'Meals by day, AI planning, and nutrition balance.',
  },
  {
    key: 'shopping',
    label: 'Shopping',
    icon: '🛒',
    title: 'Aisle-ready lists',
    subtitle: 'Generated from pantry gaps and meal plans, ready to share.',
  },
  {
    key: 'community',
    label: 'Community',
    icon: '🌿',
    title: 'Cookbooks and creators',
    subtitle: 'Follow trusted cooks, subscribe, and bring their recipes home.',
  },
  {
    key: 'alerts',
    label: 'Alerts',
    icon: '🔔',
    title: 'Calm notifications',
    subtitle: 'Grouped by urgency, actionable, and written in a warm voice.',
  },
  {
    key: 'profile',
    label: 'Profile',
    icon: '👤',
    title: 'Household settings',
    subtitle: 'Preferences, members, and premium status in one place.',
  },
];

export const TABS: Array<{ key: TabKey; label: string; icon: string }> = [
  { key: 'home', label: 'Home', icon: '🏠' },
  { key: 'pantry', label: 'Pantry', icon: '🫙' },
  { key: 'chef', label: 'Chef', icon: '👨‍🍳' },
  { key: 'recipes', label: 'Recipes', icon: '📖' },
  { key: 'community', label: 'Community', icon: '🌿' },
];

export const quickActions: ActionCard[] = [
  { emoji: '📷', label: 'Scan item' },
  { emoji: '🧾', label: 'Scan receipt' },
  { emoji: '✍️', label: 'Add manual' },
  { emoji: '📅', label: 'Plan week' },
  { emoji: '👨‍🍳', label: 'Ask chef' },
];

export const tonightRecipes: Recipe[] = [
  {
    emoji: '🍝',
    title: 'Pasta Aglio e Olio',
    subtitle: '5 of 5 ingredients in stock',
    chips: ['✓ Ready', '20 min', 'Easy'],
    badge: 'From pantry',
    tone: 'ready',
  },
  {
    emoji: '🍳',
    title: 'Shakshuka',
    subtitle: '4 of 5 ingredients · missing feta',
    chips: ['+ 1 item', '25 min', 'Easy'],
    badge: 'Need 1 item',
    tone: 'sage',
  },
];
