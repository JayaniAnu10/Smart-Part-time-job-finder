import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';


export default function JobSeekerRegisterStep1() {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [nic, setNic] = useState('');
  const [address, setAddress] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Text style={styles.logo}>
        Day<Text style={styles.logoHighlight}>Bee</Text>.lk
      </Text>

      <Text style={styles.title}>Job Seeker Registration</Text>
      <Text style={styles.subtitle}>
        Create your profile to find part-time jobs
      </Text>

      

      <Text style={styles.sectionTitle}>Personal Information</Text>

      {/* First Name */}
      <Text style={styles.label}>First Name *</Text>
      <TextInput
        style={styles.input}
        placeholder="John"
        value={firstName}
        onChangeText={setFirstName}
      />

      {/* Last Name */}
      <Text style={styles.label}>Last Name *</Text>
      <TextInput
        style={styles.input}
        placeholder="Doe"
        value={lastName}
        onChangeText={setLastName}
      />

     {/* Gender */}
<Text style={styles.label}>Gender</Text>

<View style={styles.pickerWrapper}>
  <Picker
    selectedValue={gender}
    onValueChange={(value) => setGender(value)}
    style={styles.picker}
  >
    <Picker.Item label="Select Gender" value={null} color="#98A2B3" />
    <Picker.Item label="Male" value="male" />
    <Picker.Item label="Female" value="female" />
    <Picker.Item label="Other" value="other" />
  </Picker>
</View>


      {/* DOB */}
      <Text style={styles.label}>Date of Birth</Text>
      <TextInput
        style={styles.input}
        placeholder="mm/dd/yyyy"
        value={dob}
        onChangeText={setDob}
      />

      {/* NIC */}
      <Text style={styles.label}>NIC Number *</Text>
      <TextInput
        style={styles.input}
        placeholder="123456789V or 200012345678"
        value={nic}
        onChangeText={setNic}
      />

      {/* Address */}
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Your address"
        value={address}
        onChangeText={setAddress}
        multiline
      />

      {/* Bottom Actions */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => router.push('../JobSeekerRegisterStep2')}
        >
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },

  logo: {
    fontSize: 26,
    fontWeight: '800',
    marginTop: 30,
    textAlign: 'center',
  },
  logoHighlight: {
    color: '#FDB022',
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },

  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  stepActive: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  stepInactive: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {
    color: '#fff',
    fontWeight: '700',
  },
  stepTextInactive: {
    color: '#6B7280',
    fontWeight: '700',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
  },

  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
  },

  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },

  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },

  backText: {
    fontSize: 14,
    color: '#374151',
  },

  nextButton: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom:2,
    marginTop:-18
  },
  nextText: {
    color: '#fff',
    fontWeight: '700',
  },

  loginText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 13,
    color: '#6B7280',
  },
  loginHighlight: {
    color: '#F59E0B',
    fontWeight: '700',
  },

  pickerWrapper: {
  borderWidth: 1,
  borderColor: '#E5E7EB',
  borderRadius: 8,
  backgroundColor: '#fff',
  marginBottom: 16,
},

picker: {
  height: 50,
  width: '100%',
  
  
},

});
