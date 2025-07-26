import { Text, View, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
  interpolate
} from 'react-native-reanimated';
import { commonStyles, colors, spacing, borderRadius } from '../styles/commonStyles';
import Button from '../components/Button';
import Icon from '../components/Icon';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface FeatureCardProps {
  title: string;
  description: string;
  icon: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap;
  onPress: () => void;
  delay?: number;
}

function FeatureCard({ title, description, icon, onPress, delay = 0 }: FeatureCardProps) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const pressScale = useSharedValue(1);

  useState(() => {
    setTimeout(() => {
      scale.value = withSpring(1, { damping: 15, stiffness: 150 });
      opacity.value = withTiming(1, { duration: 600 });
    }, delay);
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { scale: pressScale.value }
    ],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    pressScale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    pressScale.value = withSpring(1);
  };

  return (
    <AnimatedPressable
      style={[commonStyles.card, animatedStyle, { marginHorizontal: spacing.sm }]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View style={commonStyles.row}>
        <View style={{
          backgroundColor: colors.primary,
          borderRadius: borderRadius.md,
          padding: spacing.md,
          marginRight: spacing.md,
        }}>
          <Icon name={icon} size={24} style={{ color: colors.text }} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={commonStyles.subtitle}>{title}</Text>
          <Text style={commonStyles.textSecondary}>{description}</Text>
        </View>
      </View>
    </AnimatedPressable>
  );
}

export default function HomeScreen() {
  const headerScale = useSharedValue(0);
  const headerOpacity = useSharedValue(0);

  useState(() => {
    headerScale.value = withSpring(1, { damping: 12, stiffness: 100 });
    headerOpacity.value = withTiming(1, { duration: 800 });
  });

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: headerScale.value }],
    opacity: headerOpacity.value,
  }));

  const features = [
    {
      title: 'Profile',
      description: 'Manage your personal information',
      icon: 'person-outline' as const,
      onPress: () => router.push('/profile'),
      delay: 200,
    },
    {
      title: 'Content',
      description: 'Explore amazing content',
      icon: 'grid-outline' as const,
      onPress: () => router.push('/content'),
      delay: 400,
    },
    {
      title: 'Settings',
      description: 'Customize your experience',
      icon: 'settings-outline' as const,
      onPress: () => router.push('/settings'),
      delay: 600,
    },
  ];

  console.log('HomeScreen rendered');

  return (
    <View style={commonStyles.safeContainer}>
      <ScrollView style={commonStyles.container} showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: spacing.xxl }}>
          <Animated.View style={[{ alignItems: 'center', marginBottom: spacing.xl }, headerAnimatedStyle]}>
            <View style={[commonStyles.avatar, { width: 120, height: 120, borderRadius: 60 }]}>
              <Icon name="rocket-outline" size={48} style={{ color: colors.text }} />
            </View>
            <Text style={[commonStyles.title, { textAlign: 'center', fontSize: 32 }]}>
              Welcome to Your App
            </Text>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginTop: spacing.sm }]}>
              Discover amazing features and personalize your experience
            </Text>
          </Animated.View>

          <View style={{ marginBottom: spacing.xl }}>
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                onPress={feature.onPress}
                delay={feature.delay}
              />
            ))}
          </View>

          <View style={commonStyles.buttonContainer}>
            <Button
              text="Get Started"
              onPress={() => router.push('/content')}
              style={{ backgroundColor: colors.secondary }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}