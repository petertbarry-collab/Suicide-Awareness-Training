
import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Linking, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";
import RavenLogo from "@/components/RavenLogo";

interface TrainingResource {
  id: string;
  title: string;
  provider: string;
  description: string;
  duration: string;
  format: string;
  cost: string;
  website: string;
  phone?: string;
  category: 'beginner' | 'advanced' | 'specialized';
}

export default function HomeScreen() {
  console.log('HomeScreen: Rendering suicide awareness training list');
  
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'free' | 'online' | 'beginner'>('all');

  const trainingResources: TrainingResource[] = [
    {
      id: '1',
      title: 'safeTALK',
      provider: 'HSE National Office for Suicide Prevention',
      description: 'A half-day training program that teaches participants to recognize persons with thoughts of suicide and connect them to resources. Perfect for beginners.',
      duration: '3.5 hours',
      format: 'In-person',
      cost: 'Free',
      website: 'https://www.hse.ie/eng/services/list/4/mental-health-services/nosp/prevention/training/',
      phone: '01 635 2179',
      category: 'beginner'
    },
    {
      id: '2',
      title: 'ASIST (Applied Suicide Intervention Skills Training)',
      provider: 'HSE National Office for Suicide Prevention',
      description: 'A two-day interactive workshop in suicide first aid. Participants learn to recognize risk and intervene to prevent immediate suicide risk.',
      duration: '2 days',
      format: 'In-person',
      cost: 'Free',
      website: 'https://www.hse.ie/eng/services/list/4/mental-health-services/nosp/prevention/training/',
      phone: '01 635 2179',
      category: 'advanced'
    },
    {
      id: '3',
      title: 'Mental Health First Aid',
      provider: 'Mental Health Ireland',
      description: 'Teaches how to identify, understand and respond to signs of mental health and substance use challenges.',
      duration: '12 hours (various formats)',
      format: 'In-person & Online',
      cost: 'Varies',
      website: 'https://www.mentalhealthireland.ie/our-work/training/',
      phone: '01 284 1166',
      category: 'beginner'
    },
    {
      id: '4',
      title: 'Suicide Awareness Training',
      provider: 'Pieta House',
      description: 'Training for individuals and organizations on recognizing warning signs and how to respond appropriately.',
      duration: '2-3 hours',
      format: 'In-person & Online',
      cost: 'Free',
      website: 'https://www.pieta.ie/training/',
      phone: '01 601 0000',
      category: 'beginner'
    },
    {
      id: '5',
      title: 'Connect Suicide Prevention Training',
      provider: 'Connect Counselling',
      description: 'Evidence-based training program focusing on suicide prevention and intervention skills.',
      duration: 'Half day',
      format: 'In-person',
      cost: 'Contact for pricing',
      website: 'https://www.connectcounselling.ie/',
      phone: '1800 477 477',
      category: 'advanced'
    },
    {
      id: '6',
      title: 'Suicide Prevention Training',
      provider: 'Console',
      description: 'Training for professionals and community members on suicide prevention, intervention and postvention.',
      duration: 'Various',
      format: 'In-person & Online',
      cost: 'Free',
      website: 'https://www.console.ie/training/',
      phone: '1800 201 890',
      category: 'beginner'
    },
    {
      id: '7',
      title: 'Youth Mental Health First Aid',
      provider: 'Jigsaw',
      description: 'Specialized training for those working with young people, focusing on youth mental health challenges.',
      duration: '14 hours',
      format: 'In-person',
      cost: 'Varies',
      website: 'https://www.jigsaw.ie/training',
      phone: '01 472 7010',
      category: 'specialized'
    },
    {
      id: '8',
      title: 'Suicide Prevention & Intervention',
      provider: 'Aware',
      description: 'Training on understanding suicide, risk factors, and practical intervention strategies.',
      duration: '3 hours',
      format: 'In-person & Online',
      cost: 'Free',
      website: 'https://www.aware.ie/education/training/',
      phone: '01 661 7211',
      category: 'beginner'
    }
  ];

  const filteredResources = trainingResources.filter(resource => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'free') return resource.cost === 'Free';
    if (selectedFilter === 'online') return resource.format.includes('Online');
    if (selectedFilter === 'beginner') return resource.category === 'beginner';
    return true;
  });

  const handleToggleExpand = (id: string) => {
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

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <RavenLogo size={80} color={colors.primary} />
          <Text style={styles.title}>Suicide Awareness Training</Text>
          <Text style={styles.subtitle}>Available Resources in Ireland</Text>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* CRISIS SUPPORT - MOVED TO TOP FOR IMMEDIATE ACCESS */}
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

          {/* SUPPORTIVE MESSAGE */}
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
                onPress={() => setSelectedFilter('all')}
              >
                <Text style={[styles.filterChipText, selectedFilter === 'all' && styles.filterChipTextActive]}>
                  All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterChip, selectedFilter === 'beginner' && styles.filterChipActive]}
                onPress={() => setSelectedFilter('beginner')}
              >
                <Text style={[styles.filterChipText, selectedFilter === 'beginner' && styles.filterChipTextActive]}>
                  Beginner Friendly
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterChip, selectedFilter === 'free' && styles.filterChipActive]}
                onPress={() => setSelectedFilter('free')}
              >
                <Text style={[styles.filterChipText, selectedFilter === 'free' && styles.filterChipTextActive]}>
                  Free
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterChip, selectedFilter === 'online' && styles.filterChipActive]}
                onPress={() => setSelectedFilter('online')}
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
                    ios_icon_name={isExpanded ? "chevron.up" : "chevron.down"} 
                    android_material_icon_name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
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
  header: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 24 : 16,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: colors.backgroundAlt,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
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
