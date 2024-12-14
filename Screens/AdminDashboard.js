import { View, Text } from 'react-native'
import { KeyboardAvoidingView, FlatList, TouchableOpacity } from 'react-native'
import { StatusBar } from 'react-native'
import React from 'react'
import { BottomTabUserAdmin } from '../Components/BottomTabUserAdmin'
import axios from 'axios'
import { AdminContext } from '../src/Contexts/AdminContext'
import { CollegeContext } from '../src/Contexts/CollegeContext'
import { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const AdminDashboard = () => {
    const { admin, adminaccessToken } = useContext(AdminContext);

    console.log("Admin : ", admin, "Admin Access Token : ", adminaccessToken);

    const { college, setCollege } = useContext(CollegeContext);

    console.log("College : ", college);

    const navigation = useNavigation();

    const [courses, setCourses] = useState([]);

    const [name, setname] = useState("");

    function nameshortener(name) {
        name = name.toLowerCase();
        let name1 = name.split(" ");
        let name2 = name1[0];
        console.log("Original name : ", name, "Shortened name : ", name2);
        return name2;
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

                <StatusBar backgroundColor='#1a1a1a' />

                <Text style={{ color: 'white', fontSize: 20, top: -20 }}>Admin Dashboard</Text>

                <View style={{ borderColor: 'white', borderLeftWidth: 0.5, borderRightWidth: 0.5, borderTopWidth: 0.15, borderBottomWidth: 0.15, height: 320, width: 330, borderRadius: 40, top: 10, alignSelf: 'center' }}>

                    <Text style={{ color: 'white', fontSize: 20, fontWeight: '300', top: 20, alignSelf: 'center' }}>
                        College Information
                    </Text>

                    <View style={{ borderWidth: 0.25, borderColor: 'white', height: 0, width: 200, top: 30, alignSelf: 'center', marginBottom: 8 }}></View>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '200', top: 43, alignSelf: 'center' }}>
                        Name : {college[0].name}
                    </Text>

                    <View style={{ borderWidth: 0.25, borderColor: 'white', height: 0, width: 300, top: 60, alignSelf: 'center' }}></View>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '200', top: 73, alignSelf: 'center' }}>
                        Location : {college[0].location}
                    </Text>

                    <View style={{ borderWidth: 0.25, borderColor: 'white', height: 0, width: 300, top: 90, alignSelf: 'center' }}></View>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '200', top: 103, alignSelf: 'center' }}>
                        Website : {college[0].website}
                    </Text>

                    <View style={{ borderWidth: 0.25, borderColor: 'white', height: 0, width: 300, top: 120, alignSelf: 'center' }}></View>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '200', top: 133, alignSelf: 'center' }}>
                        Official Email-Id : {college[0].officeEmailId}
                    </Text>

                    <View style={{ borderWidth: 0.5, borderColor: 'white', height: 0, width: 300, top: 150, alignSelf: 'center' }}></View>


                </View>

                <View style={{ height: 320, width: 330, borderRadius: 40, top: 15, alignSelf: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: '500', top: 20, alignSelf: 'center' }}> Courses Taught </Text>

                    <FlatList
                        data={courses}
                        renderItem={({ item }) => (
                            <>
                                <View style={{ height: 50, marginBottom: 8 }}>
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


            <BottomTabUserAdmin focussedIndex={0} />


        </KeyboardAvoidingView>
    )
}


export default AdminDashboard