import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, StatusBar, TouchableOpacity, Animated, Pressable } from 'react-native';
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, Flex, Button, AddIcon, MinusIcon, useColorModeValue } from "native-base";
import { TabView, SceneMap } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';

const FirstRoute = () => <Center flex={1} my="4"></Center>;

const SecondRoute = () => <Center flex={1} my="4"></Center>;

const ThirdRoute = () => <Center flex={1} my="4"></Center>;

const FourthRoute = () => <Center flex={1} my="4"></Center>;

const CustomTabComponent = (route, isFocused) => (
  <Box alignItems="center" flexDirection="column">
    <Image source={route.iconSource} alt='' style={{ width: 30, height: 30, opacity: { isFocused } ? 1 : 0.9 }} />
    <Text style={{ fontWeight: { isFocused } ? 'bold' : 'normal', color: { isFocused } ? 'white' : 'gray' }}>{route.name}</Text>
  </Box>
);

const initialLayout = {
  width: Dimensions.get('window').width
};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute
});

export function BottomTabProfessor({ focussedIndex }) {
  const [index, setIndex] = React.useState(focussedIndex);
  const [routes] = React.useState([{
    key: 'first',
    title: 'Tab 1',
    iconSource: require('../assets/1.png'),
    navigTo: 'ProfHomePage',
    name: 'Dashboard'
  }, {
    key: 'second',
    title: 'Tab 2',
    iconSource: require('../assets/2.png'),
    navigTo: 'ProfCourses',
    name: 'Courses'
  }, {
    key: 'third',
    title: 'Tab 3',
    iconSource: require('../assets/3.png'),
    navigTo: 'ProfTodaysList',
    name: 'Classes'
  }, {
    key: 'fourth',
    title: 'Tab 4',
    iconSource: require('../assets/4.png'),
    navigTo: 'ProfProfile',
    name: 'Profile'
  }]);

  const renderTabBar = props => {
    const navigation = useNavigation();
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return <Box flexDirection="row" >
      {props.navigationState.routes.map((route, i) => {
        const opacity = props.position.interpolate({
          inputRange,
          outputRange: inputRange.map(inputIndex => inputIndex === i ? 1 : 0.5)
        });
        const isFocused = index === i;

        const color = index === i ? useColorModeValue('#000', '#e6e5e5') : useColorModeValue('#1f2937', '#a1a1aa');
        const borderColor = index === i ? 'cyan.500' : useColorModeValue('coolGray.200', 'gray.400');
        return <Box borderBottomWidth={0} borderColor={borderColor} flex={1} alignItems="center" p="0" cursor="pointer" height={12} style={{ opacity: isFocused ? 1 : 0.4 }}>
          < Pressable onPress={() => {
            console.log(i);
            navigation.navigate(route.navigTo);
          }} >
            <CustomTabComponent iconSource={route.iconSource} name={route.name} isFocused={isFocused} />

          </Pressable>
        </Box>;
      })}
    </Box>;
  };

  return <TabView navigationState={{
    index,
    routes
  }} renderScene={renderScene} renderTabBar={renderTabBar} onIndexChange={setIndex} initialLayout={initialLayout} style={{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 51,
    backgroundColor: 'transparent',
  }}
  />;

}
