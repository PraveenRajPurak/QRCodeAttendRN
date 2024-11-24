import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRegistry } from 'react-native';
import FrontPage from './Screens/FrontPage';
import LoginUser from './Screens/LoginUser';
import StudentDashboard from './Screens/StudentDashboard';
import UserAccountSetupPage from './Screens/UserAccountSetupPage';
import FrontPageAdmin from './Screens/FrontPageAdmin';
import UserCourses from './Screens/UserCourses';
import UserClasses from './Screens/UserClasses';
import UserProfile from './Screens/UserProfile';
import UserAttendance from './Screens/UserAttendance';
import UserAttendanceRecord from './Screens/UserAttendanceRecord';
import SignUp from './Screens/SignUp';
import LoginProfessor from './Screens/LoginProfessor';
import ProfHomePage from './Screens/ProfHomePage';
import ProfCourses from './Screens/ProfCourses';
import ProfClasses from './Screens/ProfClasses';
import ProfProfile from './Screens/ProfProfile';
import { UserProvider } from './src/Contexts/UserContext';
import { StudentProvider } from './src/Contexts/StudentContext';
import { ProfProvider } from './src/Contexts/ProfessorContext';
import { AdminProvider } from './src/Contexts/AdminContext';
import { CollegeProvider } from './src/Contexts/CollegeContext';
import { NativeBaseProvider } from 'native-base';

export default function App() {

  const Stack = createStackNavigator();

  AppRegistry.registerComponent('App', () => App);

  return (
    <NativeBaseProvider>

      <AdminProvider>
        <CollegeProvider>
          <ProfProvider>
            <UserProvider>
              <StudentProvider>
                <NavigationContainer>
                  <Stack.Navigator initialRouteName="FrontPage">
                    <Stack.Screen name="FrontPage" options={{ headerShown: false }} component={FrontPage} />
                    <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUp} />
                    <Stack.Screen name="LoginUser" options={{ headerShown: false }} component={LoginUser} />
                    <Stack.Screen name="StudentDashboard" options={{ headerShown: false }} component={StudentDashboard} />
                    <Stack.Screen name="UserAccountSetupPage" options={{ headerShown: false }} component={UserAccountSetupPage} />
                    <Stack.Screen name="UserCourses" options={{ headerShown: false }} component={UserCourses} />
                    <Stack.Screen name="UserClasses" options={{ headerShown: false }} component={UserClasses} />
                    <Stack.Screen name="UserAttendance" options={{ headerShown: false }} component={UserAttendance} />
                    <Stack.Screen name="UserAttendanceRecord" options={{ headerShown: false }} component={UserAttendanceRecord} />
                    <Stack.Screen name="UserProfile" options={{ headerShown: false }} component={UserProfile} />
                    <Stack.Screen name="FrontPageAdmin" options={{ headerShown: false }} component={FrontPageAdmin} />
                    <Stack.Screen name="LoginProfessor" options={{ headerShown: false }} component={LoginProfessor} />
                    <Stack.Screen name="ProfHomePage" options={{ headerShown: false }} component={ProfHomePage} />
                    <Stack.Screen name="ProfCourses" options={{ headerShown: false }} component={ProfCourses} />
                    <Stack.Screen name="ProfClasses" options={{ headerShown: false }} component={ProfClasses} />
                    <Stack.Screen name="ProfProfile" options={{ headerShown: false }} component={ProfProfile} />
                  </Stack.Navigator>
                </NavigationContainer>
              </StudentProvider>
            </UserProvider>
          </ProfProvider>
        </CollegeProvider>
      </AdminProvider>
    </NativeBaseProvider>
  );
}