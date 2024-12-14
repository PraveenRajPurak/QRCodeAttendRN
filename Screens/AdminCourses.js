import { View, Text, KeyboardAvoidingView, FlatList, TouchableOpacity, ImageBackground, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AdminContext } from '../src/Contexts/AdminContext'
import { CollegeContext } from '../src/Contexts/CollegeContext'
import axios from 'axios'
import { BottomTabUserAdmin } from '../Components/BottomTabUserAdmin'
import { ScrollView } from 'native-base'

const AdminCourses = () => {
  const { admin, adminaccessToken } = useContext(AdminContext);

  console.log("Admin : ", admin, "Admin Access Token : ", adminaccessToken);

  const { college, setCollege } = useContext(CollegeContext);

  console.log("College : ", college);

  const [name, setName] = useState("");

  const [code, setCode] = useState("");

  const [profId, setProfId] = useState("");

  const navigation = useNavigation();

  const [courses, setCourses] = useState([]);

  const [courseCreationToggler, setCourseCreationToggler] = useState(false);

  const courseCreation = async () => {

    console.log("Course Creation");

    if (name === "" || code === "" || profId === "") {
      console.log("All fields are required.", "name: ", name, "code: ", code, "profId: ", profId);
      Alert.alert("All fields are required.");
      return;
    }

    const courseCreation = await axios.post(`https://qrcodeattendapp.onrender.com/api/v1/course/setup-course`, {
      name: name, code: code, profId: profId
    },
      {
        headers: {
          'Authorization': `Bearer ${adminaccessToken}`
        }
      }
    );

    console.log("Course Creation : ", courseCreation.data.course);

    if (courseCreation.data.course) {
      Alert.alert("Course Created Successfully");
    }

    setCourseCreationToggler(!courseCreationToggler);

    setName("");

    setCode("");

    setProfId("");

    await getCourseNames();
  }

  const getCourseNames = async () => {

    console.log("Getting Course Names");

    const courseNames = await axios.post(`https://qrcodeattendapp.onrender.com/api/v1/college/courses-in-a-college`,
      {
        collegeId: college[0]._id
      }
      ,
      {

        headers: {
          'Authorization': `Bearer ${adminaccessToken}`
        },

      }
    );

    console.log("Course Names : ", courseNames.data.data);

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
      keyboardShouldPersistTaps='always'
      keyboardVerticalOffset={-500}
    >

      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a'
      }}>

        <Text style={{ color: 'white', fontSize: 20, marginTop: 50, alignSelf: 'center' }}>Courses</Text>


        <ScrollView style={{ marginTop: 10, marginBottom: 60 }} showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps='always'
        >

          <StatusBar backgroundColor='#1a1a1a' />


          <View style={{ width: 330, alignItems: 'center', marginTop: 50, marginBottom: 50 }}>
            <FlatList
              data={courses}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate('AdminClasses', { name: item.name, code: item.code, courseId: item._id })}>
                  <ImageBackground source={require('../images/bgblue.jpg')} style={{ height: 130, width: 300, borderRadius: 30, borderLeftWidth: 2, borderBottomWidth: 2, borderColor: '#032451', shadowColor: '#032451', shadowOffset: { width: 500, height: 500 }, shadowOpacity: 0.25, shadowRadius: 5, elevation: 5, marginBottom: 20, padding: 10 }} imageStyle={{ borderRadius: 30 }}>
                    {console.log("course Id : ", item._id)}
                    <View>
                      <Text style={{ color: 'white', fontSize: 20, fontWeight: '400', alignSelf: 'center', top: 15 }}>
                        {item.name}
                      </Text>
                      <Text style={{ color: 'white', fontSize: 18, fontWeight: '400', alignSelf: 'center', top: 18 }}>
                        {item.code}
                      </Text>

                      {
                        item.professors.map((prof) => {
                          return (
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: '400', alignSelf: 'center', top: 22 }}>
                              {prof.name} ({prof.profId})
                            </Text>
                          )
                        })
                      }
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps='always'
            />
          </View>

          <TouchableOpacity onPress={() => setCourseCreationToggler(!courseCreationToggler)}>
            <Text style={{ color: 'white', fontSize: 20, marginTop: 0, alignSelf: 'center', borderColor: 'white', borderWidth: 0.7, borderRadius: 30, padding: 20, marginBottom: 20 }}>Create Course</Text>
          </TouchableOpacity>

          {
            courseCreationToggler ? <>
              <View style={styles.roundedBox}>

                <View style={{ color: 'white', borderWidth: 2, borderColor: 'white', borderRadius: 30, height: 60, width: 300, top: 15, left: 20, justifyContent: 'center', alignItems: 'center' }}>
                  <TextInput
                    keyboardType='default'
                    placeholder='enter course name'
                    placeholderTextColor="#FFFFFF"
                    value={name}
                    style={{ color: 'white', fontSize: 18 }}
                    onChangeText={(name) => setName(name)}
                  />
                </View>

                <View style={{ color: 'white', borderWidth: 2, borderColor: 'white', borderRadius: 30, height: 60, width: 300, top: 40, left: 20, justifyContent: 'center', alignItems: 'center' }}
                >
                  <TextInput
                    secureTextEntry={true}
                    placeholder='enter course code'
                    placeholderTextColor="#FFFFFF"
                    value={code}
                    style={{ color: 'white', fontSize: 18 }}
                    onChangeText={(code) => setCode(code)}
                  />

                </View>
                <View style={{ color: 'white', borderWidth: 2, borderColor: 'white', borderRadius: 30, height: 60, width: 300, top: 70, left: 20, justifyContent: 'center', alignItems: 'center' }}
                >
                  <TextInput
                    secureTextEntry={true}
                    placeholder='enter professor ID'
                    placeholderTextColor="#FFFFFF"
                    value={profId}
                    style={{ color: 'white', fontSize: 18 }}
                    onChangeText={(profId) => setProfId(profId)}
                  />

                </View>

                <TouchableOpacity style={{ backgroundColor: 'white', height: 60, width: 200, borderRadius: 40, textAlign: 'center', top: 100, left: 70, fontSize: 20, color: 'black' }}
                  onPress={courseCreation}
                >
                  <Text style={{ colorolor: 'black', fontSize: 25, fontWeight: 'bold', position: 'relative', alignSelf: 'center', bottom: -12 }}> Create Course </Text>
                </TouchableOpacity>

              </View>
            </>
              :
              <></>
          }

        </ScrollView>

      </View>

      <BottomTabUserAdmin focussedIndex={1} />
    </KeyboardAvoidingView >
  )
}

export default AdminCourses

const styles = StyleSheet.create({

  roundedBox: {
    backgroundColor: 'transparent',
    width: 350,
    height: 320,
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 0.7,
    marginBottom: 40
  }
})