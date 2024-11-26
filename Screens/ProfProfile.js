import { View, Text, KeyboardAvoidingView, TouchableOpacity, Image, FlatList, ImageBackground } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ProfContext } from '../src/Contexts/ProfessorContext'
import axios from 'axios'
import { BottomTabProfessor } from '../Components/BottomTabProfessor'
import { ScrollView } from 'native-base'

const ProfProfile = () => {

  const { prof, profaccessToken } = useContext(ProfContext);

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

          <Text style={{ color: 'white', fontSize: 20, fontWeight: '300', marginTop: 40, alignSelf: 'center' }}>Your Profile</Text>

          <View style={{ borderColor: 'white', borderLeftWidth: 0.5, borderRightWidth: 0.5, borderTopWidth: 0.15, borderBottomWidth: 0.15, height: 200, width: 330, borderRadius: 40, top: 30, marginBottom: 50, alignSelf: 'center' }}>

            <Text style={{ color: 'white', fontSize: 20, fontWeight: '300', top: 20, alignSelf: 'center' }}>
              Your personal information
            </Text>

            <View style={{ borderWidth: 0.25, borderColor: 'white', height: 0, width: 250, top: 30, alignSelf: 'center', marginBottom: 8 }}></View>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '200', top: 43, alignSelf: 'center' }}>
              Name : {prof.name}
            </Text>

            <View style={{ borderWidth: 0.25, borderColor: 'white', height: 0, width: 300, top: 60, alignSelf: 'center' }}></View>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '200', top: 73, alignSelf: 'center' }}>
              Your ID : {prof.profId}
            </Text>

            <View style={{ borderWidth: 0.25, borderColor: 'white', height: 0, width: 300, top: 90, alignSelf: 'center' }}></View>

          </View>

          <Text style={{ color: '#A6AEBF', fontSize: 65, fontWeight: '900', marginTop: 40, alignSelf: 'left',opacity: 0.3 }}>
            Attendance Tracking Made
          </Text>
          <Text style={{ color: '#A6AEBF', fontSize: 65, fontWeight: '900', alignSelf: 'left',opacity: 0.3, top:-10 }}>
           Easy!
          </Text>

        </ScrollView>

      </View>

      <BottomTabProfessor focussedIndex={3} />

    </KeyboardAvoidingView>
  )
}
export default ProfProfile