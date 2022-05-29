import React, { useState } from "react";
import { Modal, StyleSheet, Text, useWindowDimensions,TouchableOpacity, View } from "react-native";
import database from "@react-native-firebase/database";

const DeletePopup = ({deletePopup,setDeletePopup}) => {
    const db = database();
  const {height, width} = useWindowDimensions();
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
        width:width<height?(width*80)/100:(width*60)/100,
    //   margin: 20,
      backgroundColor: "white",
      paddingHorizontal: 20,
      paddingVertical: 10,
    //   alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    header:{
        fontWeight:"600",
        color:'red',
        fontSize:30,
        textAlign:"left"
    },
    text:{
        color:'black',
        fontWeight:'bold',
        fontSize:20
    },
    actions:{
        flexDirection:'row',
        justifyContent:'flex-end',
        marginVertical:10
    },btn:{
        paddingHorizontal:20,
        paddingVertical:10,
        backgroundColor:'#EA2027',
        borderRadius:10
    },btnText:{
        color:"black",
        fontWeight:"bold",
        fontSize:20
    }
  });
  function handleDelete(id){
      console.log(id)
    db.ref("students/"+id).remove()
    setDeletePopup({id:"",status:false})
  }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={deletePopup.status}
        onRequestClose={() => {
          setModalVisible(!deletePopup.status);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.header}>
                Are you sure ?
            </Text>
            <Text style={styles.text}>
                Data will be permantely deleted.
            </Text>
            <View style={styles.actions}>
                <TouchableOpacity onPress={()=>setDeletePopup({id:"",status:false})} style={[styles.btn,{backgroundColor:'lightgrey',marginRight:10}]}>
                    <Text style={styles.btnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>handleDelete(deletePopup.id)} style={styles.btn}>
                    <Text style={styles.btnText}>Delete</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
    </View>
  );
};



export default DeletePopup;