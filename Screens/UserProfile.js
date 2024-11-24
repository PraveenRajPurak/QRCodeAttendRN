import { View, Text, KeyboardAvoidingView, FlatList, TouchableOpacity, ImageBackground, Image, Button } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { userContext } from '../src/Contexts/UserContext'
import { BottomTabUser } from '../Components/BottomTabUser'

import axios from 'axios'

const UserProfile = () => {

  const { user, accessToken } = useContext(userContext);

  console.log("User loaded from context: ", user);

  console.log("Avatar URL : ", user.avatar)

  console.log("User access token loaded from context: ", accessToken);

  const [userplusstudent, setUserPlusStudent] = useState({});

  const navigation = useNavigation();

  let dob = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  const getUserPlusStudentData = async () => {

    console.log("Getting User and Student Data ...");

    const information = await axios.get(`https://qrcodeattendapp.onrender.com/api/v1/student/get-student-plus-user-data`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      }
    )

    console.log("Information : ", information.data);

    setUserPlusStudent(information.data.data);

    dob = new Date(information.data.data.dateOfBirth).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    if (userplusstudent) {
      console.log("User and Student Data successfully set in state : ", userplusstudent);
    }
  }

  useEffect(() => {
    const fetchData = async () => {

      await getUserPlusStudentData();
    }

    fetchData();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='height'
      keyboardShouldPersistTaps='always' // This should handle taps outside TextInput
      keyboardVerticalOffset={-500}
    >

      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a'
      }}>

        <StatusBar backgroundColor='#1a1a1a' />

        <Image source={{ uri: user.avatar }} style={{ height: 200, width: 200, borderRadius: 75, top: -80, alignSelf: 'center' }} imagestyle={{ borderRadius: 75 }} />

        <Text style={{ color: 'white', fontSize: 20, top: -75 }}>My Profile...</Text>


        <View style={{ borderColor: 'white', borderLeftWidth: 0.5, borderRightWidth: 0.5, borderTopWidth: 0.15, borderBottomWidth: 0.15, height: 400, width: 330, borderRadius: 40, top: -50, alignSelf: 'center' }}>

          <Text style={{ color: 'white', fontSize: 20, fontWeight: '300', top: 20, alignSelf: 'center' }}>
            Personal Information
          </Text>

          <View style={{ borderWidth: 0.25, borderColor: 'white', height: 0, width: 200, top: 30, alignSelf: 'center', marginBottom: 8 }}></View>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '200', top: 40, alignSelf: 'center' }}>
            Name : {userplusstudent.fullname}
          </Text>
          <View style={{ borderWidth: 0.25, borderColor: 'white', height: 0, width: 300, top: 50, alignSelf: 'center' }}></View>

          <Text style={{ color: 'white', fontSize: 18, fontWeight: '200', top: 60, alignSelf: 'center' }}>
            Email : {userplusstudent.email}
          </Text>
          <View style={{ borderWidth: 0.25, borderColor: 'white', height: 0, width: 300, top: 70, alignSelf: 'center' }}></View>

          <Text style={{ color: 'white', fontSize: 18, fontWeight: '200', top: 80, alignSelf: 'center' }}>
            Date Of Birth : {dob}
          </Text>
          <View style={{ borderWidth: 0.25, borderColor: 'white', height: 0, width: 300, top: 90, alignSelf: 'center' }}></View>

          <Text style={{ color: 'white', fontSize: 18, fontWeight: '200', top: 100, alignSelf: 'center' }}>
            Phone Number : {userplusstudent.phoneNumber}
          </Text>
          <View style={{ borderWidth: 0.25, borderColor: 'white', height: 0, width: 300, top: 110, alignSelf: 'center' }}></View>

          <Text style={{ color: 'white', fontSize: 18, fontWeight: '200', top: 120, alignSelf: 'center' }}>
            Role : {userplusstudent.role}
          </Text>
          <View style={{ borderWidth: 0.25, borderColor: 'white', height: 0, width: 300, top: 130, alignSelf: 'center' }}></View>

          <Text style={{ color: 'white', fontSize: 18, fontWeight: '200', top: 140, alignSelf: 'center' }}>
            Enrollment No : {userplusstudent.student?.enrollNo}
          </Text>
          <View style={{ borderWidth: 0.25, borderColor: 'white', height: 0, width: 300, top: 150, alignSelf: 'center' }}></View>

          <Text style={{ color: 'white', fontSize: 18, fontWeight: '200', top: 160, alignSelf: 'center' }}>
            Batch : {userplusstudent.student?.batch}
          </Text>
          <View style={{ borderWidth: 0.25, borderColor: 'white', height: 0, width: 300, top: 170, alignSelf: 'center' }}></View>

        </View>


      </View>

      <BottomTabUser focussedIndex={3}/>

    </KeyboardAvoidingView >
  )
}
export default UserProfile

