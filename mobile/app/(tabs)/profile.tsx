import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import { COLORS } from "../../constants/colors";

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://i.pravatar.cc/150?img=12",
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Dilhara Mudannayaka</Text>
        <Text style={styles.email}>dilhara@email.com</Text>

        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>Job Seeker</Text>
        </View>
      </View>

      {/* STATS */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Applied Jobs</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Saved Jobs</Text>
        </View>
      </View>

      {/* MENU */}
      <View style={styles.menu}>
        <MenuItem
          icon="person-outline"
          title="Edit Profile"
          onPress={() => alert("Edit Profile")}
        />
        <MenuItem
          icon="briefcase-outline"
          title="My Applications"
          onPress={() => alert("My Applications")}
        />
        <MenuItem
          icon="bookmark-outline"
          title="Saved Jobs"
          onPress={() => alert("Saved Jobs")}
        />
        <MenuItem
          icon="log-out-outline"
          title="Logout"
          danger
          onPress={() => router.replace("/")}
        />
      </View>
    </ScrollView>
  );
}

/* MENU ITEM COMPONENT */
function MenuItem({
  icon,
  title,
  onPress,
  danger = false,
}: {
  icon: any;
  title: string;
  onPress: () => void;
  danger?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Ionicons
        name={icon}
        size={22}
        color={danger ? COLORS.error : COLORS.primary}
      />
      <Text
        style={[
          styles.menuText,
          danger && { color: COLORS.error },
        ]}
      >
        {title}
      </Text>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={COLORS.textLight}
      />
    </TouchableOpacity>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    alignItems: "center",
    paddingVertical: 32,
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 12,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
  },

  email: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
  },

  roleBadge: {
    marginTop: 10,
    backgroundColor: COLORS.primary + "20",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  roleText: {
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 12,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },

  statBox: {
    backgroundColor: COLORS.white,
    padding: 16,
    width: "40%",
    borderRadius: 16,
    alignItems: "center",
  },

  statNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.primary,
  },

  statLabel: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 4,
  },

  menu: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    borderRadius: 16,
    paddingVertical: 8,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  menuText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: COLORS.text,
  },
});
