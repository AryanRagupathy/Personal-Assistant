import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import { ListItem } from 'react-native-elements';

export default class DueDatesScreen extends React.Component{

    constructor() {
        super();
        this.state ={
            AllDueDates: [],
            userId: firebase.auth().currentUser.email,
        }
        this.requestRef = null;
    }

    getDueDates = () =>{
        this.requestRef = db.collection("duedates").where('user_id','==',this.state.userId)
        .onSnapshot((snapshot)=>{
          
            var AllDueDates = snapshot.docs.map(document => document.data());
            console.log(AllDueDates)
            this.setState({
                AllDueDates: AllDueDates
            })
        })
    }


    componentDidMount() {
        this.getDueDates()
    }

    componentWillUnmount() {
        this.requestRef();
    }

    keyExtractor=(item,index) => index.toString()

    renderItem = ( {item, i} ) =>{
        return (
            <ListItem key={i} bottomDivider>
                <ListItem.Content>
                    <ListItem.Title style = {{ color: 'black', fontWeight: 'bold' }}>{item.duedate}</ListItem.Title>
                    <ListItem.Subtitle>{item.submit_time}</ListItem.Subtitle>
                </ListItem.Content>    
                <TouchableOpacity style={styles.button}>
                  <Text style={{color:'#ffff'}}>View</Text>
                </TouchableOpacity>        
            </ListItem>
        )
      }
   
    render(){
        return(
            <View style = {{flex: 1}}>
               <MyHeader title = "Due Dates" navigation = {this.props.navigation}/>
               <View style = {{flex: 1}}>
            {
                this.state.AllDueDates.length === 0
                ?(
                <View style = {styles.subContainer}>
                    <Text style = {{ fontSize: 20}}>List Of All Due Dates</Text>
                </View>
                )
                :(
                <FlatList
                    keyExtractor = {this.keyExtractor}
                    data = {this.state.AllDueDates}
                    renderItem = {this.renderItem}
                />
                )
            }
            </View>

        </View>
        );
    }
}

const styles = StyleSheet.create({
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       }
    }
  })