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

interface ContentCardProps {
  title: string;
  description: string;
  category: string;
  readTime: string;
  delay?: number;
}

function ContentCard({ title, description, category, readTime, delay = 0 }: ContentCardProps) {
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);
  const pressScale = useSharedValue(1);

  useState(() => {
    setTimeout(() => {
      translateY.value = withSpring(0, { damping: 15, stiffness: 150 });
      opacity.value = withTiming(1, { duration: 600 });
    }, delay);
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: pressScale.value }
    ],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    pressScale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    pressScale.value = withSpring(1);
  };

  return (
    <AnimatedPressable
      style={[commonStyles.card, animatedStyle]}
      onPress={() => console.log(`Pressed: ${title}`)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View style={commonStyles.spaceBetween}>
        <View style={commonStyles.badge}>
          <Text style={commonStyles.badgeText}>{category}</Text>
        </View>
        <Text style={commonStyles.textSecondary}>{readTime}</Text>
      </View>
      
      <Text style={[commonStyles.subtitle, { marginTop: spacing.md, marginBottom: spacing.sm }]}>
        {title}
      </Text>
      
      <Text style={commonStyles.textSecondary}>
        {description}
      </Text>
      
      <View style={[commonStyles.row, { marginTop: spacing.md, justifyContent: 'space-between' }]}>
        <View style={commonStyles.row}>
          <Icon name="heart-outline" size={20} style={{ color: colors.textSecondary, marginRight: spacing.sm }} />
          <Text style={commonStyles.textSecondary}>24</Text>
          <Icon name="chatbubble-outline" size={20} style={{ color: colors.textSecondary, marginLeft: spacing.md, marginRight: spacing.sm }} />
          <Text style={commonStyles.textSecondary}>8</Text>
        </View>
        <Icon name="bookmark-outline" size={20} style={{ color: colors.textSecondary }} />
      </View>
    </AnimatedPressable>
  );
}

export default function ContentScreen() {
  const headerOpacity = useSharedValue(0);

  useState(() => {
    headerOpacity.value = withTiming(1, { duration: 800 });
  });

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));

  const contentData = [
    {
      title: 'Getting Started with React Native',
      description: 'Learn the fundamentals of building mobile apps with React Native. This comprehensive guide covers everything you need to know.',
      category: 'Tutorial',
      readTime: '5 min read',
      delay: 100,
    },
    {
      title: 'Advanced Animation Techniques',
      description: 'Discover how to create smooth, performant animations that will make your app stand out from the competition.',
      category: 'Advanced',
      readTime: '8 min read',
      delay: 200,
    },
    {
      title: 'UI/UX Best Practices',
      description: 'Design principles and patterns that will help you create intuitive and beautiful user interfaces.',
      category: 'Design',
      readTime: '6 min read',
      delay: 300,
    },
    {
      title: 'Performance Optimization',
      description: 'Tips and tricks to make your React Native app faster and more responsive for better user experience.',
      category: 'Performance',
      readTime: '10 min read',
      delay: 400,
    },
    {
      title: 'State Management Solutions',
      description: 'Compare different state management approaches and learn when to use each one in your projects.',
      category: 'Architecture',
      readTime: '12 min read',
      delay: 500,
    },
  ];

  console.log('ContentScreen rendered');

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
          <Text style={[commonStyles.subtitle, { margin: 0 }]}>Content</Text>
          <Pressable onPress={() => console.log('Search pressed')}>
            <Icon name="search-outline" size={24} style={{ color: colors.text }} />
          </Pressable>
        </View>
      </View>

      <ScrollView style={commonStyles.container} showsVerticalScrollIndicator={false}>
        <Animated.View style={[{ paddingTop: spacing.lg }, headerAnimatedStyle]}>
          <Text style={[commonStyles.title, { marginBottom: spacing.sm }]}>
            Discover Content
          </Text>
          <Text style={[commonStyles.textSecondary, { marginBottom: spacing.xl }]}>
            Explore our curated collection of articles and tutorials
          </Text>

          <View style={{ marginBottom: spacing.xl }}>
            {contentData.map((item, index) => (
              <ContentCard
                key={item.title}
                title={item.title}
                description={item.description}
                category={item.category}
                readTime={item.readTime}
                delay={item.delay}
              />
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}