import React, { Component } from 'react';
import {StyleSheet, View, Text,TouchableOpacity} from 'react-native';
import { DrawerItems } from 'react-navigation-drawer'

import firebase from 'firebase';

export default class CustomSideBarMenu extends Component{
  render(){
    return(
      <View style = {styles.container}>
        <View style = {styles.drawer}>
          <DrawerItems {...this.props} labelStyle = {{color: '#fff'}}/>
        </View>
        <View style={styles.logOut}>
          <TouchableOpacity style = {styles.button}
          onPress = {() => {
              this.props.navigation.navigate('WelcomeScreen')
              firebase.auth().signOut()
          }}>
            <Text style = {styles.text}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F69400'
  },
  drawer: {
    flex: 0.8,
    marginTop: 50
  },
  logOut: {
    flex: 0.2,
    justifyContent: 'flex-end',
    paddingBottom: 30
  },
  button: {
    height: 30,
    padding: 20,
    width: '100%',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  }
})