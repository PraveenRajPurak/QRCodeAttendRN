import { View, Text, ImageBackground, KeyboardAvoidingView, StyleSheet, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const FrontPageAdmin = () => {
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='height'
      keyboardShouldPersistTaps='always' 
      keyboardVerticalOffset={-500}
    >
      <ImageBackground source={require('../images/frontpage.png')} style = {styles.container}>

      <Text style = {{color: 'white', fontSize: 35, position: 'relative', bottom : 50, fontWeight: 'bold', textAlign: 'center'}}> Welcome to the admin section </Text>
      <Text style = {{color: 'white', fontSize: 20, position: 'relative', bottom : -40}}> Select role to proceed </Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('LoginProfessor')}>
          
          <View style={styles.acButton}>
          <Image source={require('../images/teacher.png')} style = {{height: 90, width: 90,bottom: 6}}/>
          <Text style = {{color: 'black', fontSize: 30, fontWeight: 'bold', position: 'relative', alignSelf: 'center', bottom: 6, left : 50}}>Faculty</Text>
          </View>

        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation.navigate('LoginAdmin')}>
          
          <View style={styles.acButton}>
          <Image source={require('../images/admission.png')} style = {{height: 90, width: 90,bottom: 6, left : 12}}/>
          <Text style = {{color: 'black', fontSize: 30, fontWeight: 'bold', position: 'relative', alignSelf: 'center', bottom: 6, left : 25}}>College Admin</Text>
          </View>

        </TouchableOpacity>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

export default FrontPageAdmin

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center'
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