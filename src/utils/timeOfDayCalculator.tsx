import type { IoniconsIconName } from '@react-native-vector-icons/ionicons/static';

export type TimeOfDay = 'morning' | 'noon' | 'afternoon' | 'evening' | 'night';

const ICON_BY_TIME_OF_DAY: Record<TimeOfDay, IoniconsIconName> = {
  morning: 'sunny-outline',
  noon: 'sunny',
  afternoon: 'partly-sunny-outline',
  evening: 'partly-sunny',
  night: 'moon-outline',
};

/**
 * Returns the time-of-day bucket for the provided date.
 * Defaults to the current local time when no date is provided.
 */
export function getTimeOfDay(date: Date = new Date()): TimeOfDay {
  const hour = date.getHours();

  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 14) return 'noon';
  if (hour >= 14 && hour < 18) return 'afternoon';
  if (hour >= 18 && hour < 22) return 'evening';
  return 'night';
}

/**
 * Returns a user-facing greeting such as "Good morning".
 */
export function getGreetingByTimeOfDay(date: Date = new Date()): string {
  const timeOfDay = getTimeOfDay(date);
  return `Good ${timeOfDay}`;
}

/**
 * Returns the Ionicons name that matches the current time-of-day greeting.
 */
export function getGreetingIconByTimeOfDay(
  date: Date = new Date(),
): IoniconsIconName {
  return ICON_BY_TIME_OF_DAY[getTimeOfDay(date)];
}

/**
 * Convenience helper if UI needs greeting text + icon together.
 */
export function getGreetingWithIconByTimeOfDay(date: Date = new Date()): {
  timeOfDay: TimeOfDay;
  greeting: string;
  icon: IoniconsIconName;
} {
  const timeOfDay = getTimeOfDay(date);
  return {
    timeOfDay,
    greeting: `Good ${timeOfDay}`,
    icon: ICON_BY_TIME_OF_DAY[timeOfDay],
  };
}
