import { View, Text, KeyboardAvoidingView, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { userContext } from '../src/Contexts/UserContext'
import { studentContext } from '../src/Contexts/StudentContext'
import axios from 'axios'
import { BottomTabUser } from '../Components/BottomTabUser'

const StudentDashboard = () => {

  const { user, accessToken } = useContext(userContext);

  const { student } = useContext(studentContext);

  console.log("User loaded from context: ", user);

  console.log("User access token loaded from context: ", accessToken);

  console.log("Student loaded from context: ", student);

  console.log("Student's Id : ", student.data._id);

  const navigation = useNavigation();

  const [courses, setCourses] = useState([]);

  const [collegeInfo, setCollegeInfo] = useState({});

  const getCourseNames = async () => {

    console.log("Getting Course Names");

    const courseNames = await axios.post(`https://qrcodeattendapp.onrender.com/api/v1/student/get-course-names`,
      {
        student_id: student.data._id
      }
      , {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      }
    );

    console.log("Course Names : ", courseNames.data.data);

    setCourses(courseNames.data.data);

    if (courses.length > 0) {
      console.log("Courses loaded successfully into the state");
    }
  }

  const getInstituteInfo = async () => {

    console.log("Getting Institute Info");

    const instituteInformation = await axios.post(`https://qrcodeattendapp.onrender.com/api/v1/student/institute-information`,
      {
        student_id: student.data._id
      }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }
    );

    console.log("Institute Information : ", instituteInformation.data.data);

    setCollegeInfo(instituteInformation.data.data);

    if (collegeInfo) {
      console.log("Institute Info loaded successfully into the state : ", collegeInfo);
    }
  }

  useEffect(() => {
    const fetchData = async () => {

      await getCourseNames();
      await getInstituteInfo();
    }
  
    fetchData();
  }, []);


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='height'
      keyboardShouldPersistTaps='always'
      keyboardVerticalOffset={-500}
    >

      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a'
      }}>

        <StatusBar backgroundColor='#1a1a1a' />

        <Text style={{ color: 'white', fontSize: 20, top: -40 }}>Student Dashboard</Text>

        <View style={{ borderColor: 'white', borderLeftWidth: 0.5, borderRightWidth: 0.5, borderTopWidth: 0.15, borderBottomWidth: 0.15, height: 320, width: 330, borderRadius: 40, top: -10, alignSelf: 'center' }}>

          <Text style={{ color: 'white', fontSize: 20, fontWeight: '300', top: 20, alignSelf: 'center' }}>
            College Information
          </Text>

          <View style={{ borderWidth: 0.25, borderColor: 'white', height: 0, width: 200, top: 30, alignSelf: 'center', marginBottom: 8 }}></View>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '200', top: 43, alignSelf: 'center' }}>
            Name : {collegeInfo.name}
          </Text>

          <View style={{ borderWidth: 0.25, borderColor: 'white', height: 0, width: 300, top: 60, alignSelf: 'center' }}></View>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '200', top: 73, alignSelf: 'center' }}>
            Location : {collegeInfo.location}
          </Text>

          <View style={{ borderWidth: 0.25, borderColor: 'white', height: 0, width: 300, top: 90, alignSelf: 'center' }}></View>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '200', top: 103, alignSelf: 'center' }}>
            Website : {collegeInfo.website}
          </Text>

          <View style={{ borderWidth: 0.25, borderColor: 'white', height: 0, width: 300, top: 120, alignSelf: 'center' }}></View>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '200', top: 133, alignSelf: 'center' }}>
            Official Email-Id : support@{collegeInfo.name}.ac.in
          </Text>

          <View style={{ borderWidth: 0.5, borderColor: 'white', height: 0, width: 300, top: 150, alignSelf: 'center' }}></View>


        </View>

        <View style={{ height: 320, width: 330, borderRadius: 40, }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: '300', top: 20, alignSelf: 'center' }}> Course Enrolled in : </Text>

          <FlatList
            data={courses}
            renderItem={({ item }) => (
              <>
                <View style={{ height: 50 }}>
                  <Text style={{ color: 'white', fontSize: 18, fontWeight: '200', top: 30, alignSelf: 'center' }}>
                    {item.name}
                  </Text>
                </View>
                <View style={{ borderWidth: 0.2, borderColor: 'white', height: 0, width: 300, alignSelf: 'center', top: 10 }}></View>
              </>

            )}
            keyExtractor={(item) => item.id}
            scrollEnabled={true}
          />
        </View>

      </View>


        <BottomTabUser focussedIndex={0}/>
    

    </KeyboardAvoidingView>
  )
}

export default StudentDashboard