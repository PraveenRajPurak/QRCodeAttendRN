import { View, Text, ImageBackground, KeyboardAvoidingView, StyleSheet, Image, Alert, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { AdminContext } from '../src/Contexts/AdminContext'
import { CollegeContext } from '../src/Contexts/CollegeContext'
import asyncStorage from '@react-native-async-storage/async-storage'
import { useState, useContext } from 'react'
import { StatusBar } from 'react-native'

const LoginAdmin = () => {

    const { admin, setAdmin, adminaccessToken, setAdminAccessToken } = useContext(AdminContext);

    const { college, setCollege } = useContext(CollegeContext);
  
    const [email, setEmail] = useState('');
  
    const [password, setPassword] = useState('');
  
    const navigation = useNavigation();
  
    const handleLogin = async() => {
  
      console.log("Email", email);
      console.log("password", password);
  
      try {
  
        const userInfo = await axios.post(`https://qrcodeattendapp.onrender.com/api/v1/owner/login`, {
          email : email, password : password
        });
  
        console.log("Admin Info : ", userInfo.data.statusCode);
  
        const access_Token = userInfo.data.statusCode.owneraccessToken;
  
        console.log("Access Token : ", access_Token);
  
        if (!userInfo) {
          Alert.alert("Invalid email or password");
        }
  
        console.log("UserInfo : ", userInfo.data.statusCode.owner);
  
        setAdmin(userInfo.data.statusCode.owner);
  
        setAdminAccessToken(access_Token);
  
        if(admin){
          console.log("Admin set in context : ", admin);
        }
  
        if(adminaccessToken){
          console.log("Admin Access Token set in context : ", adminaccessToken);
        }
  
        await asyncStorage.setItem('accessToken', userInfo.data.statusCode.owneraccessToken);
  
        const checkCollegeAcPresence = await axios.get('https://qrcodeattendapp.onrender.com/api/v1/college/get-college',
          { 
            headers: {
              'Authorization': `Bearer ${userInfo.data.statusCode.owneraccessToken}`
            }
          }
        )
  
        if(checkCollegeAcPresence.data.data === null) {
          navigation.navigate('CreateCollege');
        }

        setCollege(checkCollegeAcPresence.data.data);
  
        if(college) {
          console.log("College set in context : ", college);
        }

        console.log("College", checkCollegeAcPresence.data.data);
    
        if (checkCollegeAcPresence.data.data !== null) {
          navigation.navigate('AdminDashboard');
        }
      }
  
      catch (error) {
        console.log(error);
      }
  
    }
  
    return (
     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
           <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" keyboardVerticalOffset={-500}>
             <ImageBackground source={require('../images/login.png')} style={styles.container}>
               <Text style={{ color: 'white', fontSize: 40, bottom: 50, fontWeight: 'bold' }}>Login</Text>
               <Text style={styles.subtitle}>Login as admin to track your college</Text>
     
               <View style={styles.roundedBox}>
                 <View style={[styles.inputContainer, { marginBottom: 20 }]}>
                   <TextInput
                     keyboardType="default"
                     placeholder="enter your email"
                     placeholderTextColor="#FFFFFF"
                     value={email}
                     style={styles.input}
                     onChangeText={(email) => setEmail(email)}
                   />
                 </View>
     
                 <View style={[styles.inputContainer, { marginBottom: 40 }]}>
                   <TextInput
                     secureTextEntry={true}
                     placeholder="enter your password"
                     placeholderTextColor="#FFFFFF"
                     value={password}
                     style={styles.input}
                     onChangeText={(password) => setPassword(password)}
                   />
                 </View>
     
                 <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                   <Text style={styles.loginButtonText}>Login</Text>
                 </TouchableOpacity>
               </View>
             </ImageBackground>
           </KeyboardAvoidingView>
         </TouchableWithoutFeedback>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    subtitle: {
      color: 'white',
      fontSize: 20,
      bottom: 40,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    roundedBox: {
      top: 60,
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      width: 350,
      borderRadius: 30,
      borderColor: 'white',
      borderWidth: 2,
      paddingTop: 20,
      paddingBottom: 20,
    },
    inputContainer: {
      borderWidth: 2,
      borderColor: 'white',
      borderRadius: 30,
      height: 60,
      width: 300,
      top: 15,
      left: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      color: 'white',
      fontSize: 18,
    },
    loginButton: {
      backgroundColor: 'orange',
      padding: 10,
      width: 200,
      borderRadius: 40,
      textAlign: 'center',
      left: 70,
      fontSize: 20,
      color: 'black',
    },
    loginButtonText: {
      color: 'black',
      fontSize: 25,
      fontWeight: 'bold',
      position: 'relative',
      alignSelf: 'center',
    },
  });
  

export default LoginAdmin