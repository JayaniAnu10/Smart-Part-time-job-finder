import { Redirect } from "expo-router";

export default function Index() {
  // later we will check login token here
  //return <Redirect href="/LoginScreen" />;
  //return <HomeScreen />;
  //return <JobDetailsScreen />;
  //return <FirstScreen />;
  return <Redirect href="/WelcomeScreen" />;
  //return <Redirect href="/SelectRoleScreen" />;
  //return <Redirect href="/JobSeekerRegisterStep2" />;
  //return <Redirect href="/EmployerRegisterStep2" />;
}
