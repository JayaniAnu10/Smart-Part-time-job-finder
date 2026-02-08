import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="WelcomeScreen" />
      <Stack.Screen name="LoginScreen" />
      <Stack.Screen name="SignupEmployer" />
      <Stack.Screen name="EmployerRegisterStep2" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
