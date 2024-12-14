import { View, Text, KeyboardAvoidingView, FlatList, TouchableOpacity, ImageBackground, StyleSheet, Image, Button, TextInput, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { CollegeContext } from '../src/Contexts/CollegeContext'
import { AdminContext } from '../src/Contexts/AdminContext'
import { BottomTabUserAdmin } from '../Components/BottomTabUserAdmin'
import axios from 'axios'
import { ScrollView } from 'native-base'
import DateTimePicker from '@react-native-community/datetimepicker';


const AdminClasses = ({ route }) => {

  const { admin, adminaccessToken } = useContext(AdminContext);

  const { college, setCollege } = useContext(CollegeContext);

  console.log("Admin : ", admin, "Admin Access Token : ", adminaccessToken);

  console.log("College : ", college);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [showClassToggler, setShowClassToggler] = useState(false);
  const [classCreationToggler, setClassCreationToggler] = useState(false);
  const [courseCode, setCourseCode] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [showStartTime, setShowStartTime] = useState(false);
  const [endTime, setEndTime] = useState(new Date());
  const [showEndTime, setShowEndTime] = useState(false);

  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShow(false);
  };

  const onChange1 = (event, selectedTime1) => {
    if (selectedTime1) {
      setStartTime(selectedTime1);
    }
    setShowStartTime(false);
  };

  const onChange2 = (event, selectedTime2) => {
    if (selectedTime2) {
      setEndTime(selectedTime2);
    }
    setShowEndTime(false);
  };

  const navigation = useNavigation();

  const courseInfo = route.params

  const courseId = courseInfo.courseId

  console.log("Course Info : ", courseInfo);

  const [classes, setClasses] = useState([]);

  const classCreation = async () => {

    console.log("Creating Class ...");

    if (date === "" || startTime === "" || endTime === "") {
      console.log("All fields are required.", "courseCode: ", courseCode, "date: ", date, "startTime: ", startTime, "endTime: ", endTime);
      Alert.alert("All fields are required.");
      return;
    }

    if (courseInfo.code === "") {
      console.log("All fields are required.", "courseCode: ", courseCode);
    }

    const formattedDate = date.toISOString().split('T')[0];
    const formattedStartTime = startTime.toISOString();
    const formattedEndTime = endTime.toISOString();

    console.log("Formatted Date : ", formattedDate, "Formatted Start Time : ", formattedStartTime, "Formatted End Time : ", formattedEndTime);

    console.log("Date : ", date, "Start Time : ", startTime, "End Time : ", endTime);

    const classList = await axios.post(`https://qrcodeattendapp.onrender.com/api/v1/class/create-class`,
      {
        courseCode: courseInfo.code,
        date: formattedDate,
        startTime: formattedStartTime,
        endTime: formattedEndTime
      },
      {
        headers: {
          'Authorization': `Bearer ${adminaccessToken}`
        },
      }
    );

    console.log("Class Creation : ", classList.data.data);

    if (classList.data.data === null) {
      Alert.alert("Class Already Exists or Class Creation Failed");
    }

    if (classList.data.data) {
      Alert.alert("Class Created Successfully");
    }

    setClassCreationToggler(!classCreationToggler);

  }

  const getClasses = async () => {

    console.log("Getting Classes ...");

    const classList = await axios.post(`https://qrcodeattendapp.onrender.com/api/v1/course/get-classes`,
      {
        courseId: courseId
      },
    );

    console.log("Classes : ", classList.data.data);

    setClasses(classList.data.data);

    if (classes.length > 0) {
      console.log("Courses loaded successfully into the state");
    }
  }

  useEffect(() => {
    const fetchData = async () => {

      await getClasses();
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


        <View style={{ borderColor: 'white', borderLeftWidth: 0.5, borderRightWidth: 0.5, borderTopWidth: 0.15, borderBottomWidth: 0.15, height: 150, width: 330, borderRadius: 40, marginTop: 40, marginBottom: 30, alignSelf: 'center' }}>

          <Text style={{ color: 'white', fontSize: 20, fontWeight: '300', top: 20, alignSelf: 'center' }}>
            Course Information
          </Text>

          <View style={{ borderWidth: 0.25, borderColor: 'white', height: 0, width: 200, top: 30, alignSelf: 'center', marginBottom: 8 }}></View>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '200', top: 43, alignSelf: 'center' }}>
            Name : {courseInfo.name}
          </Text>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '200', top: 53, alignSelf: 'center' }}>
            Code : {courseInfo.code}
          </Text>

        </View>

        <Text style={{ color: 'white', fontSize: 20 }}>Classes</Text>

        <ScrollView style={{ marginBottom: 60 }} showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps='always'>

          {
            classes.length == 0 ? <>
              <View>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '200', top: 23, alignSelf: 'center' }}>
                  No classes found
                </Text>
                <Image source={require('../images/empty-class.png')} style={{ height: 300, width: 300, top: 40, alignSelf: 'center' }} />
              </View>
            </> :
              <>
                <TouchableOpacity onPress={() => setShowClassToggler(!showClassToggler)} style={{ color: 'white', fontSize: 20, fontWeight: '200', top: 23, borderColor: 'white', borderLeftWidth: 0.5, borderRightWidth: 0.5, borderTopWidth: 0.15, borderBottomWidth: 0.15, height: 50, width: 330, borderRadius: 40, alignSelf: 'center', marginBottom: 40, textAlign: 'center', justifyContent: 'center', justifySelf: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontSize: 20 }}>
                    Show Classes
                  </Text>
                </TouchableOpacity>
                {
                  showClassToggler ?
                    <>
                      <View style={{ width: 330, alignItems: 'center', margin: 20 }}>
                        <FlatList
                          data={classes}
                          renderItem={({ item }) => (

                            <ImageBackground source={require('../images/bgblue.jpg')} style={{ height: 100, width: 300, borderRadius: 30, borderLeftWidth: 2, borderBottomWidth: 2, borderColor: '#032451', shadowColor: '#032451', shadowOffset: { width: 300, height: 300 }, shadowOpacity: 0.25, shadowRadius: 5, elevation: 5, marginBottom: 20, padding: 10 }} imageStyle={{ borderRadius: 30 }}>

                              <View>
                                <Text style={{ color: 'white', fontSize: 15, fontWeight: '320', alignSelf: 'center', top: 10 }}>
                                  {item.date}
                                </Text>
                                <Text style={{ color: 'white', fontSize: 15, fontWeight: '320', alignSelf: 'center', top: 10 }}>
                                  {item.startTime}
                                </Text>
                                <Text style={{ color: 'white', fontSize: 15, fontWeight: '320', alignSelf: 'center', top: 10 }}>
                                  {item.endTime}
                                </Text>
                              </View>
                            </ImageBackground>


                          )}
                          keyExtractor={(item) => item.id}
                          scrollEnabled={true}
                        />
                      </View>
                    </> :
                    <></>
                }
              </>
          }

          <TouchableOpacity onPress={() => {
            setClassCreationToggler(!classCreationToggler)
            setShow(false)
            setShowStartTime(false)
            setShowEndTime(false)
          }}>
            <Text style={{ color: 'white', fontSize: 20, marginTop: classes.length == 0 ? 60 : 20, alignSelf: 'center', borderColor: 'white', borderWidth: 0.7, borderRadius: 30, padding: 20, marginBottom: 20 }}>Create Course</Text>
          </TouchableOpacity>

          {
            classCreationToggler ? <>
              <View style={styles.roundedBox}>

                <TouchableOpacity onPress={() => setShow(true)} style={{ backgroundColor: 'transparent', height: 50, width: 330, borderRadius: 40, borderWidth: 0.5, borderColor: 'white', top: 20, alignSelf: 'center', marginBottom: 20, textAlign: 'center', justifyContent: 'center', justifySelf: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontSize: 20, fontWeight: '200', alignSelf: 'center' }}>
                    Pick Date
                  </Text>
                </TouchableOpacity>

                {date && <Text style={{ color: 'white', fontSize: 20, fontWeight: '200', alignSelf: 'center', top: 20, marginBottom: 20 }}>{date.toDateString()}</Text>}
                {show && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChange}
                  />
                )}

                <TouchableOpacity onPress={() => setShowStartTime(true)} style={{ backgroundColor: 'transparent', height: 50, width: 330, borderRadius: 40, borderWidth: 0.5, borderColor: 'white', top: 20, alignSelf: 'center', marginBottom: 20, textAlign: 'center', justifyContent: 'center', justifySelf: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontSize: 20, fontWeight: '200', alignSelf: 'center' }}>
                    Pick Start Time
                  </Text>
                </TouchableOpacity>
                {startTime && <Text style={{ color: 'white', fontSize: 20, fontWeight: '200', alignSelf: 'center', top: 20, marginBottom: 20 }}>{startTime.toLocaleString()}</Text>}
                {showStartTime && (
                  <DateTimePicker
                    value={startTime}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={onChange1}
                  />
                )}

                <TouchableOpacity onPress={() => setShowEndTime(true)} style={{ backgroundColor: 'transparent', height: 50, width: 330, borderRadius: 40, borderWidth: 0.5, borderColor: 'white', top: 20, alignSelf: 'center', marginBottom: 20, textAlign: 'center', justifyContent: 'center', justifySelf: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontSize: 20, fontWeight: '200', alignSelf: 'center' }}>
                    Pick End Time
                  </Text>
                </TouchableOpacity>
                {endTime && <Text style={{ color: 'white', fontSize: 20, fontWeight: '200', alignSelf: 'center', top: 20, marginBottom: 20 }}>{endTime.toLocaleString()}</Text>}
                {showEndTime && (
                  <DateTimePicker
                    value={endTime}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={onChange2}
                  />
                )}

                <TouchableOpacity style={{ backgroundColor: 'white', height: 60, width: 200, borderRadius: 40, textAlign: 'center', top: 40, left: 70, fontSize: 20, color: 'black', marginBottom: 50 }}
                  onPress={classCreation}
                >
                  <Text style={{ colorolor: 'black', fontSize: 25, fontWeight: 'bold', position: 'relative', alignSelf: 'center', bottom: -12 }}> Create Class </Text>
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

export default AdminClasses

const styles = StyleSheet.create({})