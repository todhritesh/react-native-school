import { View, Text , StyleSheet , useWindowDimensions , TouchableOpacity } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import database from "@react-native-firebase/database"

const SingleDetail = () => {
  const {height,width} = useWindowDimensions()
  const db = database()
  const {params:id} = useRoute()
  const [data,setData] = React.useState({})
    const styles = StyleSheet.create({
        container:{
          width:"100%",
          alignItems:'center'
        },
        card:{
          width:width<height?(width*90)/100:(width*60)/100,
          backgroundColor:"white",
          marginTop:30,
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 18,
          },
          shadowOpacity:  0.25,
          shadowRadius: 20.00,
          elevation: 24
        },
        cardBody:{
          paddingHorizontal:20,
          paddingVertical:10
        },
        label:{
          color:'black',
          fontWeight:"bold",
          fontSize:18,
          marginVertical:5,
        },
        text:{
        color:'#008577',
        fontWeight:"700",
        fontSize:18,
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
    <View style={styles.container} >
      <View style={styles.card} >
        <View style={styles.cardBody}>
          <Text style={styles.label}>Name  :  <Text style={styles.text}>{data.name}</Text></Text>
          <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:-3}}>
            <Text style={styles.label}> Roll  :  <Text style={styles.text}>{data.roll}</Text></Text>
            <Text style={[styles.label,{marginRight:50}]}>Gender  :  <Text style={styles.text}>{String(data.gender).toUpperCase()}</Text></Text>
          </View>
          <Text style={styles.label}>Date of birth  :  <Text style={styles.text}>{formattedDate(data.dob)}</Text></Text>
          <Text style={styles.label}>Education  :  <Text style={styles.text}>{data.education}</Text></Text>
          <Text style={styles.label}>Contact  :  <Text style={styles.text}>{data.contact}</Text></Text>
          <Text style={styles.label}>Email  :  <Text style={styles.text}>{data.email}</Text></Text>
          <Text style={styles.label}>Address  :  <Text style={styles.text}>{data.address}</Text></Text>
        </View>
      </View>
    </View>
  )
}

export default SingleDetail