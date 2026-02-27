
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Linking, Platform } from "react-native";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

interface SupportGroup {
  id: string;
  name: string;
  organization: string;
  description: string;
  location: string;
  meetingTime: string;
  contactPhone?: string;
  contactEmail?: string;
  website?: string;
  type: 'in-person' | 'online' | 'hybrid';
}

const supportGroups: SupportGroup[] = [
  {
    id: '1',
    name: 'Dublin Suicide Bereavement Support',
    organization: 'Console',
    description: 'Support group for those bereaved by suicide. Provides a safe space to share experiences and find comfort.',
    location: 'Dublin City Centre',
    meetingTime: 'Every Tuesday, 7:00 PM',
    contactPhone: '1800 201 890',
    website: 'https://www.console.ie',
    type: 'in-person',
  },
  {
    id: '2',
    name: 'Cork Mental Health Support Circle',
    organization: 'Pieta House',
    description: 'Weekly support group for individuals experiencing suicidal thoughts or self-harm. Professional facilitators present.',
    location: 'Cork City',
    meetingTime: 'Wednesdays, 6:30 PM',
    contactPhone: '1800 247 247',
    website: 'https://www.pieta.ie',
    type: 'in-person',
  },
  {
    id: '3',
    name: 'Galway Survivors of Suicide Group',
    organization: 'Living Links',
    description: 'Peer support for those who have lost someone to suicide. Monthly meetings with trained facilitators.',
    location: 'Galway',
    meetingTime: 'First Monday of each month, 7:00 PM',
    contactPhone: '091 563 991',
    contactEmail: 'info@livinglinks.ie',
    website: 'https://www.livinglinks.ie',
    type: 'in-person',
  },
  {
    id: '4',
    name: 'Online Mental Wellness Group',
    organization: 'Aware',
    description: 'Virtual support group for depression and anxiety. Accessible from anywhere in Ireland via video call.',
    location: 'Online (Nationwide)',
    meetingTime: 'Thursdays, 8:00 PM',
    contactPhone: '1800 80 48 48',
    website: 'https://www.aware.ie',
    type: 'online',
  },
  {
    id: '5',
    name: 'Limerick Peer Support Network',
    organization: 'Limerick Mental Health Association',
    description: 'Community-led support group focusing on recovery and wellness. Open to all.',
    location: 'Limerick City',
    meetingTime: 'Mondays & Thursdays, 7:00 PM',
    contactPhone: '061 315 915',
    type: 'in-person',
  },
  {
    id: '6',
    name: 'Waterford Bereavement Care',
    organization: 'Waterford Bereavement Support',
    description: 'Support for families and individuals affected by suicide loss. One-to-one and group sessions available.',
    location: 'Waterford',
    meetingTime: 'Tuesdays, 6:00 PM',
    contactPhone: '051 873 362',
    website: 'https://www.bereavementcare.ie',
    type: 'hybrid',
  },
  {
    id: '7',
    name: 'National Online Support Forum',
    organization: 'Turn2Me',
    description: 'Free online support groups and counseling. Multiple sessions throughout the week.',
    location: 'Online (Nationwide)',
    meetingTime: 'Daily sessions available',
    contactPhone: '01 554 3800',
    website: 'https://www.turn2me.ie',
    type: 'online',
  },
  {
    id: '8',
    name: 'Drogheda Mental Health Circle',
    organization: 'Drogheda Community Services',
    description: 'Weekly peer support meetings for mental health and wellbeing. Welcoming and confidential environment.',
    location: 'Drogheda, Co. Louth',
    meetingTime: 'Wednesdays, 7:30 PM',
    contactPhone: '041 983 4598',
    type: 'in-person',
  },
  {
    id: '9',
    name: 'Hugg Bereavement Support',
    organization: 'Hugg',
    description: 'Peer support for anyone bereaved by suicide. Hugg provides a safe, confidential space to share experiences with others who understand.',
    location: 'Multiple locations nationwide',
    meetingTime: 'Various times - check website',
    contactPhone: '01 513 4048',
    contactEmail: 'info@hugg.ie',
    website: 'https://www.hugg.ie',
    type: 'hybrid',
  },
];

export default function SupportGroupsScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  console.log('SupportGroupsScreen: Rendering support groups directory');

  const handleToggleExpand = (id: string) => {
    console.log('User tapped support group card:', id);
    setExpandedId(expandedId === id ? null : id);
  };

  const handleCallPhone = (phone: string, name: string) => {
    console.log('User tapped call button for:', name, phone);
    Linking.openURL(`tel:${phone}`);
  };

  const handleSendEmail = (email: string, name: string) => {
    console.log('User tapped email button for:', name, email);
    Linking.openURL(`mailto:${email}`);
  };

  const handleOpenWebsite = (website: string, name: string) => {
    console.log('User tapped website button for:', name, website);
    Linking.openURL(website);
  };

  const getTypeIcon = (type: string) => {
    if (type === 'online') return 'videocam';
    if (type === 'hybrid') return 'sync';
    return 'place';
  };

  const getTypeLabel = (type: string) => {
    if (type === 'online') return 'Online';
    if (type === 'hybrid') return 'Hybrid';
    return 'In-Person';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Local Support Groups</Text>
          <Text style={styles.headerSubtitle}>
            Find peer support and community connections across Ireland
          </Text>
        </View>

        <View style={styles.groupsList}>
          {supportGroups.map((group) => {
            const isExpanded = expandedId === group.id;
            const typeIcon = getTypeIcon(group.type);
            const typeLabel = getTypeLabel(group.type);

            return (
              <TouchableOpacity
                key={group.id}
                style={styles.groupCard}
                onPress={() => handleToggleExpand(group.id)}
                activeOpacity={0.7}
              >
                <View style={styles.groupHeader}>
                  <View style={styles.groupTitleRow}>
                    <IconSymbol
                      ios_icon_name="person.3.fill"
                      android_material_icon_name="group"
                      size={24}
                      color={colors.primary}
                    />
                    <View style={styles.groupTitleContainer}>
                      <Text style={styles.groupName}>{group.name}</Text>
                      <Text style={styles.groupOrganization}>{group.organization}</Text>
                    </View>
                  </View>
                  <IconSymbol
                    ios_icon_name={isExpanded ? "chevron.up" : "chevron.down"}
                    android_material_icon_name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                    size={24}
                    color={colors.textSecondary}
                  />
                </View>

                <View style={styles.groupMetaRow}>
                  <View style={styles.metaItem}>
                    <IconSymbol
                      ios_icon_name="location.fill"
                      android_material_icon_name={typeIcon}
                      size={16}
                      color={colors.textSecondary}
                    />
                    <Text style={styles.metaText}>{typeLabel}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <IconSymbol
                      ios_icon_name="clock.fill"
                      android_material_icon_name="schedule"
                      size={16}
                      color={colors.textSecondary}
                    />
                    <Text style={styles.metaText}>{group.meetingTime}</Text>
                  </View>
                </View>

                {isExpanded && (
                  <View style={styles.expandedContent}>
                    <Text style={styles.groupDescription}>{group.description}</Text>
                    
                    <View style={styles.detailRow}>
                      <IconSymbol
                        ios_icon_name="mappin.circle.fill"
                        android_material_icon_name="location-on"
                        size={18}
                        color={colors.primary}
                      />
                      <Text style={styles.detailText}>{group.location}</Text>
                    </View>

                    <View style={styles.actionsRow}>
                      {group.contactPhone && (
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() => handleCallPhone(group.contactPhone!, group.name)}
                        >
                          <IconSymbol
                            ios_icon_name="phone.fill"
                            android_material_icon_name="phone"
                            size={20}
                            color={colors.backgroundAlt}
                          />
                          <Text style={styles.actionButtonText}>Call</Text>
                        </TouchableOpacity>
                      )}

                      {group.contactEmail && (
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() => handleSendEmail(group.contactEmail!, group.name)}
                        >
                          <IconSymbol
                            ios_icon_name="envelope.fill"
                            android_material_icon_name="email"
                            size={20}
                            color={colors.backgroundAlt}
                          />
                          <Text style={styles.actionButtonText}>Email</Text>
                        </TouchableOpacity>
                      )}

                      {group.website && (
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() => handleOpenWebsite(group.website!, group.name)}
                        >
                          <IconSymbol
                            ios_icon_name="safari.fill"
                            android_material_icon_name="language"
                            size={20}
                            color={colors.backgroundAlt}
                          />
                          <Text style={styles.actionButtonText}>Website</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.footer}>
          <View style={styles.infoBox}>
            <IconSymbol
              ios_icon_name="info.circle.fill"
              android_material_icon_name="info"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.infoText}>
              All support groups are free and confidential. Contact the organization directly for the most up-to-date meeting information.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 48 : 20,
    paddingBottom: 20,
    backgroundColor: colors.backgroundAlt,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  groupsList: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  groupCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  groupTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    gap: 12,
  },
  groupTitleContainer: {
    flex: 1,
  },
  groupName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  groupOrganization: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  groupMetaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  expandedContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  groupDescription: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  detailText: {
    fontSize: 15,
    color: colors.text,
    flex: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  actionButtonText: {
    color: colors.backgroundAlt,
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: colors.highlight,
    padding: 16,
    borderRadius: 12,
    gap: 12,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});
