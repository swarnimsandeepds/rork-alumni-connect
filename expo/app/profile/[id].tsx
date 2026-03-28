import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { MapPin, Briefcase, Mail, Linkedin, GraduationCap } from "lucide-react-native";
import { MOCK_ALUMNI } from "@/mocks/alumni";

export default function ProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const alumni = MOCK_ALUMNI.find((a) => a.id === id);

  if (!alumni) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Alumni not found</Text>
      </View>
    );
  }

  const handleEmail = () => {
    Linking.openURL(`mailto:${alumni.email}`);
  };

  const handleLinkedIn = () => {
    if (alumni.linkedin) {
      Linking.openURL(`https://${alumni.linkedin}`);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image source={{ uri: alumni.profileImage }} style={styles.avatar} />
        <Text style={styles.name}>{alumni.name}</Text>
        <Text style={styles.position}>{alumni.currentPosition}</Text>
        <Text style={styles.company}>{alumni.company}</Text>

        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <MapPin size={18} color="#6B7280" />
            <Text style={styles.metaText}>{alumni.location}</Text>
          </View>
          <View style={styles.metaItem}>
            <GraduationCap size={18} color="#6B7280" />
            <Text style={styles.metaText}>Class of {alumni.graduationYear}</Text>
          </View>
          <View style={styles.metaItem}>
            <Briefcase size={18} color="#6B7280" />
            <Text style={styles.metaText}>{alumni.industry}</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleEmail}>
            <Mail size={20} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Send Email</Text>
          </TouchableOpacity>
          {alumni.linkedin && (
            <TouchableOpacity style={styles.secondaryButton} onPress={handleLinkedIn}>
              <Linkedin size={20} color="#0066FF" />
              <Text style={styles.secondaryButtonText}>LinkedIn</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.bio}>{alumni.bio}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Major</Text>
          <Text style={styles.infoValue}>{alumni.major}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Graduation Year</Text>
          <Text style={styles.infoValue}>{alumni.graduationYear}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsContainer}>
          {alumni.skills.map((skill, index) => (
            <View key={index} style={styles.skillChip}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#E5E7EB",
    marginBottom: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: "700" as const,
    color: "#111827",
    marginBottom: 4,
  },
  position: {
    fontSize: 17,
    fontWeight: "500" as const,
    color: "#374151",
    marginBottom: 4,
  },
  company: {
    fontSize: 16,
    color: "#0066FF",
    marginBottom: 16,
  },
  metaContainer: {
    gap: 8,
    alignSelf: "stretch",
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
  },
  metaText: {
    fontSize: 15,
    color: "#6B7280",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    alignSelf: "stretch",
  },
  primaryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0066FF",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#FFFFFF",
  },
  secondaryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#0066FF",
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#0066FF",
  },
  section: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#111827",
    marginBottom: 16,
  },
  bio: {
    fontSize: 16,
    lineHeight: 24,
    color: "#374151",
  },
  infoCard: {
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#111827",
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillChip: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  skillText: {
    fontSize: 14,
    fontWeight: "500" as const,
    color: "#1E40AF",
  },
  bottomPadding: {
    height: 32,
  },
  errorText: {
    fontSize: 18,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 100,
  },
});
