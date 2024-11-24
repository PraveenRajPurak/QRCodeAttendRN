import { View, Text, KeyboardAvoidingView, FlatList, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { userContext } from '../src/Contexts/UserContext'
import axios from 'axios'
import { BottomTabUser } from '../Components/BottomTabUser'

const UserCourses = () => {

  const { user, accessToken } = useContext(userContext);

  console.log("User loaded from context: ", user);

  console.log("User access token loaded from context: ", accessToken);

  const navigation = useNavigation();

  const [courses, setCourses] = useState([]);

  const getCourseNames = async () => {

    console.log("Getting Course Names");

    const courseNames = await axios.get(`https://qrcodeattendapp.onrender.com/api/v1/student/get-courses`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      }
    );

    console.log("Courses : ", courseNames.data.data);

    setCourses(courseNames.data.data);

    if (courses.length > 0) {
      console.log("Courses loaded successfully into the state");
    }
  }

  useEffect(() => {
    const fetchData = async () => {

      await getCourseNames();
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

        <Text style={{ color: 'white', fontSize: 20, top: -80 }}>Courses</Text>

        <View style={{ height: 520, width: 330, alignItems: 'center' }}>
          <FlatList
            data={courses}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('UserClasses', { name: item.name, code: item.code, professorName: item.professorName, courseId: item._id })}>
                <ImageBackground source={require('../images/dark-green-bg.png')} style={{ height: 110, width: 300, borderRadius: 30, borderLeftWidth: 2, borderBottomWidth: 2, borderColor: '#0A6847', shadowColor: '#0A6847', shadowOffset: { width: 500, height: 500 }, shadowOpacity: 0.25, shadowRadius: 5, elevation: 5, marginBottom: 20, padding: 10 }} imageStyle={{ borderRadius: 30 }}>
                  {console.log("course Id : ", item._id)}
                  <View>
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: '320', alignSelf: 'center', top: 13 }}>
                      {item.name}
                    </Text>
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: '320', alignSelf: 'center', top: 13 }}>
                      {item.code}
                    </Text>
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: '320', alignSelf: 'center', top: 13 }}>
                      {item.professorName}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>

            )}
            keyExtractor={(item) => item.id}
            scrollEnabled={true}
          />
        </View>

        

      </View>
          
      <BottomTabUser focussedIndex={1}/>
    </KeyboardAvoidingView >
  )
}

export default UserCourses

