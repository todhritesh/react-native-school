import { View, Text , FlatList , StyleSheet } from 'react-native'
import React,{useState} from 'react'
import DetailRow, { Header } from '../../components/DetailRow'
import database from "@react-native-firebase/database"
import { useNavigation } from '@react-navigation/native'
import DeletePopup from '../../components/DeletePopup'

const ManageDetails = () => {
  const [deletePopup,setDeletePopup] = useState({id:"",status:false});
  const {navigate} = useNavigation()
  const [data,setData] = useState([])
  const db = database().ref("students");
  const styles = StyleSheet.create({
    container:{
      alignItems:'center'
    }
  })
  function getData(){
    db.on("value",snap=>{
      let result = [];
      snap.forEach(item=>{
        result.push({...item.val(),id:item.key})
      })
      setData(result);
    })
  }
  React.useEffect(()=>{
    getData()
  },[])
  return (
    <>
    <View style={styles.container}>
    <Header/>
    </View>
    <FlatList
      data={data}
      renderItem={({item})=>(
        <View style={styles.container}>
         <DetailRow deletePopup={deletePopup} setDeletePopup={setDeletePopup} navigate={navigate} key={item.id} roll={item.roll} id={item.id} name={item.name}  />
        </View>
      )}
      />
      <DeletePopup deletePopup={deletePopup} setDeletePopup={setDeletePopup}/>
      </>
  )
}

export default ManageDetails