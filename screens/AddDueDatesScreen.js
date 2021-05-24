import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';

export default class AddDueDatesScreen extends React.Component{

    constructor() {
        super();
        this.state ={
            userId: firebase.auth().currentUser.email,
            DueDate: '',
            SubmitTime: ''
        }
    }

    createUniqueId() {
        return Math.random().toString(36).substring(7)
    }


    addDueDate(DueDate,SubmitTime){
        var userId = this.state.userId
        var randomRequestId = this.createUniqueId()
        db.collection("duedates").add({
            user_id:userId,
            duedate:DueDate,
            submit_time:SubmitTime,
            task_id:randomRequestId
        })
        this.setState({
            DueDate:'',
            SubmitTime:''
        })
    }


    render(){
        return(
            <View style = {{
                flex: 1
            }}>
               <MyHeader title = "Add Due Date" navigation = {this.props.navigation}/>
               <KeyboardAvoidingView style = {styles.keyBoardStyle}>
                <TextInput
                style = {styles.formTextInput}
                placeholder = "Enter The Date"
                onChangeText = {(text) =>{
                    this.setState({
                        DueDate: text
                    })
                }}
                value = {this.state.DueDate}/>
                <TextInput
                style = {[styles.formTextInput, {height: 300}]}
                multiline
                numberOfLines = {8}
                placeholder = "Enter The Time"
                onChangeText = {(text) =>{
                    this.setState({
                        SubmitTIme: text
                    })
                }}
                value = {this.state.SubmitTIme}/>
                <TouchableOpacity
                style = {styles.button}
                onPress = {() =>{
                    this.addDueDate(this.state.DueDate, this.state.SubmitTIme)
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
  