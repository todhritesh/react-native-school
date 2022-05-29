import { View, Text , StyleSheet , useWindowDimensions , FlatList , TouchableOpacity } from 'react-native'
import React from 'react'
import { useRoute , useNavigation } from '@react-navigation/native'
import database from "@react-native-firebase/database"
import AndDesignIcon from "react-native-vector-icons/AntDesign"

const Dashboard = () => {
  const {navigate} = useNavigation()

  const {height,width} = useWindowDimensions()
  const db = database()
  const {params:id} = useRoute()
  const [data,setData] = React.useState({})
    const styles = StyleSheet.create({
        container:{
          width:width,
          height:height,
          alignItems:'center'
        },
        card:{
          width:width<height?(width*75)/100:(width*60)/100,
          backgroundColor:"white",
          marginTop:30,
          marginBottom:10,
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity:  0.21,
          shadowRadius: 8.19,
          elevation: 11
        },
        cardBody:{
          paddingHorizontal:20,
          paddingVertical:10
        },
        label:{
          color:'black',
          fontWeight:"600",
          fontSize:30,
          marginVertical:5,
        },
        text:{
        color:'#008577',
        fontWeight:"500",
        fontSize:50,
      }
    })
  function getData(){
    const data = db.ref("students/"+id).once("value",snap=>{
      setData(snap.val())
    })
  }
  React.useEffect(()=>{
    getData()
  },[])
  function formattedDate(data) {
    const d = new Date(data)
    return [d.getDate(), d.getMonth()+1, d.getFullYear()]
        .map(n => n < 10 ? `0${n}` : `${n}`).join('/');
  }
  return (
    <FlatList
    ListHeaderComponent={()=>(
      <View style={styles.container} >
      <View style={styles.card} >
        {/* <TouchableOpacity activeOpacity={.6}> */}
          <View style={styles.cardBody}>
            <Text style={styles.label}>Total Students </Text>
            <Text style={styles.text}>345</Text>
          </View>
        {/* </TouchableOpacity> */}
      </View>
      <View style={styles.card} >
        <TouchableOpacity onPress={()=>navigate("StudentDetailForm")} activeOpacity={.6}>
          <View style={styles.cardBody}>
            <Text style={styles.label}>Add Students </Text>
            <Text style={[styles.text,{paddingVertical:4}]}>
              <AndDesignIcon name='form' size={65} color="#008577" />
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.card} >
        <TouchableOpacity onPress={()=>navigate("ManageDetails")} activeOpacity={.6}>
          <View style={styles.cardBody}>
            <Text style={styles.label}>Manage Students </Text>
            <Text style={[styles.text,{paddingVertical:4}]}>
              <AndDesignIcon name='setting' size={65} color="#008577" />
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    )}
    />
  )
}

export default Dashboard