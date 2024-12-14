import { View, Text, ImageBackground, KeyboardAvoidingView, StyleSheet, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const FrontPage = () => {

  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='height'
      keyboardShouldPersistTaps='always' // This should handle taps outside TextInput
      keyboardVerticalOffset={-500}
    >
      <ImageBackground source={require('../images/frontpage.png')} style = {styles.container}>

      <Text style = {{color: 'white', fontSize: 30, position: 'relative', bottom : 70, fontWeight: 'bold'}}> QRCodeAttend </Text>
      <Text style = {{color: 'white', fontSize: 20, position: 'relative', bottom : 70}}> All-in-one Attendance Solution </Text>
      <Text style = {{color: 'white', fontSize: 20, position: 'relative', bottom : -40}}> Select role to proceed </Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('LoginUser')}>
          
          <View style={styles.acButton}>
          <Image source={require('../images/fr01.gif')} style = {{height: 95, width: 95,bottom: 10}}/>
          <Text style = {{color: 'black', fontSize: 50, fontWeight: 'bold', position: 'relative', alignSelf: 'center', bottom: 6, left : 45}}>User</Text>
          </View>

        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation.navigate('FrontPageAdmin')}>
          
          <View style={styles.acButton}>
          <Image source={require('../images/fr02.gif')} style = {{height: 95, width: 95,bottom: 10, left : 12}}/>
          <Text style = {{color: 'black', fontSize: 50, fontWeight: 'bold', position: 'relative', alignSelf: 'center', bottom: 6, left : 40}}>Admin</Text>
          </View>

        </TouchableOpacity>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({

  container : {
    height: '120%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  acButton: {
    flexDirection: 'row',
    top: 70,
    padding: 20,
    width: 350,
    height: 120,
    borderRadius: 10,
    borderColor : 'black',
    backgroundColor: 'white',
    marginBottom: 40,
    elevation:5,
    opacity:1
  }

})

export default FrontPage