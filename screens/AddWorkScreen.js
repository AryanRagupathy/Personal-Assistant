import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';

export default class AddWorkScreen extends React.Component{

    constructor(props) {
        super(props);
        this.state ={
            userId: firebase.auth().currentUser.email,
            task: '',
            time: ''
        }
    }

    createUniqueId() {
        return Math.random().toString(36).substring(7)
    }


    addTask(task,time){
        var userId = this.state.userId
        var randomRequestId = this.createUniqueId()
        db.collection("tasks").add({
            user_id:userId,
            task:task,
            time:time,
            task_id:randomRequestId,
            completed:false
        })
        this.setState({
            task:'',
            time:''
        })
    }


    render(){
        return(
            <View style = {{
                flex: 1
            }}>
               <MyHeader title = "Add Work" navigation = {this.props.navigation}/>
               <KeyboardAvoidingView style = {styles.keyBoardStyle}>
                <TextInput
                style = {styles.formTextInput}
                placeholder = "Enter Your Work"
                onChangeText = {(text) =>{
                    this.setState({
                        task: text
                    })
                }}
                value = {this.state.task}/>
                <TextInput
                style = {[styles.formTextInput, {height: 300}]}
                multiline
                numberOfLines = {8}
                placeholder = "Enter The Time"
                onChangeText = {(text) =>{
                    this.setState({
                        time: text
                    })
                }}
                value = {this.state.time}/>
                <TouchableOpacity
                style = {styles.button}
                onPress = {() =>{
                    this.addTask(this.state.task, this.state.time)
                }}>
                    <Text>Request</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    keyBoardStyle : {
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
      },
    }
  )
  