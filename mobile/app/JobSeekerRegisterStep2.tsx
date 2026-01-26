import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

const skillsList = [
  'Customer Service', 'Data Entry', 'Driving', 'Cleaning', 'Cooking',
  'Delivery', 'Sales', 'Marketing', 'IT Support', 'Teaching',
  'Accounting', 'Photography', 'Writing', 'Translation', 'Warehouse',
  'Security', 'Receptionist', 'Cashier', 'Waiter/Waitress', 'Other',
];

export default function JobSeekerRegisterStep2() {
  const [bio, setBio] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [agree, setAgree] = useState(false);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logoText}>
          Day<Text style={styles.logoHighlight}>Bee</Text>
        </Text>
        <Text style={styles.subtitle}>
          Create your profile to find part-time jobs
        </Text>
      </View>

      {/* Card */}
      <View style={styles.card}>

        {/* Profile picture */}
        <View style={styles.profilePicBox}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.profilePic}
          />
          <Text style={styles.uploadText}>Upload Photo</Text>
        </View>

        {/* Bio */}
        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Tell employers about yourself..."
          placeholderTextColor="#9CA3AF"
          multiline
          value={bio}
          onChangeText={setBio}
        />

        {/* Skills */}
        <Text style={styles.label}>
          Skills <Text style={styles.required}>*</Text>
        </Text>
        <Text style={styles.helperText}>Select at least one</Text>

        <View style={styles.skillsWrapper}>
          {skillsList.map(skill => {
            const active = selectedSkills.includes(skill);
            return (
              <TouchableOpacity
                key={skill}
                style={[styles.skillChip, active && styles.skillChipActive]}
                onPress={() => toggleSkill(skill)}
              >
                <Text style={[styles.skillText, active && styles.skillTextActive]}>
                  {skill}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Terms */}
        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setAgree(!agree)}
        >
          <View style={[styles.checkbox, agree && styles.checkboxChecked]}>
            {agree && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.termsText}>
            I agree to the <Text style={styles.link}>Terms & Conditions</Text>
          </Text>
        </TouchableOpacity>

        {/* Button */}
        <TouchableOpacity
          style={[
            styles.primaryBtn,
            (!agree || selectedSkills.length === 0) && styles.primaryBtnDisabled,
          ]}
          disabled={!agree || selectedSkills.length === 0}
        >
          <Text style={styles.primaryBtnText}>Create Account</Text>
        </TouchableOpacity>

      </View>

      {/* Footer */}
      <Text style={styles.footerText}>
        Already have an account? <Text style={styles.link}>Sign in</Text>
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 20,
  },

  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 24,
  },
  logoText: {
    fontSize: 34,
    fontWeight: '800',
    color: '#111827',
  },
  logoHighlight: {
    color: '#FDB022',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 6,
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },

  profilePicBox: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E5E7EB',
    marginBottom: 8,
  },
  uploadText: {
    color: '#FDB022',
    fontWeight: '600',
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },
  required: {
    color: '#EF4444',
  },
  helperText: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 10,
  },

  textArea: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 14,
    height: 100,
    backgroundColor: '#F9FAFB',
    marginBottom: 20,
    textAlignVertical: 'top',
  },

  skillsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  skillChip: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    margin: 4,
  },
  skillChipActive: {
    backgroundColor: '#FDB022',
    borderColor: '#FDB022',
  },
  skillText: {
    fontSize: 13,
    color: '#374151',
  },
  skillTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FDB022',
    borderColor: '#FDB022',
  },
  checkmark: {
    color: '#fff',
    fontWeight: '700',
  },
  termsText: {
    fontSize: 13,
    color: '#4B5563',
  },

  primaryBtn: {
    backgroundColor: '#FDB022',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryBtnDisabled: {
    opacity: 0.5,
  },
  primaryBtnText: {
    color: '#0d0d0d',
    fontWeight: '800',
    fontSize: 16,
  },

  footerText: {
    textAlign: 'center',
    marginTop: 24,
    color: '#6B7280',
  },
  link: {
    color: '#FDB022',
    fontWeight: '600',
  },
});
