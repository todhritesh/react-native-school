import { View, Text , TextInput , StyleSheet , Modal , TouchableOpacity , useWindowDimensions} from 'react-native'
import React,{useState} from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AntDesignIcon from 'react-native-vector-icons/AntDesign';


const TextField = (props) => {
    const {height,width} = useWindowDimensions()
    const {label , ...prop} = props
    const styles = StyleSheet.create({
        container:{
            marginVertical:6,
            width:width<height?(width*90)/100:(width*50)/100
        },
        label:{
            marginVertical:4,
            marginLeft:5,
            fontSize:18,
            fontWeight:"bold",
            color:"black"
        },
        input:{
            borderColor:"grey",
            borderWidth:3,
            borderRadius:20,
            fontWeight:"500",
            fontSize:19,
            color:"black",
            paddingLeft:10,
            textAlignVertical:"top"
        },
    })
  return (
    <View style={styles.container} >
      <Text style={styles.label} >{label}</Text>
      <TextInput placeholderTextColor="grey" height={45} {...prop} style={styles.input}   />
    </View>
  )
}


export function DatePicker({setDob,setDobVisible,label,dob,dobVisible}){
    const {height,width} = useWindowDimensions()
    const styles = StyleSheet.create({
        container:{
            marginVertical:6,
            width:width<height?(width*90)/100:(width*50)/100
        },
        label:{
            marginVertical:4,
            marginLeft:5,
            fontSize:18,
            fontWeight:"bold",
            color:"black"
        },
        button:{
            borderColor:"grey",
            borderWidth:3,
            borderRadius:20,
            fontWeight:"500",
            fontSize:19,
            color:dob?"black":'grey',
            paddingLeft:10,
            height:45,
            textAlignVertical:"center"
        },
        placeholder:{
            color:'grey'
        }
    })
    function formattedDate(d) {
        return [d.getDate(), d.getMonth()+1, d.getFullYear()]
            .map(n => n < 10 ? `0${n}` : `${n}`).join('/');
      }
    return (
        <View style={styles.container}>
            <Text style={styles.label} >{label}</Text>
            <TouchableOpacity activeOpacity={.6} onPress={()=>setDobVisible(true)} >
                <Text style={styles.button}>{dob?label+" "+formattedDate(dob):label+" ..."}</Text>
            </TouchableOpacity>
             <DateTimePickerModal
                isVisible={dobVisible}
                mode="date"
                onConfirm={(date)=>{setDobVisible(false);setDob(date)}}
                onCancel={()=>setDobVisible(false)}
            />
        </View>
    )
}


export function Gender({gid, setGid,gender,label,genderModalVisible,setGenderModalVisible,setGender}){
    const genderArray = [
        {label:"Male",value:"m"},
        {label:"Female",value:"f"},
        {label:"Others",value:"o"},
    ]
    const {height,width} = useWindowDimensions()
    const styles = StyleSheet.create({
        centeredView: {
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
            flex: 1,
        },
        modalView: {
            width:width<height?width*80/100:width*50/100,
            backgroundColor: "white",
            paddingHorizontal: 20,
            paddingVertical: 10,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset:{
            width: 0,
            height: 8,
            },
            shadowOpacity: 0.46,
            shadowRadius: 11.14,
            elevation: 17,
        },
        container:{
            marginBottom:6,
            marginTop:-15,
            width:width<height?(width*90)/100:(width*50)/100
        },
        label:{
            marginVertical:4,
            marginLeft:5,
            fontSize:18,
            fontWeight:"bold",
            color:"black"
        },
        button:{
            borderColor:"grey",
            borderWidth:3,
            borderRadius:20,
            fontWeight:"500",
            fontSize:19,
            color:gender?"black":'grey',
            paddingLeft:10,
            height:45,
            textAlignVertical:"center"
        },
        selectContainer:{

        },
        select:{
            width:"100%",
            borderColor:"lightgrey",
            justifyContent:"space-between",
            borderBottomWidth:2,
            flexDirection:"row",
            padding:10
        },
        option:{
            fontWeight:'500',
            fontSize:20,
            color:'black'
        },
        titleContainer:{
            width:"100%",
            backgroundColor:"#008577",
            width:width<height?width*80/100:width*50/100,
            paddingHorizontal:20,
            paddingVertical:25,
        },
        title:{
            fontSize:30,
            fontWeight:"500",
            color:"white"
        },
        actionWrapper:{
            flexDirection:'row',
            justifyContent:"flex-end",
            paddingVertical:10
        },
        actionContainer:{
            marginRight:10,
        },
        action:{
            color:"#008577",
            fontSize:20,
            fontWeight:"bold"
        }
    })
    function handleConfirm(){
        if(gid!=null){
            setGender(genderArray[gid]);
            setGenderModalVisible(false)
        }else{
            return
        }
    }
    return (
        <View style={styles.centeredView}>
        <Modal
          
          animationType="slide"
          transparent={true}
          visible={genderModalVisible}
          onRequestClose={() => {
            setGenderModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
              <View style={styles.titleContainer}>
                <Text style={styles.title} >Select Gender</Text>
              </View>
            <View style={styles.modalView}>
                {
                    genderArray.map((item,i)=>(
                    <TouchableOpacity key={i} onPress={()=> setGid(i)} activeOpacity={.5} style={styles.select} >
                        <Text style={styles.option} >{item.label}</Text>
                        {gid ===i && <AntDesignIcon name='checkcircle' size={25} color="#008577" />}
                    </TouchableOpacity>
                    ))
                }
              <View style={styles.actionWrapper} >
                  <View style={{flex:1}}></View>
                <TouchableOpacity onPress={()=>setGenderModalVisible(false)} activeOpacity={.5} style={styles.actionContainer,{marginRight:30}} >
                    <Text style={styles.action} >Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{handleConfirm()}} activeOpacity={.5} style={styles.actionContainer} >
                    <Text style={styles.action} >Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.container}>
            <Text style={styles.label} >{label}</Text>
            <TouchableOpacity activeOpacity={.6} onPress={()=>setGenderModalVisible(true)} >
                <Text style={styles.button}>{gid!=null?label+" - "+gender.label:label+" ..."}</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
}













export default TextField