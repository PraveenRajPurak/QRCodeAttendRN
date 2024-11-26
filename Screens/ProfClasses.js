import { View, Text, KeyboardAvoidingView, FlatList, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ProfContext } from '../src/Contexts/ProfessorContext'
import { BottomTabProfessor } from '../Components/BottomTabProfessor'
import axios from 'axios'

const ProfClasses = ({ route }) => {

    const { prof, profaccessToken } = useContext(ProfContext);

    console.log("Prof loaded from context: ", prof);

    console.log("Prof access token loaded from context: ", profaccessToken);

    const navigation = useNavigation();

    const courseInfo = route.params

    const courseId = courseInfo.courseId

    console.log("Course Info : ", courseInfo);

    const [classes, setClasses] = useState([]);

    const getClasses = async () => {

        console.log("Getting Classes ...");

        const classList = await axios.post(`https://qrcodeattendapp.onrender.com/api/v1/course/get-classes`,
            {
                courseId: courseId
            },
            {
                headers: {
                    'Authorization': `Bearer ${profaccessToken}`
                },
            }
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


                <View style={{ borderColor: 'white', borderLeftWidth: 0.5, borderRightWidth: 0.5, borderTopWidth: 0.15, borderBottomWidth: 0.15, height: 150, width: 330, borderRadius: 40, top: -15, alignSelf: 'center' }}>

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


                <View style={{ height: 490, width: 330, alignItems: 'center', margin: 20 }}>
                    <FlatList
                        data={classes}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => navigation.navigate('ProfAttendance', { classId: item._id, Date: item.date, startTime: item.startTime, endTime: item.endTime, code: item.code })}>
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
                            </TouchableOpacity>

                        )}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={true}
                    />
                </View>



            </View>

            <BottomTabProfessor focussedIndex={1} />


        </KeyboardAvoidingView >
    )
}


export default ProfClasses