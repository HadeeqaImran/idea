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
    icon: 'sunny-outline',
    title: 'A warm first run',
    subtitle: 'Set the household, stock the pantry basics, and establish the tone.',
  },
  {
    key: 'home',
    label: 'Home',
    icon: 'home-outline',
    title: 'Your daily dashboard',
    subtitle: 'Morning status, quick actions, and what to cook tonight.',
  },
  {
    key: 'pantry',
    label: 'Pantry',
    icon: 'file-tray-full-outline',
    title: 'Whole-home inventory',
    subtitle: 'Fridge, pantry, freezer, household supplies, and expiry tracking.',
  },
  {
    key: 'chef',
    label: 'AI Chef',
    icon: 'restaurant-outline',
    title: 'Sous, your quiet partner',
    subtitle: 'Conversational help grounded in what is actually at home.',
  },
  {
    key: 'recipes',
    label: 'Recipes',
    icon: 'book-outline',
    title: 'A domestic cookbook',
    subtitle: 'Cook now, save family recipes, and step into guided cooking.',
  },
  {
    key: 'mealPlan',
    label: 'Meal Plan',
    icon: 'calendar-outline',
    title: 'Weekly planning',
    subtitle: 'Meals by day, AI planning, and nutrition balance.',
  },
  {
    key: 'shopping',
    label: 'Shopping',
    icon: 'cart-outline',
    title: 'Aisle-ready lists',
    subtitle: 'Generated from pantry gaps and meal plans, ready to share.',
  },
  {
    key: 'community',
    label: 'Community',
    icon: 'leaf-outline',
    title: 'Cookbooks and creators',
    subtitle: 'Follow trusted cooks, subscribe, and bring their recipes home.',
  },
  {
    key: 'alerts',
    label: 'Alerts',
    icon: 'notifications-outline',
    title: 'Calm notifications',
    subtitle: 'Grouped by urgency, actionable, and written in a warm voice.',
  },
  {
    key: 'profile',
    label: 'Profile',
    icon: 'person-outline',
    title: 'Household settings',
    subtitle: 'Preferences, members, and premium status in one place.',
  },
];

export const TABS: Array<{ key: TabKey; label: string; icon: string }> = [
  { key: 'home', label: 'Home', icon: 'home-outline' },
  { key: 'pantry', label: 'Pantry', icon: 'file-tray-full-outline' },
  { key: 'chef', label: 'Chef', icon: 'restaurant-outline' },
  { key: 'recipes', label: 'Recipes', icon: 'book-outline' },
  { key: 'community', label: 'Community', icon: 'leaf-outline' },
];

export const quickActions: ActionCard[] = [
  { icon: 'camera-outline', label: 'Scan item' },
  { icon: 'receipt', label: 'Scan receipt' },
  { icon: 'pencil-outline', label: 'Add manual' },
  { icon: 'calendar-outline', label: 'Plan week' },
  { icon: 'restaurant-outline', label: 'Ask chef' },
];

export const tonightRecipes: Recipe[] = [
  {
    icon: 'restaurant-outline',
    title: 'Pasta Aglio e Olio',
    subtitle: '5 of 5 ingredients in stock',
    chips: ['✓ Ready', '20 min', 'Easy'],
    badge: 'From pantry',
    tone: 'ready',
  },
  {
    icon: 'nutrition-outline',
    title: 'Shakshuka',
    subtitle: '4 of 5 ingredients · missing feta',
    chips: ['+ 1 item', '25 min', 'Easy'],
    badge: 'Need 1 item',
    tone: 'sage',
  },
];
