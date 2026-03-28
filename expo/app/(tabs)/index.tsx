import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Search, Filter, MapPin, Briefcase } from "lucide-react-native";
import { MOCK_ALUMNI, INDUSTRIES, GRADUATION_YEARS, LOCATIONS } from "@/mocks/alumni";
import { Alumni, AlumniFilters } from "@/types/alumni";

export default function DirectoryScreen() {
  const router = useRouter();
  const [filters, setFilters] = useState<AlumniFilters>({
    search: "",
    graduationYear: "All Years",
    industry: "All Industries",
    location: "All Locations",
  });
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const filteredAlumni = useMemo(() => {
    return MOCK_ALUMNI.filter((alumni) => {
      const matchesSearch =
        filters.search === "" ||
        alumni.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        alumni.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        alumni.currentPosition.toLowerCase().includes(filters.search.toLowerCase());

      const matchesYear =
        filters.graduationYear === "All Years" ||
        alumni.graduationYear.toString() === filters.graduationYear;

      const matchesIndustry =
        filters.industry === "All Industries" || alumni.industry === filters.industry;

      const matchesLocation =
        filters.location === "All Locations" || alumni.location === filters.location;

      return matchesSearch && matchesYear && matchesIndustry && matchesLocation;
    });
  }, [filters]);

  const renderAlumniCard = ({ item }: { item: Alumni }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/profile/${item.id}`)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.profileImage }} style={styles.avatar} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.position}>{item.currentPosition}</Text>
        <Text style={styles.company}>{item.company}</Text>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <MapPin size={14} color="#6B7280" />
            <Text style={styles.metaText}>{item.location}</Text>
          </View>
          <View style={styles.metaItem}>
            <Briefcase size={14} color="#6B7280" />
            <Text style={styles.metaText}>Class of {item.graduationYear}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFilterChip = (
    label: string,
    value: string,
    options: string[],
    onSelect: (value: string) => void
  ) => (
    <View style={styles.filterSection}>
      <Text style={styles.filterLabel}>{label}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.chip, value === option && styles.chipActive]}
            onPress={() => onSelect(option)}
          >
            <Text style={[styles.chipText, value === option && styles.chipTextActive]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Alumni Directory</Text>
        <Text style={styles.headerSubtitle}>{filteredAlumni.length} members</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, company, or role..."
            value={filters.search}
            onChangeText={(text) => setFilters({ ...filters, search: text })}
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} color={showFilters ? "#0066FF" : "#374151"} />
        </TouchableOpacity>
      </View>

      {showFilters && (
        <View style={styles.filtersContainer}>
          {renderFilterChip("Industry", filters.industry, INDUSTRIES, (value) =>
            setFilters({ ...filters, industry: value })
          )}
          {renderFilterChip("Graduation Year", filters.graduationYear, GRADUATION_YEARS, (value) =>
            setFilters({ ...filters, graduationYear: value })
          )}
          {renderFilterChip("Location", filters.location, LOCATIONS, (value) =>
            setFilters({ ...filters, location: value })
          )}
        </View>
      )}

      <FlatList
        data={filteredAlumni}
        renderItem={renderAlumniCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700" as const,
    color: "#111827",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: "#6B7280",
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    backgroundColor: "#FFFFFF",
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  filtersContainer: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  filterSection: {
    gap: 8,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: "#374151",
    paddingHorizontal: 20,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    marginLeft: 8,
  },
  chipActive: {
    backgroundColor: "#0066FF",
  },
  chipText: {
    fontSize: 14,
    fontWeight: "500" as const,
    color: "#374151",
  },
  chipTextActive: {
    color: "#FFFFFF",
  },
  listContent: {
    padding: 20,
    gap: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#E5E7EB",
  },
  cardContent: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#111827",
  },
  position: {
    fontSize: 15,
    fontWeight: "500" as const,
    color: "#374151",
  },
  company: {
    fontSize: 14,
    color: "#0066FF",
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: "row",
    gap: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 13,
    color: "#6B7280",
  },
});
