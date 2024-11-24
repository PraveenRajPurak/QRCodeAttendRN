import { View, Text, ImageBackground, KeyboardAvoidingView, StyleSheet, Image, Alert } from 'react-native'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { ProfContext } from '../src/Contexts/ProfessorContext'
import { studentContext } from '../src/Contexts/StudentContext'
import asyncStorage from '@react-native-async-storage/async-storage'
import { useState, useContext } from 'react'
import { StatusBar } from 'react-native'

const LoginProfessor = () => {

  const { prof, setProf, profaccessToken, setProfAccessToken } = useContext(ProfContext);

  const [profId, setProfId] = useState('');

  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {

    console.log("Professor Id : ", profId);
    console.log("password : ", password);

    try {

      const ProfInfo = await axios.post(`https://qrcodeattendapp.onrender.com/api/v1/professor/login`, {
        profId: profId, password: password
      });

      console.log("Prof Info : ", ProfInfo.data.statusCode);

      const access_Token = ProfInfo.data.statusCode.profaccessToken;

      console.log("Prof Access Token : ", access_Token);

      if (!ProfInfo) {
        Alert.alert("Invalid email or password");
      }

      setProf(ProfInfo.data.statusCode.prof);

      setProfAccessToken(access_Token);

      if (prof) {
        console.log("Prof set in context : ", prof);
      }

      if (profaccessToken) {
        console.log("Prof Access Token set in context : ", profaccessToken);
      }

      await asyncStorage.setItem('profaccessToken', ProfInfo.data.statusCode.profaccessToken);

      if (ProfInfo) {
        navigation.navigate('ProfHomePage');
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
          <Text style={styles.subtitle}>Login as a Faculty to track attendances of your courses</Text>

          <View style={styles.roundedBox}>
            <View style={[styles.inputContainer, { marginBottom: 20 }]}>
              <TextInput
                keyboardType="default"
                placeholder="enter your prof-id"
                placeholderTextColor="#FFFFFF"
                value={profId}
                style={styles.input}
                onChangeText={(profId) => setProfId(profId)}
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
  );
};

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

export default LoginProfessor