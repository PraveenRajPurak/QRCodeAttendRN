import { View, Text, ImageBackground, KeyboardAvoidingView, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const UserAccountSetupPage = ({ route }) => {

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [role, setRole] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [ph, setPh] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    if (route.params && route.params.ph) {
      setPh(route.params.ph);
    }
  }, [route.params]);

  const pickAvatar = async () => {

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera roll permissions are required to pick an avatar.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log("Result : ", result);
      setAvatar(result.assets[0].uri);
    }
    
  };

  const handleUserAccountSetup = async () => {
    if (fullname === '' || email === '' || password === '' || dob === '' || role === '' || ph === '') {
      Alert.alert("All fields are required", "Please fill in all fields.");
      return;
    }

    if (ph === '' || ph.length !== 10) {
      Alert.alert("Invalid Phone Number", "Please enter a valid 10-digit phone number");
      return;
    }

    console.log("User Info:", { fullname, email, password, dob, role, avatar, ph });

    const response = await axios.post('https://qrcodeattendapp.onrender.com/api/v1/user/register', {
      fullname: fullname,
      email: email,
      password: password,
      dob: dob,
      role: role,
      avatar: avatar,
      phoneNumber: ph
    })

    console.log("Response : ", response.data);

    navigation.navigate('LoginUser', { ph });


  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='height'
      keyboardShouldPersistTaps='always'
      keyboardVerticalOffset={-500}
    >
      <ImageBackground source={require('../images/login.png')} style={styles.container}>
        <Text style={{ color: 'white', fontSize: 40, bottom: 50, fontWeight: 'bold' }}>Sign Up</Text>
        <Text style={{ color: 'white', fontSize: 20, bottom: 40, fontWeight: 'bold' }}>Sign Up as Student</Text>

        <View style={styles.roundedBox}>
          <TextInput
            placeholder='Full Name'
            placeholderTextColor="#FFFFFF"
            value={fullname}
            onChangeText={setFullname}
            style={styles.input}
          />

          <TextInput
            placeholder='Email'
            placeholderTextColor="#FFFFFF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
          />

          <TextInput
            placeholder='Password'
            placeholderTextColor="#FFFFFF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          <TextInput
            placeholder='Date of Birth (YYYY-MM-DD)'
            placeholderTextColor="#FFFFFF"
            value={dob}
            onChangeText={setDob}
            style={styles.input}
          />

          <TextInput
            placeholder='Role (e.g., student)'
            placeholderTextColor="#FFFFFF"
            value={role}
            onChangeText={setRole}
            style={styles.input}
          />

          <TouchableOpacity onPress={pickAvatar} style={styles.pickAvatar}>
            <Text style={{ color: 'white' }}>{avatar ? "Avatar Selected" : "Pick Avatar"}</Text>
          </TouchableOpacity>

          <TextInput
            keyboardType='default'
            placeholder='Phone Number'
            placeholderTextColor="#FFFFFF"
            value={ph}
            onChangeText={setPh}
            editable={false}
            style={styles.input}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleUserAccountSetup}>
            <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold', alignSelf: 'center' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

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
    height: 'auto',
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 2,
    padding: 20
  },
  input: {
    color: 'white',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  pickAvatar: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center'
  },
  submitButton: {
    backgroundColor: 'orange',
    height: 60,
    borderRadius: 40,
    justifyContent: 'center',
    marginTop: 20
  }
});

export default UserAccountSetupPage;
