import { Text, View, ScrollView, Switch, Pressable } from 'react-native';
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

interface SettingItemProps {
  title: string;
  description?: string;
  icon: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap;
  type: 'toggle' | 'navigation' | 'action';
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
  delay?: number;
}

function SettingItem({ title, description, icon, type, value, onPress, onToggle, delay = 0 }: SettingItemProps) {
  const translateX = useSharedValue(-30);
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

  const renderRightElement = () => {
    switch (type) {
      case 'toggle':
        return (
          <Switch
            value={value}
            onValueChange={onToggle}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={value ? colors.text : colors.textSecondary}
          />
        );
      case 'navigation':
        return <Icon name="chevron-forward-outline" size={20} style={{ color: colors.textSecondary }} />;
      case 'action':
        return null;
      default:
        return null;
    }
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        style={[commonStyles.card, { marginVertical: spacing.xs }]}
        onPress={onPress}
        disabled={type === 'toggle'}
      >
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
            <View style={{ flex: 1 }}>
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>{title}</Text>
              {description && (
                <Text style={[commonStyles.textSecondary, { marginTop: 2 }]}>{description}</Text>
              )}
            </View>
          </View>
          {renderRightElement()}
        </View>
      </Pressable>
    </Animated.View>
  );
}

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [autoSync, setAutoSync] = useState(false);
  
  const headerOpacity = useSharedValue(0);

  useState(() => {
    headerOpacity.value = withTiming(1, { duration: 800 });
  });

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));

  const settingsData = [
    {
      title: 'Notifications',
      description: 'Receive push notifications',
      icon: 'notifications-outline' as const,
      type: 'toggle' as const,
      value: notifications,
      onToggle: setNotifications,
      delay: 100,
    },
    {
      title: 'Dark Mode',
      description: 'Use dark theme',
      icon: 'moon-outline' as const,
      type: 'toggle' as const,
      value: darkMode,
      onToggle: setDarkMode,
      delay: 150,
    },
    {
      title: 'Auto Sync',
      description: 'Automatically sync data',
      icon: 'sync-outline' as const,
      type: 'toggle' as const,
      value: autoSync,
      onToggle: setAutoSync,
      delay: 200,
    },
    {
      title: 'Privacy & Security',
      description: 'Manage your privacy settings',
      icon: 'shield-outline' as const,
      type: 'navigation' as const,
      onPress: () => console.log('Privacy settings pressed'),
      delay: 250,
    },
    {
      title: 'Account',
      description: 'Manage your account settings',
      icon: 'person-circle-outline' as const,
      type: 'navigation' as const,
      onPress: () => router.push('/profile'),
      delay: 300,
    },
    {
      title: 'Help & Support',
      description: 'Get help and contact support',
      icon: 'help-circle-outline' as const,
      type: 'navigation' as const,
      onPress: () => console.log('Help pressed'),
      delay: 350,
    },
    {
      title: 'About',
      description: 'App version and information',
      icon: 'information-circle-outline' as const,
      type: 'navigation' as const,
      onPress: () => console.log('About pressed'),
      delay: 400,
    },
  ];

  console.log('SettingsScreen rendered');

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
          <Text style={[commonStyles.subtitle, { margin: 0 }]}>Settings</Text>
          <View style={{ width: 60 }} />
        </View>
      </View>

      <ScrollView style={commonStyles.container} showsVerticalScrollIndicator={false}>
        <Animated.View style={[{ paddingTop: spacing.lg }, headerAnimatedStyle]}>
          <Text style={[commonStyles.title, { marginBottom: spacing.sm }]}>
            Preferences
          </Text>
          <Text style={[commonStyles.textSecondary, { marginBottom: spacing.xl }]}>
            Customize your app experience
          </Text>

          <View style={{ marginBottom: spacing.xl }}>
            {settingsData.map((item, index) => (
              <SettingItem
                key={item.title}
                title={item.title}
                description={item.description}
                icon={item.icon}
                type={item.type}
                value={item.value}
                onPress={item.onPress}
                onToggle={item.onToggle}
                delay={item.delay}
              />
            ))}
          </View>

          <View style={commonStyles.buttonContainer}>
            <Button
              text="Sign Out"
              onPress={() => console.log('Sign out pressed')}
              style={{ 
                backgroundColor: colors.error,
                marginBottom: spacing.md,
              }}
            />
            <Text style={[commonStyles.textSecondary, { textAlign: 'center', fontSize: 12 }]}>
              Version 1.0.0
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}