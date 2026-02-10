import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";

const EmployerRegisterStep2 = () => {
  const router = useRouter();

  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [agree, setAgree] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Text style={styles.logo}>
        Day<Text style={{ color: "#FACC15" }}>Bee.lk</Text>
      </Text>
      <Text style={styles.title}>Employer Registration</Text>
      <Text style={styles.subtitle}>Create your company profile</Text>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Additional Details</Text>

        {/* Company Logo */}
        <Text style={styles.label}>Company Logo</Text>
        <View style={styles.logoRow}>
          <View style={styles.logoPlaceholder}>
            <Ionicons
              name="document-text-outline"
              size={26}
              color="#64748B"
            />
          </View>
          <TouchableOpacity style={styles.uploadBtn}>
            <Ionicons name="cloud-upload-outline" size={16} color="#1E293B" />
            <Text style={styles.uploadText}>Upload Logo</Text>
          </TouchableOpacity>
        </View>

        {/* Industry */}
        <Text style={styles.label}>Industry *</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={industry}
            onValueChange={(value) => setIndustry(value)}
          >
            <Picker.Item label="Select industry" value="" enabled={false} />
            <Picker.Item label="IT & Software" value="it" />
            <Picker.Item label="Retail" value="retail" />
            <Picker.Item label="Construction" value="construction" />
            <Picker.Item label="Hospitality" value="hospitality" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>

        {/* Website */}
        <Text style={styles.label}>Website</Text>
        <View style={styles.inputWithIcon}>
          <Ionicons name="globe-outline" size={18} color="#64748B" />
          <TextInput
            style={styles.input}
            placeholder="https://www.example.com"
            value={website}
            onChangeText={setWebsite}
          />
        </View>

        {/* Description */}
        <Text style={styles.label}>Company Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Tell job seekers about your company..."
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        {/* Terms */}
        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setAgree(!agree)}
        >
          <View style={[styles.checkbox, agree && styles.checkboxChecked]}>
            {agree && <Ionicons name="checkmark" size={14} color="#fff" />}
          </View>
          <Text style={styles.checkboxText}>
            I agree to the <Text style={styles.link}>Terms & Conditions</Text> and{" "}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </TouchableOpacity>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={16} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => router.replace("/(tabs)")}
          >
            <Text style={styles.primaryText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Already have an account?{" "}
        <Text style={styles.link} onPress={() => router.push("/LoginScreen")}>
          Sign in
        </Text>
      </Text>
    </ScrollView>
  );
};

export default EmployerRegisterStep2;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F8FAFC",
  },

  logo: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 40,
    color: "#0F172A",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 12,
  },

  subtitle: {
    textAlign: "center",
    color: "#64748B",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 14,
    marginBottom: 6,
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  logoPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },

  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },

  uploadText: {
    marginLeft: 6,
    fontSize: 13,
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
  },

  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    paddingHorizontal: 10,
  },

  input: {
    flex: 1,
    height: 44,
    paddingHorizontal: 8,
  },

  textArea: {
    height: 90,
    textAlignVertical: "top",
  },

  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 14,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#94A3B8",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  checkboxChecked: {
    backgroundColor: "#FACC15",
    borderColor: "#FACC15",
  },

  checkboxText: {
    flex: 1,
    fontSize: 12,
    color: "#334155",
  },

  link: {
    color: "#F59E0B",
    fontWeight: "600",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },

  backText: {
    marginLeft: 6,
  },

  primaryBtn: {
    backgroundColor: "#FACC15",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },

  primaryText: {
    fontWeight: "700",
    color: "#000",
  },

  footer: {
    textAlign: "center",
    marginTop: 18,
    fontSize: 13,
    color: "#64748B",
  },
});
