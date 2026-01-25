import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../constants/colors";
import { Job } from "../constants/types";
import { jobAPI } from "../scripts/api";

export default function JobDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const data = await jobAPI.getJobById(Number(id));
      setJob(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!job) {
    return (
      <View style={styles.center}>
        <Text>Job not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Job Details</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* JOB CARD */}
      <View style={styles.card}>
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.company}>{job.company}</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{job.type}</Text>
        </View>

        {/* INFO */}
        <View style={styles.row}>
          <Ionicons name="location-outline" size={18} color={COLORS.textLight} />
          <Text style={styles.meta}>{job.location}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="cash-outline" size={18} color={COLORS.success} />
          <Text style={styles.salary}>${job.salary}/hr</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="briefcase-outline" size={18} color={COLORS.textLight} />
          <Text style={styles.meta}>{job.category}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="calendar-outline" size={18} color={COLORS.textLight} />
          <Text style={styles.meta}>
            Posted on {new Date(job.postedDate).toDateString()}
          </Text>
        </View>
      </View>

      {/* DESCRIPTION */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Job Description</Text>
        <Text style={styles.description}>{job.description}</Text>
      </View>

      {/* APPLY BUTTON */}
      <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.applyText}>Apply for this Job</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },

  card: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
  },

  company: {
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: 10,
  },

  badge: {
    backgroundColor: COLORS.primary + "20",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
  },

  badgeText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  meta: {
    marginLeft: 8,
    color: COLORS.textLight,
  },

  salary: {
    marginLeft: 8,
    fontWeight: "700",
    color: COLORS.success,
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: COLORS.text,
  },

  description: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 22,
  },

  applyButton: {
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 30,
  },

  applyText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
});

export default JobDetailsScreen;
