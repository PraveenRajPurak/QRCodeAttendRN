import { View, Text, KeyboardAvoidingView, TouchableOpacity, FlatList,ImageBackground } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { userContext } from '../src/Contexts/UserContext'
import { BottomTabUser } from '../Components/BottomTabUser'

import axios from 'axios'
import { BarCodeScanner } from 'expo-barcode-scanner';


const UserAttendanceRecord = () => {

    const { user, accessToken } = useContext(userContext);

    const navigation = useNavigation();

    const [attendances, setAttendances] = useState([]);

    const getattendances = async () => {
        const getattendanceRecord = await axios.post(`https://qrcodeattendapp.onrender.com/api/v1/user/track-self-attendance`,
            {},
            { headers: { 'Authorization': `Bearer ${accessToken}` } }
        );

        setAttendances(getattendanceRecord.data.data.attendanceRecord);

        console.log("Attendances : ", getattendanceRecord.data.data.attendanceRecord);

        if (attendances.length > 0) {
            console.log("Attendances loaded successfully into the state");
        }
    }

    useEffect(() => {
        getattendances();
    }, []);

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#1a1a1a'
            }}>
                <StatusBar backgroundColor='#1a1a1a' />

                <Text style={{ color: 'white', fontSize: 20, top: -80 }}>Attendance Record</Text>

                <View style={{ height: 520, width: 330, alignItems: 'center' }}>
                    <FlatList
                        data={attendances}
                        renderItem={({ item }) => (
                            <ImageBackground source={require('../images/dark-green-bg.png')} style={{ height: 120, width: 300, borderRadius: 30, borderLeftWidth: 2, borderBottomWidth: 2, borderColor: '#0A6847', shadowColor: '#0A6847', shadowOffset: { width: 300, height: 300 }, shadowOpacity: 0.25, shadowRadius: 5, elevation: 5, marginBottom: 20, padding: 10 }} imageStyle={{ borderRadius: 30 }}>
                                {console.log("course Id : ", item._id)}
                                <View>
                                    <Text style={{ color: 'white', fontSize: 15, fontWeight: '320', alignSelf: 'center', }}>
                                        Course : {item.courseName}
                                    </Text>
                                    <Text style={{ color: 'white', fontSize: 15, fontWeight: '320', alignSelf: 'center', }}>
                                        Total Classes : {item.totalClasses}
                                    </Text>
                                    <Text style={{ color: 'white', fontSize: 15, fontWeight: '320', alignSelf: 'center',  }}>
                                        Attended Classes : {item.attendedClassesCount}
                                    </Text>
                                    <Text style={{ color: 'white', fontSize: 15, fontWeight: '320', alignSelf: 'center',  }}>
                                        Attendance Percentage : {(item.attendancePercentage).toFixed(2)} %
                                    </Text>
                                </View>
                            </ImageBackground>
                        )}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={true}
                    />
                </View>

            </View>

            <BottomTabUser focussedIndex={2}/>

        </KeyboardAvoidingView>
    )
}
export default UserAttendanceRecord;
