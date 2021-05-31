import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView} from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";

import db from '../config';
import firebase from 'firebase';



export default class WelcomeScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      emailId:'',
      password:'',
      firstName:'',
      lastName:'',
      address:'',
      contact:'',
      confirmPassword:'',
      
      isModalVisible:'false',
    }
  }

  userSignUp = (emailId, password,confirmPassword) =>{
   if(password !== confirmPassword){
       return Alert.alert("password doesn't match\nCheck your password.")
   }else{
     firebase.auth().createUserWithEmailAndPassword(emailId, password)
     .then(()=>{
       db.collection('users').add({
         first_name:this.state.firstName,
         last_name:this.state.lastName,
         contact:this.state.contact,
         email_id:this.state.emailId,
         address:this.state.address,
        
       })
       return  Alert.alert(
            'User Added Successfully',
            '',
            [
              {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
            ]
        );
     })
     .catch((error)=> {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       return Alert.alert(errorMessage)
     });
   }
 }

userLogin = (emailId, password)=>{
   firebase.auth().signInWithEmailAndPassword(emailId, password)
   .then(()=>{
     this.props.navigation.navigate('ImportantWork')
   })
   .catch((error)=> {
     var errorCode = error.code;
     var errorMessage = error.message;
     return Alert.alert(errorMessage)
   })
 }

showModal = ()=>{
  return(
  <Modal
    animationType="slide"
    transparent={true}
    visible={this.state.isModalVisible}
   

    >
    
      <ScrollView style={styles.scrollview}>
        <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
          <View style={styles.signupView}>
            <Text style={styles.signupText}> SIGN UP </Text>
          </View>
          <View style={{ flex: 0.95 }}>
            <Text style={styles.label}>First Name </Text>
            <TextInput
              style={styles.formTextInput}
              placeholder ={"First Name"}
              maxLength ={8}
              onChangeText={(text)=>{
                this.setState({
                  firstName: text
                })
              }}
            />
            <Text style={styles.label}>Last Name </Text>
            <TextInput
              style={styles.formTextInput}
              placeholder ={"Last Name"}
              maxLength ={8}
              onChangeText={(text)=>{
                this.setState({
                  lastName: text
                })
              }}
            />
            <Text style={styles.label}>Contact</Text>
            <TextInput
              style={styles.formTextInput}
              placeholder ={"Contact"}
              maxLength ={10}
              keyboardType={'numeric'}
              onChangeText={(text)=>{
                this.setState({
                  contact: text
                })
              }}
            />
            <Text style={styles.label}>Address </Text>
            <TextInput
              style={styles.formTextInput}
              placeholder ={"Address"}
              multiline = {true}
              onChangeText={(text)=>{
                this.setState({
                  address: text
                })
              }}
            />
            <Text style={styles.label}>Email </Text>
            <TextInput
              style={styles.formTextInput}
              placeholder ={"Email"}
              keyboardType ={'email-address'}
              onChangeText={(text)=>{
                this.setState({
                  emailId: text
                })
              }}
            />
            <Text style={styles.label}>Password </Text>
            <TextInput
              style={styles.formTextInput}
              placeholder ={"Password"}
              secureTextEntry = {true}
              onChangeText={(text)=>{
                this.setState({
                  password: text
                })
              }}
            />
            <Text style={styles.label}>Confirm Password </Text>
            <TextInput
              style={styles.formTextInput}
              placeholder ={"Confirm Password"}
              secureTextEntry = {true}
              onChangeText={(text)=>{
                this.setState({
                  confirmPassword: text
                })
              }}
          />
         </View>

        <View style={{ flex: 0.2, alignItems: "center" }}>         
          <TouchableOpacity
            style={styles.registerButton}
            onPress={()=>
              this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
            }
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>        
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={()=>this.setState({"isModalVisible":false})}
          >
          <Text style={{color:'#ff5722',fontSize:RFValue(20)}}>Cancel</Text>
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
      </ScrollView>
    
  </Modal>
)
}
  render(){
    return(
      <View style={styles.container}>
        <View style={{justifyContent: 'center',alignItems: 'center'}}>

        </View>
          {
            this.showModal()
          }
        <View style={{justifyContent:'center', alignItems:'center'}}>
          
          <Text style={styles.title}>Personal Assistant</Text>
        </View>
        <View style={{ flex: 0.45 }}>
          <View style={styles.TextInput}>
            <TextInput
            style={styles.loginBox}
            placeholder="abc@example.com"
            keyboardType ='email-address'
            onChangeText={(text)=>{
              this.setState({
                emailId: text
              })
            }}
          />
          <TextInput
          style={styles.loginBox}
          secureTextEntry = {true}
          placeholder="enter Password"
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
        </View>
        <View style={{ flex: 0.5, alignItems: "center" }}>
        <TouchableOpacity
           style={[styles.button,{marginBottom:20, marginTop:20}]}
           onPress = {()=>{
             this.userLogin(this.state.emailId, this.state.password)
           }}
           >
           <Text style={styles.buttonText}>Login</Text>
         </TouchableOpacity>

         <TouchableOpacity
           style={styles.button}
           onPress={()=>this.setState({ isModalVisible:true})}
           >
           <Text style={styles.buttonText}>SignUp</Text>
         </TouchableOpacity>
         </View>
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
   flex:1,
   backgroundColor: "#6fc0b8",
   alignItems: 'center',
   justifyContent: 'center'
 },
 profileContainer:{
   flex:1,
   justifyContent:'center',
   alignItems:'center',
 },
 title :{
   fontSize:RFValue(40),
   fontWeight:'300',
   paddingBottom:30,
   color : '#ff3d00'
 },
 loginBox:{
  width: RFValue(300),
    height: RFValue(50),
    borderWidth: RFValue(2),
    borderColor: "#ffffff",
    fontSize: RFValue(20),
    borderRadius: RFValue(20),
    padding:RFValue(10),
    marginTop:RFValue(25)
 },
 KeyboardAvoidingView:{
   flex:1,
   justifyContent:'center',
   alignItems:'center'
 },
 modalTitle :{
   justifyContent:'center',
   alignSelf:'center',
   fontSize:30,
   color:'#ff5722',
   margin:50
 },
 modalContainer:{
   flex:1,
   borderRadius:20,
   justifyContent:'center',
   alignItems:'center',
   backgroundColor:"#ffff",
   marginRight:30,
   marginLeft : 30,
   marginTop:80,
   marginBottom:80,
 },
 formTextInput:{
  width: RFValue(300),
  height: RFValue(45),
  padding: RFValue(10),
  borderWidth: 1,
  borderRadius: 20,
  borderColor: "grey",
  paddingBottom: RFValue(10),
  marginLeft: RFValue(20),
  marginBottom: RFValue(14),
  padding:10
 },
 registerButton:{
   width: "75%",
    height: RFValue(50),
    marginTop: RFValue(20),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(20),
    backgroundColor: "#32867d",
    shadowColor: "#000",
    padding:RFValue(15),
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: RFValue(10)
 },
 registerButtonText:{
  fontSize: RFValue(40),
  fontWeight: "bold",
  color: "#fff"
 },
 cancelButton:{
   width:RFValue(200),
   height:RFValue(30),
   justifyContent:'center',
   alignItems:'center',
   marginTop:5,
   fontSize: RFValue(30),
   fontWeight: "bold",
   color: "#32867d",
   marginTop: RFValue(10)
 },

 button:{
  width: "80%",
  height: RFValue(50),
  justifyContent: "center",
  alignItems: "center",
  borderRadius: RFValue(25),
  backgroundColor: "#fff",
  shadowColor: "#000",
  marginBottom: RFValue(10),
  shadowOffset: {
    width: 0,
    height: 8
  },
  shadowOpacity: 0.3,
  shadowRadius: 10.32,
  elevation: 16
 },
 buttonText:{
  color: "#32867d",
  fontWeight: "200",
  fontSize: RFValue(20)
 },
 scrollview: {
  flex: 1,
  backgroundColor: "#fff"
},
signupView: {
  flex: 0.05,
  justifyContent: "center",
  alignItems: "center"
},
signupText: {
  fontSize: RFValue(20),
  fontWeight: "bold",
  color: "#32867d"
},
label: {
  fontSize: RFValue(13),
  color: "#717D7E",
  fontWeight: "bold",
  paddingLeft: RFValue(10),
  marginLeft: RFValue(20)
},
})
