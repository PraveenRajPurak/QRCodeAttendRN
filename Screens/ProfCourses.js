import { View, Text, KeyboardAvoidingView, FlatList, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ProfContext } from '../src/Contexts/ProfessorContext'
import axios from 'axios'
import { BottomTabProfessor } from '../Components/BottomTabProfessor'

const ProfCourses = () => {

  const { prof, profaccessToken } = useContext(ProfContext);

  console.log("Prof loaded from context: ", prof);

  console.log("Prof access token loaded from context: ", profaccessToken);

  const navigation = useNavigation();

  const [courses, setCourses] = useState([]);

  const getCourseNames = async () => {

    console.log("Getting Course Names");

    const courseNames = await axios.get(`https://qrcodeattendapp.onrender.com/api/v1/professor/courses-taught-by-professor`,
      {
        headers: {
          'Authorization': `Bearer ${profaccessToken}`
        },
      }
    );

    console.log("Courses : ", courseNames.data.statusCode);

    setCourses(courseNames.data.statusCode);

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

        <View style={{ height: 520, width: 330, alignItems: 'center', top: -20 }}>
          <FlatList
            data={courses}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('ProfClasses', { name: item.name, code: item.code, courseId: item._id })}>
                <ImageBackground source={require('../images/bgblue.jpg')} style={{ height: 110, width: 300, borderRadius: 30, borderLeftWidth: 2, borderBottomWidth: 2, borderColor: '#032451', shadowColor: '#032451', shadowOffset: { width: 500, height: 500 }, shadowOpacity: 0.25, shadowRadius: 5, elevation: 5, marginBottom: 20, padding: 10 }} imageStyle={{ borderRadius: 30 }}>
                  {console.log("course Id : ", item._id)}
                  <View>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: '500', alignSelf: 'center', top: 15 }}>
                      {item.name}
                    </Text>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '500', alignSelf: 'center', top: 22 }}>
                      {item.code}
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
          
      <BottomTabProfessor focussedIndex={1}/>
    </KeyboardAvoidingView >
  )
}

export default ProfCourses