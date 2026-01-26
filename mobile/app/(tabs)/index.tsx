import { Redirect } from "expo-router";
import HomeScreen from "./HomeScreen";
import JobDetailsScreen from "../JobDetailsScreen";

export default function Index() {
  // later we will check login token here
  //return <Redirect href="/LoginScreen" />;
  //return <HomeScreen />;
  //return <JobDetailsScreen />;
  //return <FirstScreen />;
  //return <Redirect href="/WelcomeScreen" />;
  return <Redirect href="/SelectRoleScreen" />;
  //return <Redirect href="/JobSeekerRegisterStep2" />;
}

