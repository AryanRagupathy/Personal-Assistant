import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ImportantWorkScreen from '../screens/ImportantWorkScreen'
import AddWorkScreen from '../screens/AddWorkScreen';


export const WorkAppTabNavigator = createBottomTabNavigator({
  ImportantWork : {
    screen: ImportantWorkScreen,
    navigationOptions :{
     
      tabBarLabel : "Important Work",
    }
  },
  AddWork: {
    screen: AddWorkScreen,
    navigationOptions :{
   
      tabBarLabel : "Add Work",
    }
  }
});
