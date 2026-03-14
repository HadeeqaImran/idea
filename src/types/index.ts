export type ModuleKey =
  | 'onboarding'
  | 'home'
  | 'pantry'
  | 'chef'
  | 'recipes'
  | 'mealPlan'
  | 'shopping'
  | 'community'
  | 'alerts'
  | 'profile';

export type TabKey = 'home' | 'pantry' | 'chef' | 'recipes' | 'community';

export type ActionCard = {
  emoji: string;
  label: string;
};

export type Recipe = {
  emoji: string;
  title: string;
  subtitle: string;
  chips: string[];
  badge: string;
  tone?: 'ready' | 'sage' | 'gold';
};
