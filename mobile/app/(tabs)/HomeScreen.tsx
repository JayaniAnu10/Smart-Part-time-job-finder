import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../constants/colors";
import { jobAPI } from "../../scripts/api";
import { Job } from "../../constants/types";

export default function HomeScreen() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await jobAPI.getAllJobs();
      setJobs(data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase())
  );

  const renderJob = ({ item }: { item: Job }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/JobDetailsScreen",
          params: { id: item.id },
        })
      }
      
    >
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.type}>{item.type}</Text>
      </View>

      <Text style={styles.company}>{item.company}</Text>

      <View style={styles.row}>
        <Ionicons name="location-outline" size={16} color={COLORS.textLight} />
        <Text style={styles.meta}>{item.location}</Text>
      </View>

      <View style={styles.row}>
        <Ionicons name="cash-outline" size={16} color={COLORS.success} />
        <Text style={styles.salary}>${item.salary}/hr</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Smart Job Finder</Text>
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <Ionicons name="person-circle-outline" size={34} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={20} color={COLORS.textLight} />
        <TextInput
          placeholder="Search jobs or companies"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* Job List */}
      <FlatList
        data={filteredJobs}
        renderItem={renderJob}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.text,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  searchInput: {
    marginLeft: 8,
    fontSize: 16,
    flex: 1,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    flex: 1,
  },
  type: {
    fontSize: 12,
    color: COLORS.primary,
  },
  company: {
    fontSize: 15,
    color: COLORS.primary,
    marginVertical: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  meta: {
    marginLeft: 6,
    color: COLORS.textLight,
  },
  salary: {
    marginLeft: 6,
    fontWeight: "700",
    color: COLORS.success,
  },
});

