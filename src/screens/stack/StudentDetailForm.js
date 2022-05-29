import { View, Text , StyleSheet , FlatList} from 'react-native'
import React,{useState} from 'react'
import TextField , {DatePicker,Gender} from '../../components/CustomFormField'
import CustomButton from '../../components/CustomButton'
import CustomLoader from '../../components/CustomLoader'
import database from "@react-native-firebase/database"

const StudentDetailForm = () => {
    const [gid,setGid] = useState(null)
    const db = database().ref("students");
    const [isLoading,setIsLoading] = useState(false)
    const [name,setName]= useState()
    const [email,setEmail] = useState("")
    const [education,setEducation] =useState("")
    const [contact,setContact] = useState("")
    const [address,setAddress]= useState("")
    const [dob,setDob]= useState()
    const [dobVisible,setDobVisible]= useState(false)
    const [genderModalVisible,setGenderModalVisible] = useState(false)
    const [gender,setGender] = useState("")
    let data = {};
    let error = 0
    const styles = StyleSheet.create({
        formContainer:{
            width:"100%",
            alignItems:"center"
        }
    })

    function handleSubmit(){
        data = {
            "name":name,
            "email":email,
            "contact":contact,
            "address":address,
            "education":education,
            "dob":String(dob),
            "gender":gender.value,
        }

        for(const i in data){
            if(data[i]=="" || data[i]==null)
                error++;
        }

        if(error){
            alert("All fields are required");
            return;
        }

        db.limitToLast(1).once("value",snap=>{
            snap.forEach(item=>{
                console.log(item.val())
                data["roll"] = Number(item.val().roll)+1
                const newRef = db.push()
                newRef.set(data).then(()=>{
                    setName("")
                    setEmail("")
                    setEducation("")
                    setContact("")
                    setAddress("")
                    setDob("")
                    setGender("")
                    setGid(null)
                    console.log("success")
                })
            })
        })
        
    }
  return (
      <FlatList
      ListHeaderComponent={
          <>
            <View style={styles.formContainer}  >
                <CustomLoader isLoading={isLoading} setIsLoading={setIsLoading} />
                <TextField value={name} onChangeText={(val)=>setName(val)} label="Name" placeholder="Name..." />
                <TextField value={education} onChangeText={(val)=>setEducation(val)} label="Education" placeholder="Education..." />
                <TextField value={email} onChangeText={(val)=>setEmail(val)} label="Email" placeholder="Email..." />
                <Gender gid={gid} setGid={setGid} genderModalVisible={genderModalVisible} setGenderModalVisible={setGenderModalVisible} gender={gender} setGender={setGender} label="Gender" />
                <TextField value={contact} onChangeText={(val)=>setContact(val)} keyboardType="numeric" label="Contact" placeholder="Contact..." />
                <DatePicker dob={dob} label="Date of birth" setDob={setDob} dobVisible={dobVisible} setDobVisible={setDobVisible} />
                <TextField value={address} onChangeText={(val)=>setAddress(val)} multiline={true} numberOfLines={4} height={160} label="Address" placeholder="Address..." />
                <CustomButton onPress={()=>handleSubmit()} title="Submit Form" />
            </View>
        </>
      }
      />
  )
}

export default StudentDetailForm