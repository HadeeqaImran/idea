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
  icon: string;
  label: string;
};

export type Recipe = {
  icon: string;
  title: string;
  subtitle: string;
  chips: string[];
  badge: string;
  tone?: 'ready' | 'sage' | 'gold';
};
