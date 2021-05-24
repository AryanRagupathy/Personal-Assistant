import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import DueDatesScreen from '../screens/DueDatesScreen'
import AddDueDatesScreen from '../screens/AddDueDatesScreen';


export const DueDatesTabNavigator = createBottomTabNavigator({
  DueDatesScreen : {
    screen: DueDatesScreen,
    navigationOptions :{
     
      tabBarLabel : "Due Dates",
    }
  },
  AddDueDatesScreen: {
    screen: AddDueDatesScreen,
    navigationOptions :{
   
      tabBarLabel : "Add Due Dates",
    }
  }
});
