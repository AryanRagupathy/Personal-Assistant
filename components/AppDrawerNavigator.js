import React, { Component } from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {WorkAppTabNavigator} from './WorkAppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import {DueDatesTabNavigator} from './DueDatesTabNavigator';
import SettingsScreen from '../screens/SettingsScreen';
import CompletedDueDates from '../screens/CompletedDueDates';

export const AppDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: WorkAppTabNavigator
    },
    DueDates: {
        screen: DueDatesTabNavigator
    },
    Settings: {
        screen: SettingsScreen
    },
    CompletedDueDates: {
        screen: CompletedDueDates
    },
    },
    {contentComponent: CustomSideBarMenu},
    {initialRouteName: 'Home'}
)