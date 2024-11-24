import { View, Text, KeyboardAvoidingView, TouchableOpacity,Image } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { userContext } from '../src/Contexts/UserContext'
import { BottomTabUser } from '../Components/BottomTabUser'

import axios from 'axios'
import { BarCodeScanner } from 'expo-barcode-scanner';

const UserAttendance = ({ route }) => {

    const { user, accessToken } = useContext(userContext);

    const navigation = useNavigation();

    const classInfo = route.params
    const classId = classInfo.classId

    let datee = new Date(classInfo.Date).toLocaleDateString();

    const [classSta, setClassSta] = useState("");
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [data, setData] = useState('');

    const getClassInfo = async () => {
        const classStatus = await axios.post(`https://qrcodeattendapp.onrender.com/api/v1/class/get-attendance-of-a-student`,
            { classId },
            { headers: { 'Authorization': `Bearer ${accessToken}` } }
        );

        setClassSta(classStatus.data.data);
    }

    const markAttendance = async (code) => {
        if (!code) {
            console.error("No code provided for marking attendance");
            return;
        }

        try {
            const markingAttendance = await axios.post(
                `https://qrcodeattendapp.onrender.com/api/v1/attendance/mark-attendance`, 
                { code, classId },
                { headers: { 'Authorization': `Bearer ${accessToken}` } }
            );
            console.log("Attendance marked successfully: ", markingAttendance.data);
            setClassSta("Present"); 
        } catch (error) {
            console.error("Error marking attendance: ", error);
        }
    };

    useEffect(() => {
        getClassInfo();
    }, []); 

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#1a1a1a'
            }}>
                <StatusBar backgroundColor='#1a1a1a' />
                <View style={{ borderColor: 'white', borderWidth: 0.5, height: 180, width: 330, borderRadius: 40, top: -230 }}>
                    <Text style={{ color: 'white', fontSize: 20, top: 20, alignSelf: 'center' }}>Class Information</Text>
                    <Text style={{ color: 'white', fontSize: 18, top: 43, alignSelf: 'center' }}>Date: {datee}</Text>
                    <Text style={{ color: 'white', fontSize: 18, top: 53, alignSelf: 'center' }}>
                        Duration: {classInfo.startTime} - {classInfo.endTime}
                    </Text>
                    <Text style={{ color: 'white', fontSize: 18, top: 63, alignSelf: 'center' }}>Status: {classSta}</Text>
                </View>

                {classSta === "Absent" && !scanned && (
                    <BarCodeScanner
                        onBarCodeScanned={async (result) => {
                            setScanned(true);
                            setData(result.data); 
                            if (result.data) {
                                await markAttendance(result.data);
                            } else {
                                console.error("QR code data is not available");
                            }
                        }}
                        style={{ width: 300, height: 400 }}
                    />
                )}

                {classSta === "Present" && (
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop : -210 }}>
                        <Text style={{ color: 'white', fontSize: 20, top : 40 }}>Attendance already Marked!</Text>
                        <Image source={require('../assets/present.gif')} style={{ width: 200, height: 200, top : 80 }} />
                    </View>
                )}

                

            </View>

            <BottomTabUser focussedIndex={1}/>

        </KeyboardAvoidingView>
    )
}
export default UserAttendance;
