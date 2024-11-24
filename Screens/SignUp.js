import { View, Text, ImageBackground, KeyboardAvoidingView, StyleSheet, Image, Alert } from 'react-native'
import React from 'react'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { useState, useContext } from 'react'

const SignUp = () => {

    const [ph, setPh] = useState('');

    const navigation = useNavigation();

    const handleSignUp = async () => {

        console.log("phone", ph);

        if (ph.length === 10) {
            navigation.navigate('UserAccountSetupPage', { ph: ph });
        }

        else {
            Alert.alert("Invalid Phone Number", "Please enter a valid 10-digit phone number");
        }

    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior='height'
            keyboardShouldPersistTaps='always' // This should handle taps outside TextInput
            keyboardVerticalOffset={-500}
        >
            <ImageBackground source={require('../images/login.png')} style={styles.container}>

                <Text style={{ color: 'white', fontSize: 40, bottom: 50, fontWeight: 'bold' }}> Sign Up </Text>
                <Text style={{ color: 'white', fontSize: 20, bottom: 40, fontWeight: 'bold' }}> Sign Up as Student </Text>

                <View style={styles.roundedBox}>

                    <View style={{ color: 'white', borderWidth: 2, borderColor: 'white', borderRadius: 30, height: 60, width: 300, top: 15, left: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <TextInput
                            keyboardType='default'
                            placeholder='enter your phone no'
                            placeholderTextColor="white"
                            style={{ color: 'white', fontSize: 18}}
                            value={ph}
                            onChangeText={(ph) => setPh(ph)}
                        />
                    </View>


                    <TouchableOpacity style={{ backgroundColor: 'orange', height: 60, width: 200, borderRadius: 40, textAlign: 'center', top: 40, left: 70, fontSize: 20, color: 'black' }}
                        onPress={handleSignUp}
                    >
                        <Text style={{ colorolor: 'black', fontSize: 25, fontWeight: 'bold', position: 'relative', alignSelf: 'center', bottom: -12 }}> Login </Text>
                    </TouchableOpacity>

                </View>

                <Text style={{ color: 'white', fontSize: 18, position: 'relative', bottom: 40, top: 0, }}>Already have an account?<Text style={{ color: 'orange', fontSize: 18, fontWeight: 'bold' }} onPress={() => navigation.navigate('LoginUser')}> Login </Text></Text>


            </ImageBackground>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    roundedBox: {
        top: 60,
        backgroundColor: 'transparent',
        width: 350,
        height: 250,
        borderRadius: 30,
        borderColor: 'white',
        borderWidth: 2,
    }

})

export default SignUp