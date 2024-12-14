import { View, Text, ImageBackground, KeyboardAvoidingView, StyleSheet, Image, Alert } from 'react-native'
import React from 'react'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { userContext } from '../src/Contexts/UserContext'
import { studentContext } from '../src/Contexts/StudentContext'
import asyncStorage from '@react-native-async-storage/async-storage'
import { useState, useContext } from 'react'
import { StatusBar } from 'react-native'

const LoginUser = () => {

  const { user, setUser, accessToken, setAccessToken } = useContext(userContext);

  const { student, setStudent } = useContext(studentContext);

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleLogin = async() => {

    console.log("Email", email);
    console.log("password", password);

    try {

      const userInfo = await axios.post(`https://qrcodeattendapp.onrender.com/api/v1/user/login`, {
        email : email, password : password
      });

      console.log("User Info : ",userInfo.data.statusCode);

      const access_Token = userInfo.data.statusCode.accessToken;

      console.log("Access Token : ", access_Token);

      if (!userInfo) {
        Alert.alert("Invalid email or password");
      }

      //console.log("UserInfo : ", userInfo.statusCode.user);

      setUser(userInfo.data.statusCode.user);

      setAccessToken(access_Token);

      if(user){
        console.log("User set in context : ", user);
      }

      if(accessToken){
        console.log("Access Token set in context : ", accessToken);
      }

      await asyncStorage.setItem('accessToken', userInfo.data.statusCode.accessToken);

      const checkStudentAcPresence = await axios.get('https://qrcodeattendapp.onrender.com/api/v1/student//check-student-account-presence',
        { 
          headers: {
            'Authorization': `Bearer ${userInfo.data.statusCode.accessToken}`
          }
        }
      )

      const { isPresent } = checkStudentAcPresence.data

      console.log("isPresent : ", isPresent);

      const studentData = await axios.get('https://qrcodeattendapp.onrender.com/api/v1/student/get-student-data',
        { 
          headers: {
            'Authorization': `Bearer ${userInfo.data.statusCode.accessToken}`
          }
        }
      )

      setStudent(studentData.data);

      if(student) {
        console.log("Student set in context : ", student);
      }

      console.log("Student Data : ", studentData.data);

      if (userInfo && isPresent === true) {
        navigation.navigate('StudentDashboard');
      }

      if (userInfo && isPresent === false) {
        navigation.navigate('StudentAccountSetupPage');
      }
    }

    catch (error) {
      console.log(error);
    }

  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='height'
      keyboardShouldPersistTaps='always' // This should handle taps outside TextInput
      keyboardVerticalOffset={-500}
    >
      <ImageBackground source={require('../images/login.png')} style={styles.container}>

        <Text style={{ color: 'white', fontSize: 40, bottom: 50, fontWeight: 'bold' }}> Login </Text>
        <Text style={{ color: 'white', fontSize: 20, bottom: 40, fontWeight: 'bold' }}> Login as a user to track attendance </Text>

        <View style={styles.roundedBox}>

          <View style={{ color: 'white', borderWidth: 2, borderColor: 'white', borderRadius: 30, height: 60, width: 300, top: 15, left: 20, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
              keyboardType='default'
              placeholder='enter your email-id'
              placeholderTextColor="#FFFFFF"
              value={email}
              style = {{color: 'white', fontSize: 18}}
              onChangeText={(email) => setEmail(email)}
            />
          </View>

          <View style={{ color: 'white', borderWidth: 2, borderColor: 'white', borderRadius: 30, height: 60, width: 300, top: 40, left: 20, justifyContent: 'center', alignItems: 'center' }}
          >
            <TextInput
              secureTextEntry={true}
              placeholder='enter your password'
              placeholderTextColor="#FFFFFF"
              value={password}
              style = {{color: 'white', fontSize: 18}}
              onChangeText={(password) => setPassword(password)}
            />

          </View>


          <TouchableOpacity style={{ backgroundColor: 'orange', height: 60, width: 200, borderRadius: 40, textAlign: 'center', top: 80, left: 70, fontSize: 20, color: 'black' }}
            onPress={handleLogin}
          >
            <Text style={{ colorolor: 'black', fontSize: 25, fontWeight: 'bold', position: 'relative', alignSelf: 'center', bottom: -12 }}> Login </Text>
          </TouchableOpacity>

          <Text onPress={() => navigation.navigate('SignUp')} style ={{ color: 'white', fontSize: 20, top: 150, fontWeight: 'bold', textAlign: 'center' }}> Don't have an account? Signup </Text>

        </View>

      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  roundedBox: {
    top: 60,
    backgroundColor: 'transparent',
    width: 350,
    height: 300,
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 2,
  }

})

export default LoginUser