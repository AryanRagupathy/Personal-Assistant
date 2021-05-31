import React, { Component} from 'react';
import {StyleSheet, View, Text,TouchableOpacity} from 'react-native';
import { DrawerItems} from 'react-navigation-drawer'
import {Avatar,Icon} from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import db from '../config'
import firebase from 'firebase';
import { RFValue } from "react-native-responsive-fontsize";

export default class CustomSideBarMenu extends Component{

  constructor(){
    super()
    this.state={
      image:'#',
      userId:firebase.auth().currentUser.email,
      name:'',
      docId:'',
    }
  }

  uploadImage=async(uri,userId)=>{
    var response = await fetch(uri)
    var blob = await response.blob();
    var ref = firebase.storage().ref().child("user_profiles/"+userId) ;
    
    return ref.put(blob).then((response)=>{
      this.fetchImage(userId)
    })

  }

  fetchImage = (userId)=>{
    var storageRef=firebase
    .storage()
    .ref()
    .child("user_profiles/"+userId)
    
    storageRef
    .getDownloadURL()
    .then((url)=>{
      this.setState({image:url})      
    })
    .catch((error) => {
      this.setState({ image: "#" });
    });
  }

  selectPicture=async()=>{
    const {cancelled,uri}=await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.All,
      allowsEditing:true,
      aspect:[4,3],
      quality:1,
    })
    if(!cancelled){
      this.uploadImage(uri,this.state.userId);
    }
  }

  getUserProfile() {
    db.collection("users")
      .where("email_id", "==", this.state.userId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            name: doc.data().first_name + " " + doc.data().last_name,
            docId: doc.id,
            image: doc.data().image,
          });
        });
      });
  }

  componentDidMount() {
    this.fetchImage(this.state.userId);
    this.getUserProfile();
  }

  render(){
    return(
      <View style={{flex:1}}>
        
        <View 
        style={{
            flex: 0.5,
            alignItems: "center",
            backgroundColor: '#ff5722',
          }}>
          <Avatar
          rounded
          icon={{name:'user', type:'font-awesome'}}
          source={{uri:this.state.image}}
          size='medium'
          onPress={()=>{
            this.selectPicture()
          }}
          containerStyle={styles.imageContainer}
          showEditButton
          />
          <Text style={{ fontWeight: "100", fontSize: 20, paddingTop: 10 }}>
            {this.state.name}
          </Text>
        </View>

        <View style={styles.drawerItemsContainer}>
          <DrawerItems {...this.props}/>
        </View>
        <View style={styles.logOutContainer}>
          <TouchableOpacity style={styles.logOutButton}
          onPress = {() => {
              this.props.navigation.navigate('WelcomeScreen')
              firebase.auth().signOut()
          }}>
            <Icon name='logout' type='ant-design' size={RFValue(20)} iconStyle={{paddingLeft:RFValue(10)}}/>
            <Text style={{fontSize:RFValue(15), fontWeight:'bold', marginLeft:RFValue(15)}}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container : {
    flex:1
  },
  drawerItemsContainer:{
    flex:0.8
  },
  logOutContainer : {
    flex:0.2,
    justifyContent:'flex-end',
    paddingBottom:30
  },
  logOutButton : {
    height:30,
    width:'100%',
    justifyContent:'center',
    padding:10
  },
  logOutText:{
    fontSize: 30,
    fontWeight:'bold'
  },
  imageContainer:{
    flex:0.75,
    width:'40%',
    height:'20%',
     marginLeft: 20,
      marginTop: 30,
      borderRadius:40,
    },
    
})
/*







  

 

 

  

  


  
}


 */