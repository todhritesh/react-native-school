import { View, Text , StyleSheet , useWindowDimensions , TouchableOpacity} from 'react-native'
import React from 'react'
import AntDesignIcon from "react-native-vector-icons/AntDesign"
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons"
import EntypoIcon from "react-native-vector-icons/Entypo"
import database from "@react-native-firebase/database";

const DetailRow = ({id,name,roll,navigate,deletePopup,setDeletePopup}) => {
  const db = database()
    const {height, width} = useWindowDimensions()
    const styles = StyleSheet.create({
        container:{
            width:width<height?(width*90)/100:(width*60)/100,
            flexDirection:'row',
            alignItems:"center",
            marginVertical:5,
            borderColor:"grey",
            borderBottomWidth:1
        },
        roll:{
            color:"black",
            fontWeight:"600",
            fontSize:18,
            paddingVertical:5,
            paddingHorizontal:10
        },
        name:{
            color:"black",
            fontWeight:"600",
            fontSize:18,
            paddingVertical:5,
            paddingHorizontal:10,
            flex:1,
            marginLeft:40
        },
        actionContainer:{
            flexDirection:'row'
        },
        icons:{
            marginHorizontal:4
        }
    })

  return (
    <View style={styles.container}>
      <Text style={styles.roll}>{roll}</Text>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.actionContainer}>
          <TouchableOpacity onPress={()=>navigate("SingleDetail",id)} style={styles.icons} activeOpacity={.6} >
            <AntDesignIcon name="infocirlce" color="#008577" size={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigate("EditDetail",id)}  style={styles.icons} activeOpacity={.6} >
            <EntypoIcon name="edit" color="green" size={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>setDeletePopup({id:id,status:true})} style={styles.icons} activeOpacity={.6} >
            <MaterialIconsIcon name="delete" color="red" size={20} />
          </TouchableOpacity>
      </View>
    </View>
  )
}


export const Header = () => {
    const {height, width} = useWindowDimensions()
    const styles = StyleSheet.create({
        container:{
            width:width<height?(width*90)/100:(width*60)/100,
            flexDirection:'row',
            alignItems:"center",
            marginVertical:5,
            borderColor:"black",
            borderBottomWidth:3
        },
        roll:{
            color:"#008577",
            fontWeight:"600",
            fontSize:20,
            paddingVertical:5,
            paddingHorizontal:10
        },
        name:{
            color:"black",
            fontWeight:"600",
            fontSize:20,
            paddingVertical:5,
            paddingHorizontal:10,
            flex:1
        },
        action:{
            color:"black",
            fontWeight:"600",
            fontSize:20,
            paddingVertical:5,
            paddingHorizontal:10,
            flex:1,
            textAlign:'right'
        }
    })

  return (
    <View style={styles.container}>
      <Text style={styles.roll}>Roll no</Text>
      <Text style={styles.name}>Name</Text>
      <Text style={styles.action}>Actions</Text>
    </View>
  )
}

export default DetailRow