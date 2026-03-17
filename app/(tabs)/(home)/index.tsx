
import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Linking, Platform, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";

interface TrainingResource {
  id: number;
  title: string;
  provider: string;
  description: string;
  duration: string;
  format: string;
  cost: string;
  website: string;
  phone?: string;
  category: 'beginner';
}

type ActiveTab = 'training' | 'requirements';

export default function HomeScreen() {
  console.log('HomeScreen: Rendering suicide awareness training list with app logo');

  const [activeTab, setActiveTab] = useState<ActiveTab>('training');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'free' | 'online'>('all');

  const trainingResources: TrainingResource[] = [
    {
      id: 1,
      title: "Let's Talk About Suicide",
      provider: 'HSE National Office for Suicide Prevention (NOSP)',
      description: 'An introductory awareness programme that helps community members understand suicide, recognise warning signs, and know how to respond and seek help.',
      duration: '2 hours',
      format: 'In-person & Online',
      cost: 'Free',
      website: 'https://www.hse.ie/nosp',
      category: 'beginner'
    },
    {
      id: 2,
      title: 'eSuicideTALK',
      provider: 'LivingWorks',
      description: 'An online awareness session that explores attitudes around suicide and helps participants understand how to support someone who may be at risk.',
      duration: '20 minutes',
      format: 'Online',
      cost: 'Free',
      website: 'https://www.livingworks.net/esuicidetalk',
      category: 'beginner'
    },
    {
      id: 3,
      title: 'safeTALK',
      provider: 'LivingWorks',
      description: 'A half-day training that prepares anyone to become a suicide-alert helper. Participants learn to recognise and engage with persons who may be having thoughts of suicide.',
      duration: '3.5 hours',
      format: 'In-person',
      cost: 'Free',
      website: 'https://www.livingworks.net/safetalk',
      category: 'beginner'
    },
    {
      id: 4,
      title: 'Introduction to Self-Harm',
      provider: 'HSE National Office for Suicide Prevention (NOSP)',
      description: 'An introductory programme providing community members with a basic understanding of self-harm, why it occurs, and how to respond supportively.',
      duration: '2 hours',
      format: 'In-person & Online',
      cost: 'Free',
      website: 'https://www.hse.ie/nosp',
      category: 'beginner'
    },
    {
      id: 5,
      title: 'Understanding Self-Harm',
      provider: 'HSE National Office for Suicide Prevention (NOSP)',
      description: 'Builds on introductory knowledge to give a deeper understanding of self-harm behaviours, supporting individuals and families affected.',
      duration: '3 hours',
      format: 'In-person & Online',
      cost: 'Free',
      website: 'https://www.hse.ie/nosp',
      category: 'beginner'
    }
  ];

  const filteredResources = trainingResources.filter(resource => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'free') return resource.cost === 'Free';
    if (selectedFilter === 'online') return resource.format.includes('Online');
    return true;
  });

  const handleTabPress = (tab: ActiveTab) => {
    console.log('User tapped in-screen tab:', tab);
    setActiveTab(tab);
  };

  const handleToggleExpand = (id: number) => {
    console.log('User tapped training card:', id);
    setExpandedId(expandedId === id ? null : id);
  };

  const handleOpenWebsite = (website: string, title: string) => {
    console.log('User tapped website link for:', title);
    Linking.openURL(website).catch(err => {
      console.error('Failed to open website:', err);
    });
  };

  const handleCallPhone = (phone: string, title: string) => {
    console.log('User tapped phone link for:', title);
    Linking.openURL(`tel:${phone}`).catch(err => {
      console.error('Failed to open phone dialer:', err);
    });
  };

  const filterCount = filteredResources.length;
  const totalCount = trainingResources.length;
  const filterText = selectedFilter === 'all' ? `${totalCount} Resources` : `${filterCount} of ${totalCount}`;

  const isTraining = activeTab === 'training';
  const isRequirements = activeTab === 'requirements';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER WITH LOGO */}
          <View style={styles.headerContainer}>
            <Image
              source={require('@/assets/images/app-icon-rcb.png')}
              style={styles.appLogo}
              resizeMode="contain"
            />
            <Text style={styles.appTitle}>Raven</Text>
            <Text style={styles.appSubtitle}>Suicide Awareness Training Resources</Text>
          </View>

          {/* SEGMENTED CONTROL */}
          <View style={styles.segmentedControl}>
            <TouchableOpacity
              style={[styles.segmentButton, isTraining && styles.segmentButtonActive]}
              onPress={() => handleTabPress('training')}
              activeOpacity={0.7}
            >
              <Text style={[styles.segmentButtonText, isTraining && styles.segmentButtonTextActive]}>
                Training
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.segmentButton, isRequirements && styles.segmentButtonActive]}
              onPress={() => handleTabPress('requirements')}
              activeOpacity={0.7}
            >
              <Text style={[styles.segmentButtonText, isRequirements && styles.segmentButtonTextActive]}>
                Requirements
              </Text>
            </TouchableOpacity>
          </View>

          {/* TAB: TRAINING */}
          {isTraining && (
            <>
              <Text style={styles.introText}>
                These are suicide alertness raising programmes that prepare participants to know how to help someone with thoughts of suicide. They also help to improve awareness of and sensitivities to self-harm.
              </Text>

              {/* FILTER SECTION */}
              <View style={styles.filterSection}>
                <Text style={styles.filterTitle}>Filter Training ({filterText})</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.filterScroll}
                >
                  <TouchableOpacity
                    style={[styles.filterChip, selectedFilter === 'all' && styles.filterChipActive]}
                    onPress={() => {
                      console.log('User tapped filter chip: all');
                      setSelectedFilter('all');
                    }}
                  >
                    <Text style={[styles.filterChipText, selectedFilter === 'all' && styles.filterChipTextActive]}>
                      All
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.filterChip, selectedFilter === 'free' && styles.filterChipActive]}
                    onPress={() => {
                      console.log('User tapped filter chip: free');
                      setSelectedFilter('free');
                    }}
                  >
                    <Text style={[styles.filterChipText, selectedFilter === 'free' && styles.filterChipTextActive]}>
                      Free
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.filterChip, selectedFilter === 'online' && styles.filterChipActive]}
                    onPress={() => {
                      console.log('User tapped filter chip: online');
                      setSelectedFilter('online');
                    }}
                  >
                    <Text style={[styles.filterChipText, selectedFilter === 'online' && styles.filterChipTextActive]}>
                      Online Available
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>

              {/* TRAINING RESOURCES */}
              {filteredResources.map((resource) => {
                const isExpanded = expandedId === resource.id;
                const chevronDown = "chevron.down";
                const chevronUp = "chevron.up";
                const chevronIcon = isExpanded ? chevronUp : chevronDown;
                const chevronAndroid = isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down";

                return (
                  <TouchableOpacity
                    key={resource.id}
                    style={styles.card}
                    onPress={() => handleToggleExpand(resource.id)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.cardHeader}>
                      <View style={styles.cardHeaderLeft}>
                        <IconSymbol
                          ios_icon_name="book.fill"
                          android_material_icon_name="menu-book"
                          size={24}
                          color={colors.primary}
                        />
                        <View style={styles.cardHeaderText}>
                          <Text style={styles.cardTitle}>{resource.title}</Text>
                          <Text style={styles.cardProvider}>{resource.provider}</Text>
                        </View>
                      </View>
                      <IconSymbol
                        ios_icon_name={chevronIcon}
                        android_material_icon_name={chevronAndroid}
                        size={24}
                        color={colors.textSecondary}
                      />
                    </View>

                    {isExpanded && (
                      <View style={styles.cardContent}>
                        <Text style={styles.description}>{resource.description}</Text>

                        <View style={styles.detailsGrid}>
                          <View style={styles.detailItem}>
                            <IconSymbol
                              ios_icon_name="clock.fill"
                              android_material_icon_name="schedule"
                              size={16}
                              color={colors.textSecondary}
                            />
                            <Text style={styles.detailLabel}>Duration:</Text>
                            <Text style={styles.detailValue}>{resource.duration}</Text>
                          </View>

                          <View style={styles.detailItem}>
                            <IconSymbol
                              ios_icon_name="person.2.fill"
                              android_material_icon_name="group"
                              size={16}
                              color={colors.textSecondary}
                            />
                            <Text style={styles.detailLabel}>Format:</Text>
                            <Text style={styles.detailValue}>{resource.format}</Text>
                          </View>

                          <View style={styles.detailItem}>
                            <IconSymbol
                              ios_icon_name="dollarsign.circle.fill"
                              android_material_icon_name="attach-money"
                              size={16}
                              color={colors.textSecondary}
                            />
                            <Text style={styles.detailLabel}>Cost:</Text>
                            <Text style={styles.detailValue}>{resource.cost}</Text>
                          </View>
                        </View>

                        <View style={styles.contactButtons}>
                          <TouchableOpacity
                            style={styles.contactButton}
                            onPress={() => handleOpenWebsite(resource.website, resource.title)}
                          >
                            <IconSymbol
                              ios_icon_name="globe"
                              android_material_icon_name="language"
                              size={18}
                              color={colors.primary}
                            />
                            <Text style={styles.contactButtonText}>Visit Website</Text>
                          </TouchableOpacity>

                          {resource.phone && (
                            <TouchableOpacity
                              style={styles.contactButton}
                              onPress={() => handleCallPhone(resource.phone!, resource.title)}
                            >
                              <IconSymbol
                                ios_icon_name="phone.fill"
                                android_material_icon_name="phone"
                                size={18}
                                color={colors.primary}
                              />
                              <Text style={styles.contactButtonText}>{resource.phone}</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}

              {/* SELF-CARE REMINDER */}
              <View style={styles.selfCareCard}>
                <IconSymbol
                  ios_icon_name="leaf.fill"
                  android_material_icon_name="eco"
                  size={20}
                  color={colors.success}
                />
                <Text style={styles.selfCareTitle}>Remember to Care for Yourself</Text>
                <Text style={styles.selfCareText}>
                  Learning about suicide prevention can be emotionally challenging. Take breaks, practice self-care, and reach out for support when needed.
                </Text>
              </View>
            </>
          )}

          {/* TAB: REQUIREMENTS */}
          {isRequirements && (
            <View style={styles.requirementsCard}>
              <View style={styles.requirementsHeader}>
                <IconSymbol
                  ios_icon_name="checkmark.shield.fill"
                  android_material_icon_name="verified-user"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.requirementsTitle}>Requirements to Attend</Text>
              </View>
              <Text style={styles.requirementsIntro}>
                The following requirements apply to those considering taking part in these programmes. Participants must be:
              </Text>
              <View style={styles.requirementsList}>
                <View style={styles.requirementItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.requirementText}>18 years of age or over</Text>
                </View>
                <View style={styles.requirementItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.requirementText}>"Ready" to complete training – it is recommended that individuals who are recently bereaved wait 12 months before attending</Text>
                </View>
                <View style={styles.requirementItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.requirementText}>Open and have the capacity to learn</Text>
                </View>
                <View style={styles.requirementItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.requirementText}>Aware that the course material is of a sensitive nature, and that the workshops are intensive and interactive, and may involve taking part in teaching and discussion groups</Text>
                </View>
                <View style={styles.requirementItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.requirementText}>Available to attend for the full duration of the training programme and, in the case of an online self-directed programme, ensure that the programme is fully completed</Text>
                </View>
              </View>
            </View>
          )}

          {/* CRISIS SUPPORT - always visible */}
          <View style={styles.emergencyCard}>
            <View style={styles.emergencyHeader}>
              <IconSymbol
                ios_icon_name="exclamationmark.triangle.fill"
                android_material_icon_name="warning"
                size={24}
                color={colors.accent}
              />
              <Text style={styles.emergencyTitle}>Need Immediate Support?</Text>
            </View>
            <Text style={styles.emergencyText}>
              If you or someone you know is in crisis, help is available 24/7:
            </Text>
            <View style={styles.emergencyButtons}>
              <TouchableOpacity
                style={styles.emergencyButton}
                onPress={() => handleCallPhone('999', 'Emergency Services')}
              >
                <IconSymbol
                  ios_icon_name="phone.fill"
                  android_material_icon_name="phone"
                  size={18}
                  color="#FFFFFF"
                />
                <Text style={styles.emergencyButtonText}>Emergency: 999</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.emergencyButton}
                onPress={() => handleCallPhone('116123', 'Samaritans')}
              >
                <IconSymbol
                  ios_icon_name="phone.fill"
                  android_material_icon_name="phone"
                  size={18}
                  color="#FFFFFF"
                />
                <Text style={styles.emergencyButtonText}>Samaritans: 116 123</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.emergencyButton}
                onPress={() => handleCallPhone('1800247247', 'Pieta House')}
              >
                <IconSymbol
                  ios_icon_name="phone.fill"
                  android_material_icon_name="phone"
                  size={18}
                  color="#FFFFFF"
                />
                <Text style={styles.emergencyButtonText}>Pieta House: 1800 247 247</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* SUPPORTIVE MESSAGE - always visible */}
          <View style={styles.supportCard}>
            <IconSymbol
              ios_icon_name="heart.circle.fill"
              android_material_icon_name="favorite"
              size={20}
              color={colors.primary}
            />
            <Text style={styles.supportText}>
              Thank you for taking steps to learn about suicide prevention. Your willingness to help can save lives.
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              This information is provided for educational purposes. Please verify details directly with providers.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingTop: Platform.OS === 'android' ? 48 : 24,
    marginBottom: 8,
  },
  appLogo: {
    width: 72,
    height: 72,
    borderRadius: 16,
    marginBottom: 12,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  appSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  introText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 16,
    textAlign: 'center',
    paddingHorizontal: 4,
    lineHeight: 21,
  },
  // Segmented control
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 4,
    marginBottom: 20,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentButtonActive: {
    backgroundColor: colors.primary,
  },
  segmentButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  segmentButtonTextActive: {
    color: '#FFFFFF',
  },
  emergencyCard: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    gap: 8,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  emergencyText: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  emergencyButtons: {
    gap: 8,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 8,
  },
  emergencyButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  supportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.highlight,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  supportText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  filterScroll: {
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.backgroundAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.06)',
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  cardHeaderText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  cardProvider: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  cardContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  description: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 16,
  },
  detailsGrid: {
    gap: 12,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  detailValue: {
    fontSize: 13,
    color: colors.text,
  },
  contactButtons: {
    gap: 8,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.highlight,
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  requirementsCard: {
    backgroundColor: '#EAF4F8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#B8D9E8',
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    boxShadow: '0px 1px 3px rgba(74, 144, 164, 0.08)',
    elevation: 2,
  },
  requirementsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  requirementsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.2,
  },
  requirementsIntro: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 21,
    marginBottom: 12,
  },
  requirementsList: {
    gap: 10,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: 7,
    flexShrink: 0,
  },
  requirementText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 21,
  },
  selfCareCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 16,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },
  selfCareTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'center',
  },
  selfCareText: {
    fontSize: 13,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 19,
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
});
