import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';

const { width } = Dimensions.get('window');

const DayBeeHomeScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const stats = [
    { icon: '💼', label: 'Active Jobs', value: '2,500+' },
    { icon: '👥', label: 'Job Seekers', value: '15,000+' },
    { icon: '🏢', label: 'Companies', value: '850+' },
    { icon: '📈', label: 'Success Rate', value: '94%' },
  ];

  const features = [
    { icon: '📍', title: 'Map-Based Search', desc: 'Find jobs near you with our interactive map view' },
    { icon: '⚡', title: 'Instant Matching', desc: 'Get matched with jobs that fit your skills instantly' },
    { icon: '🛡️', title: 'Trusted Employers', desc: 'Verified employers for safe and reliable work' },
    { icon: '🕐', title: 'Flexible Hours', desc: 'Work when it suits your schedule' },
  ];

  const categories = [
    { icon: '🚚', name: 'Delivery & Logistics', jobs: 234, bgColor: '#FFE5E5' },
    { icon: '🍽️', name: 'Food Service', jobs: 189, bgColor: '#E5F9F7' },
    { icon: '🛒', name: 'Retail', jobs: 156, bgColor: '#E5F3F9' },
    { icon: '🎉', name: 'Events', jobs: 98, bgColor: '#F0F9E5' },
    { icon: '📚', name: 'Tutoring', jobs: 145, bgColor: '#FFFAE5' },
    { icon: '💻', name: 'Tech Support', jobs: 87, bgColor: '#F5F5F5' },
  ];

  const steps = [
    { step: '1', icon: '👤', title: 'Create Profile', desc: 'Sign up and complete your profile in minutes' },
    { step: '2', icon: '🔍', title: 'Find Jobs', desc: 'Browse jobs on map or list view and apply instantly' },
    { step: '3', icon: '💰', title: 'Start Earning', desc: 'Get hired and start earning on your schedule' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logo}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoIconText}>🐝</Text>
            </View>
            <Text style={styles.logoText}>
              Day<Text style={styles.logoHighlight}>Bee</Text>.lk
            </Text>
          </View>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <Animated.View 
          style={[
            styles.hero,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.heroTitle}>
            Find Your Perfect{'\n'}
            <Text style={styles.heroHighlight}>Part-Time Job</Text>{'\n'}
            in Sri Lanka
          </Text>
          <Text style={styles.heroSubtitle}>
            Connect with thousands of flexible job opportunities. Work on your terms, grow your income, and build your future.
          </Text>
          
          <View style={styles.ctaButtons}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Find Jobs Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Post a Job</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={styles.statIcon}>
                <Text style={styles.statIconText}>{stat.icon}</Text>
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Why Choose DayBee */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Why Choose <Text style={styles.highlight}>DayBee</Text>?
          </Text>
          <Text style={styles.sectionSubtitle}>
            The smartest way to find part-time work in Sri Lanka
          </Text>
          
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Text style={styles.featureIconText}>{feature.icon}</Text>
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDesc}>{feature.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Browse by Category */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Browse by <Text style={styles.highlight}>Category</Text>
          </Text>
          <Text style={styles.sectionSubtitle}>
            Thousands of jobs across popular categories
          </Text>
          
          <View style={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryCard}>
                <View style={[styles.categoryIcon, { backgroundColor: category.bgColor }]}>
                  <Text style={styles.categoryIconText}>{category.icon}</Text>
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryJobs}>{category.jobs} Jobs</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Rating Section */}
        <View style={[styles.section, styles.ratingSection]}>
          <View style={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <Text key={i} style={styles.star}>⭐</Text>
            ))}
          </View>
          <Text style={styles.rating}>
            Rated <Text style={styles.ratingHighlight}>4.9/5</Text> by Users
          </Text>
          <Text style={styles.ratingSubtitle}>
            Trusted by thousands of job seekers and employers across Sri Lanka
          </Text>
        </View>

        {/* How It Works */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            How It <Text style={styles.highlight}>Works</Text>
          </Text>
          <Text style={styles.sectionSubtitle}>Get started in 3 simple steps</Text>
          
          <View style={styles.stepsContainer}>
            {steps.map((item, index) => (
              <View key={index} style={styles.stepCard}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{item.step}</Text>
                </View>
                <Text style={styles.stepIcon}>{item.icon}</Text>
                <Text style={styles.stepTitle}>{item.title}</Text>
                <Text style={styles.stepDesc}>{item.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Footer CTA */}
        <View style={styles.footerCTA}>
          <Text style={styles.footerCTATitle}>Ready to Get Started?</Text>
          <TouchableOpacity style={styles.getStartedButton}>
            <Text style={styles.getStartedButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF8E7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoIconText: {
    fontSize: 20,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  logoHighlight: {
    color: '#FDB022',
  },
  loginButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FDB022',
  },
  loginText: {
    color: '#FDB022',
    fontWeight: '600',
    fontSize: 14,
  },
  hero: {
    padding: 20,
    paddingTop: 10,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1a1a2e',
    lineHeight: 36,
    marginBottom: 16,
  },
  heroHighlight: {
    color: '#FDB022',
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 24,
  },
  ctaButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#FDB022',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#FDB022',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#E8F4F8',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#1a1a2e',
    fontWeight: '600',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 12,
  },
  statCard: {
    width: (width - 48) / 2,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF8E7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIconText: {
    fontSize: 24,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1a2e',
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  highlight: {
    color: '#FDB022',
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF8E7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIconText: {
    fontSize: 28,
  },
  featureTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  featureDesc: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: (width - 52) / 2,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIconText: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  categoryJobs: {
    fontSize: 12,
    color: '#666',
  },
  ratingSection: {
    backgroundColor: '#F8FBFD',
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 10,
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  star: {
    fontSize: 24,
    marginHorizontal: 2,
  },
  rating: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a1a2e',
    textAlign: 'center',
    marginBottom: 8,
  },
  ratingHighlight: {
    color: '#FDB022',
  },
  ratingSubtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
  stepsContainer: {
    gap: 16,
  },
  stepCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    position: 'relative',
  },
  stepNumber: {
    position: 'absolute',
    top: -12,
    left: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FDB022',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  stepIcon: {
    fontSize: 40,
    marginBottom: 16,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 8,
    textAlign: 'center',
  },
  stepDesc: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  footerCTA: {
    backgroundColor: '#1a1a2e',
    padding: 32,
    alignItems: 'center',
    marginTop: 20,
  },
  footerCTATitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 20,
  },
  getStartedButton: {
    backgroundColor: '#FDB022',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#FDB022',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  getStartedButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default DayBeeHomeScreen;