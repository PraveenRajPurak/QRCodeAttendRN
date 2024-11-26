import { View, Text, KeyboardAvoidingView, TouchableOpacity, Image, FlatList, ImageBackground } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ProfContext } from '../src/Contexts/ProfessorContext'
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios'
import { BottomTabProfessor } from '../Components/BottomTabProfessor'
import { ScrollView } from 'native-base'

const ProfAttendance = ({ route }) => {
  const { prof, profaccessToken } = useContext(ProfContext);

  const navigation = useNavigation();

  const classInfo = route.params
  const classId = classInfo.classId

  let datee = new Date(classInfo.Date).toLocaleDateString();

  const [classSta, setClassSta] = useState({});
  const [qrtoggler, setQrtoggler] = useState(false);
  const [topvalue, setTopvalue] = useState(-320);
  const [classrecords, setClassRecords] = useState([]);
  const [showStudentRecord, setShowStudentRecord] = useState(false);

  const getClassInfo = async () => {
    const classStatus = await axios.post(`https://qrcodeattendapp.onrender.com/api/v1/attendance/create-attendance`,
      { classId },
      { headers: { 'Authorization': `Bearer ${profaccessToken}` } }
    );

    console.log(classStatus.data.data);

    setClassSta(classStatus.data.data);

    if (classSta) {
      console.log("Class Status successfully set in state : ", classSta);
      setQrtoggler(true);
      setTopvalue(-40);
    }

    else {
      console.log("Class Status not set in state");
    }
  }

  const getAllAttendanceRecord = async () => {

    const classRecords = await axios.post(`https://qrcodeattendapp.onrender.com/api/v1/class/get-attendance`,
      { classId }
    );

    console.log("Class Records : ", classRecords.data.data);

    setClassRecords(classRecords.data.data)

    if (classrecords.length != 0) {
      console.log("Students data set in the state. ", classrecords);
      setShowStudentRecord(true);
    }

    else {
      console.log("Records could not be set.");
    }
  }

  useEffect(() => {
    getClassInfo();
  }, []);

  useEffect(() => {
    getAllAttendanceRecord();
    const interval = setInterval(() => {
      getAllAttendanceRecord();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a'
      }}>
        <ScrollView>
          <StatusBar backgroundColor='#1a1a1a' />
          <View style={{ borderColor: 'white', borderWidth: 0.5, height: 180, width: 330, borderRadius: 40, top: 50, marginBottom: 90 }}>
            <Text style={{ color: 'white', fontSize: 20, top: 20, alignSelf: 'center' }}>Class Information</Text>
            <Text style={{ color: 'white', fontSize: 18, top: 43, alignSelf: 'center' }}>Date: {datee}</Text>
            <Text style={{ color: 'white', fontSize: 18, top: 53, alignSelf: 'center' }}>
              Duration: {classInfo.startTime} - {classInfo.endTime}
            </Text>
            <Text style={{ color: 'white', fontSize: 18, top: 63, alignSelf: 'center' }}>Status: {classSta.status}</Text>
          </View>

          <View style={{ left: 35 }}>
            <QRCode value={classSta.code} size={250} />
          </View>

          <TouchableOpacity
            onPress={() => { setShowStudentRecord(!showStudentRecord) }}
          >
            <View style={{
              flexDirection: 'row',
              top: 40,
              padding: 10,
              alignSelf:'center',
              width: 300,
              height: 50,
              borderRadius: 10,
              backgroundColor: '#8EA3A6',
              marginBottom: 40,
              elevation: 5,
              alignContent: 'center',
              alignItems: 'center',
              opacity: 0.5,
            }}>
              <Text style={{margin: 0, color: 'white', textAlign: 'center', alignSelf: 'center', textAlignVertical: "center", left: 50, fontSize: 16, fontWeight: 400}}>Show attendance record</Text>
            </View>
          </TouchableOpacity>

          {
            showStudentRecord && classrecords.length != 0 ?
              <>
                <View style={{ height: '100%', alignItems: 'center', margin: 20 }}>
                  <FlatList
                    data={classrecords}
                    renderItem={({ item }) => (
                      <ImageBackground source={require('../images/bgblue.jpg')} style={{  height: 60, width: 300, borderRadius: 30, borderLeftWidth: 2, borderBottomWidth: 2, borderColor: '#032451', shadowColor: '#032451', shadowOffset: { width: 300, height: 300 }, shadowOpacity: 0.25, shadowRadius: 5, elevation: 5, marginBottom: 20, padding: 10 }} imageStyle={{ borderRadius: 30 }}>
                        <View style={{flex: 1, flexDirection: 'row', alignSelf: ' center', left: 60}}>
                          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600', alignSelf: 'center' }}>
                            {item.enrollmentNumber}
                          </Text>
                          <Text style={{ color: 'white', fontSize: 15, fontWeight: '600', alignSelf: 'center' }}>
                            :  Present
                          </Text>
                        </View>
                      </ImageBackground>
                    )}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={true}
                  />
                </View>
              </>
              :
              <>
              </>
          }

        </ScrollView>

      </View>

      <BottomTabProfessor focussedIndex={1} />

    </KeyboardAvoidingView>
  )
}

export default ProfAttendance