import { Text, Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';
import { colors, spacing, borderRadius, shadows } from '../styles/commonStyles';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ButtonProps {
  text: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  disabled?: boolean;
}

export default function Button({ text, onPress, style, textStyle, disabled = false }: ButtonProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    if (!disabled) {
      scale.value = withSpring(0.96, { damping: 15, stiffness: 300 });
      opacity.value = withSpring(0.8, { damping: 15, stiffness: 300 });
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      scale.value = withSpring(1, { damping: 15, stiffness: 300 });
      opacity.value = withSpring(1, { damping: 15, stiffness: 300 });
    }
  };

  console.log('Button rendered:', text);

  return (
    <AnimatedPressable
      style={[styles.button, style, animatedStyle, disabled && styles.disabled]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, textStyle, disabled && styles.disabledText]}>
        {text}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    ...shadows.medium,
  },
  buttonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  disabled: {
    backgroundColor: colors.border,
  },
  disabledText: {
    color: colors.textSecondary,
  },
});