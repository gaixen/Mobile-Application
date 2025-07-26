import { Text, View, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming
} from 'react-native-reanimated';
import { commonStyles, colors, spacing, borderRadius } from '../styles/commonStyles';
import Button from '../components/Button';
import Icon from '../components/Icon';

interface ProfileItemProps {
  label: string;
  value: string;
  icon: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap;
  delay?: number;
}

function ProfileItem({ label, value, icon, delay = 0 }: ProfileItemProps) {
  const translateX = useSharedValue(-50);
  const opacity = useSharedValue(0);

  useState(() => {
    setTimeout(() => {
      translateX.value = withSpring(0, { damping: 15, stiffness: 150 });
      opacity.value = withTiming(1, { duration: 600 });
    }, delay);
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[commonStyles.card, animatedStyle]}>
      <View style={commonStyles.spaceBetween}>
        <View style={commonStyles.row}>
          <View style={{
            backgroundColor: colors.backgroundAlt,
            borderRadius: borderRadius.sm,
            padding: spacing.sm,
            marginRight: spacing.md,
          }}>
            <Icon name={icon} size={20} style={{ color: colors.primary }} />
          </View>
          <View>
            <Text style={commonStyles.textSecondary}>{label}</Text>
            <Text style={[commonStyles.text, { fontWeight: '600' }]}>{value}</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

export default function ProfileScreen() {
  const avatarScale = useSharedValue(0);
  const headerOpacity = useSharedValue(0);

  useState(() => {
    avatarScale.value = withSpring(1, { damping: 12, stiffness: 100 });
    headerOpacity.value = withTiming(1, { duration: 800 });
  });

  const avatarAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: avatarScale.value }],
    opacity: headerOpacity.value,
  }));

  const profileData = [
    { label: 'Name', value: 'John Doe', icon: 'person-outline' as const, delay: 100 },
    { label: 'Email', value: 'john.doe@example.com', icon: 'mail-outline' as const, delay: 200 },
    { label: 'Phone', value: '+1 (555) 123-4567', icon: 'call-outline' as const, delay: 300 },
    { label: 'Location', value: 'San Francisco, CA', icon: 'location-outline' as const, delay: 400 },
    { label: 'Member Since', value: 'January 2024', icon: 'calendar-outline' as const, delay: 500 },
  ];

  console.log('ProfileScreen rendered');

  return (
    <View style={commonStyles.safeContainer}>
      <View style={commonStyles.header}>
        <View style={commonStyles.spaceBetween}>
          <Button
            text="← Back"
            onPress={() => router.back()}
            style={{ 
              backgroundColor: 'transparent',
              paddingHorizontal: 0,
              paddingVertical: spacing.sm,
              width: 'auto',
            }}
            textStyle={{ color: colors.primary }}
          />
          <Text style={[commonStyles.subtitle, { margin: 0 }]}>Profile</Text>
          <View style={{ width: 60 }} />
        </View>
      </View>

      <ScrollView style={commonStyles.container} showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: spacing.lg }}>
          <Animated.View style={[{ alignItems: 'center', marginBottom: spacing.xl }, avatarAnimatedStyle]}>
            <View style={[commonStyles.avatar, { width: 100, height: 100, borderRadius: 50 }]}>
              <Icon name="person" size={40} style={{ color: colors.text }} />
            </View>
            <Text style={[commonStyles.title, { textAlign: 'center', fontSize: 24, marginTop: spacing.md }]}>
              John Doe
            </Text>
            <View style={commonStyles.badge}>
              <Text style={commonStyles.badgeText}>Premium Member</Text>
            </View>
          </Animated.View>

          <View style={{ marginBottom: spacing.xl }}>
            {profileData.map((item, index) => (
              <ProfileItem
                key={item.label}
                label={item.label}
                value={item.value}
                icon={item.icon}
                delay={item.delay}
              />
            ))}
          </View>

          <View style={commonStyles.buttonContainer}>
            <Button
              text="Edit Profile"
              onPress={() => console.log('Edit profile pressed')}
              style={{ backgroundColor: colors.primary, marginBottom: spacing.md }}
            />
            <Button
              text="Account Settings"
              onPress={() => router.push('/settings')}
              style={{ backgroundColor: colors.backgroundAlt, borderWidth: 1, borderColor: colors.border }}
              textStyle={{ color: colors.text }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}