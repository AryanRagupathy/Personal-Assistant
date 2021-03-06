import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import { ListItem } from 'react-native-elements';

export default class ImportantWorkScreen extends React.Component{

    constructor(props) {
        super(props);
        this.state ={
            AllTasks: [],
            userId: firebase.auth().currentUser.email,
            docId:''
        }
        this.requestRef = null;
    }

    getTasks = () =>{
        this.requestRef = db.collection("tasks").where('user_id','==',this.state.userId).where('completed','==',false)
        .onSnapshot((snapshot)=>{
          
            var AllTasks = snapshot.docs.map(document => document.data());
            console.log(AllTasks)
            this.setState({
                AllTasks: AllTasks
            })
        })
    }

    componentDidMount() {
        this.getTasks()
    }

    componentWillUnmount() {
        this.requestRef();
    }

    keyExtractor=(item,index) => index.toString()

    completeTask=(taskId)=>{
        console.log(taskId);
        db.collection('tasks').where('task_id','==',taskId).get().then()
        .then((snapshot)=>{
            
            snapshot.forEach((document)=> {
                console.log("document"+document.id);
                db.collection('tasks').doc(document.id).update({
                    completed:true
                })
            })
        })       
       
    }

    renderItem = ( {item, i} ) =>{
        return (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
                <ListItem.Title style = {{ color: 'black', fontWeight: 'bold' }}>{item.task}</ListItem.Title>
                <ListItem.Subtitle>{item.time}</ListItem.Subtitle>
            </ListItem.Content>    
            <TouchableOpacity style={styles.button} onPress={()=>{
                    this.completeTask(item.task_id)
            }}>
              <Text style={{color:'#ffff'}}>Complete</Text>
            </TouchableOpacity>        
      </ListItem>
        )
      }
    
    render(){
        return(
            <View style = {{flex: 1}}>
               <MyHeader title = "Important Work" navigation = {this.props.navigation}/>
               <View style = {{flex: 1}}>
            {
                this.state.AllTasks.length === 0
                ?(
                <View style = {styles.subContainer}>
                    <Text style = {{ fontSize: 20}}>List Of All Tasks</Text>
                </View>
                )
                :(
                <FlatList
                    keyExtractor = {this.keyExtractor}
                    data = {this.state.AllTasks}
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