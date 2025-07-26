import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#6366F1',      // Modern indigo
  primaryDark: '#4F46E5',  // Darker indigo
  secondary: '#EC4899',    // Pink accent
  accent: '#10B981',       // Green accent
  background: '#0F172A',   // Dark slate
  backgroundAlt: '#1E293B', // Lighter slate
  card: '#334155',         // Card background
  text: '#F8FAFC',         // Light text
  textSecondary: '#CBD5E1', // Secondary text
  border: '#475569',       // Border color
  success: '#10B981',      // Green
  warning: '#F59E0B',      // Amber
  error: '#EF4444',        // Red
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 24,
};

export const shadows = {
  small: {
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)',
    elevation: 2,
  },
  medium: {
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.08)',
    elevation: 4,
  },
  large: {
    boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.05)',
    elevation: 8,
  },
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    ...shadows.medium,
  },
  secondary: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.small,
  },
  accent: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    ...shadows.medium,
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
  },
  safeContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  header: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.backgroundAlt,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 24,
  },
  textSecondary: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginVertical: spacing.sm,
    ...shadows.medium,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  badge: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
});