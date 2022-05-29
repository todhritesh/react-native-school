import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity , View , Text , TextInput , useWindowDimensions , StyleSheet , Modal } from 'react-native';
import React,{useState} from 'react'

const CustomSearch = () => {
    const [open,setOpen] = useState(false)
    const {height,width} = useWindowDimensions()
    const styles = StyleSheet.create({
        modal:{
            position:"relative"
        },
        modalView:{
            width:width<height?(width*80)/100:(width*60)/100,
            padding:10,
            backgroundColor:"white",
            position:"absolute",
            left:50,
            right:50,
            top:50,
            shadowColor: "#000000",
            shadowOffset: {
            width: 0,
            height: 12,
            },
            shadowOpacity:  0.24,
            shadowRadius: 13.84,
            elevation: 27,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-around'
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
        },input:{
            borderWidth:2,
            borderColor:'grey',
            height:40,
            paddingLeft:10,
            width:"70%"

        }
    })
  return (
      <View >
        <TouchableOpacity onPress={()=>setOpen(!open)} activeOpacity={.5} style={{marginRight:10}} >
            <FontAwesomeIcon name="search" size={20} color="#008577" />
        </TouchableOpacity>
        <Modal onRequestClose={()=>setOpen(false)} onDismiss={()=>setOpen(false)} transparent={false} visible={open} animationType="slide" style={styles.modal}>
            <View style={styles.modalView} >
                <TextInput placeholder='Search here ...' style={styles.input} />
                <TouchableOpacity activeOpacity={.7} onPress={()=>{setOpen(false);}}>
                     <AntDesignIcon name="checkcircle" size={29} color="#008577"/>
                </TouchableOpacity>
                <TouchableOpacity  activeOpacity={.7} onPress={()=>{setOpen(false);}}>
                    <EntypoIcon name="circle-with-cross" size={35} color="red"/>
                </TouchableOpacity>
            </View>
        </Modal>
      </View>
  )
}

export default CustomSearch