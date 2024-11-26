import { View, Text, KeyboardAvoidingView, TouchableOpacity, Image, FlatList, ImageBackground } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ProfContext } from '../src/Contexts/ProfessorContext'
import axios from 'axios'
import { BottomTabProfessor } from '../Components/BottomTabProfessor'
import { ScrollView } from 'native-base'

const ProfTodaysList = () => {

    const { prof, profaccessToken } = useContext(ProfContext);

    const navigation = useNavigation();

    const [classes, setClasses] = useState([])

    async function getClasses() {
        try {
            const classes_ = await axios.get(`https://qrcodeattendapp.onrender.com/api/v1/class/get-classes-of-today`,
                { headers: { 'Authorization': `Bearer ${profaccessToken}` } }
            );

            console.log("Classes : ", classes_.data.data);

            setClasses(classes_.data.data);

            if (classes.length > 0) {
                console.log("Courses loaded successfully into the state");
            }

            else {
                console.log("Courses not loaded into the state");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getClasses();
    }, [])
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

                    <Text style={{ color: 'white', fontSize: 20,  marginTop: 50, alignSelf: 'center' }}>Today's Classes</Text>

                    <View style={{ height: '100%', alignItems: 'center', marginTop: 40, marginBottom: 50 }}>
                        <FlatList
                            data={classes}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => navigation.navigate('ProfAttendance', { classId: item.classInfo._id, Date: item.classInfo.date, startTime: item.classInfo.startTime, endTime: item.classInfo.endTime, code: item.classInfo.code })}>
                                    <ImageBackground source={require('../images/bgblue.jpg')} style={{ height: 140, width: 330, borderRadius: 30, borderLeftWidth: 2, borderBottomWidth: 2, borderColor: '#032451', shadowColor: '#032451', shadowOffset: { width: 300, height: 300 }, shadowOpacity: 0.25, shadowRadius: 5, elevation: 5, marginBottom: 20, padding: 10 }} imageStyle={{ borderRadius: 30 }}>

                                        <View>
                                            <Text style={{ color: 'white', fontSize: 15, fontWeight: '320', alignSelf: 'center', top: 10 }}>
                                                {item.classInfo.date}
                                            </Text>
                                            <Text style={{ color: 'white', fontSize: 15, fontWeight: '320', alignSelf: 'center', top: 10 }}>
                                                {item.classInfo.startTime}
                                            </Text>
                                            <Text style={{ color: 'white', fontSize: 15, fontWeight: '320', alignSelf: 'center', top: 10 }}>
                                                {item.classInfo.endTime}
                                            </Text>
                                            <Text style={{ color: 'white', fontSize: 15, fontWeight: '320', alignSelf: 'center', top: 10 }}>
                                                {item.classInfo.status}
                                            </Text>
                                            <Text style={{ color: 'white', fontSize: 15, fontWeight: '320', alignSelf: 'center', top: 10 }}>
                                                {item.name}
                                            </Text>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>

                            )}
                            keyExtractor={(item) => item.id}
                            scrollEnabled={true}
                        />
                    </View>

                </ScrollView>

            </View>

            <BottomTabProfessor focussedIndex={2} />

        </KeyboardAvoidingView>
    )
}

export default ProfTodaysList