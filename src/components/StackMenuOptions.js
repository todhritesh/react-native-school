import EntypoIcon from 'react-native-vector-icons/Entypo';
import { TouchableOpacity , View , Text , useWindowDimensions , StyleSheet , Modal } from 'react-native';
import React,{useState} from 'react'
import { useNavigation } from '@react-navigation/native';

const StackMenuOptions = () => {
    const [open,setOpen] = useState(false)
    const {height,width} = useWindowDimensions()
    const {navigate} = useNavigation()
    const styles = StyleSheet.create({
        modal:{
            position:"relative"
        },
        modalView:{
            width:width<height?(width*45)/100:(width*30)/100,
            padding:10,
            backgroundColor:"white",
            position:"absolute",
            right:30,
            top:30,
            shadowColor: "#000000",
            shadowOffset: {
            width: 0,
            height: 12,
            },
            shadowOpacity:  0.24,
            shadowRadius: 13.84,
            elevation: 27
        },
        menuItem:{
            borderBottomWidth:.5,
            borderColor:"grey",
            marginVertical:3
        },
        menuText:{
            fontSize:20,
            color:'black',
            fontWeight:"400",
            padding:3
        }
    })
  return (
      <View >
        <TouchableOpacity onPress={()=>setOpen(!open)} activeOpacity={.5} style={{marginRight:10}} >
            <EntypoIcon name="dots-three-vertical" size={20} color="black" />
        </TouchableOpacity>
        <Modal onRequestClose={()=>setOpen(false)} onDismiss={()=>setOpen(false)} transparent={true} visible={open} animationType="fade" style={styles.modal}>
            <View style={styles.modalView} >
                <TouchableOpacity onPress={()=>{setOpen(false);navigate("Dashboard")}} activeOpacity={.6} style={styles.menuItem}>
                    <Text style={styles.menuText}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setOpen(false);navigate("StudentDetailForm")}} activeOpacity={.6} style={styles.menuItem}>
                    <Text style={styles.menuText}>Student Form</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setOpen(false);navigate("ManageDetails")}} activeOpacity={.6} style={styles.menuItem}>
                    <Text style={styles.menuText}>Manage Details</Text>
                </TouchableOpacity>
            </View>
        </Modal>
      </View>
  )
}

export default StackMenuOptions