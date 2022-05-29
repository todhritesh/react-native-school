import { View, Text , StyleSheet , FlatList} from 'react-native'
import React,{useState} from 'react'
import TextField , {DatePicker,Gender} from '../../components/CustomFormField'
import CustomButton from '../../components/CustomButton'
import CustomLoader from '../../components/CustomLoader'
import database from "@react-native-firebase/database"
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'


const EditDetail = () => {
    const {goBack} = useNavigation()
    const {params:id} = useRoute()
    const [gid,setGid] = useState(null)
    const db = database();
    const [data,setData] = useState(null)
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
    let formData = {};
    let error = 0
    const styles = StyleSheet.create({
        formContainer:{
            width:"100%",
            alignItems:"center"
        }
    })

    function getData(){
        db.ref("students/"+id).once("value",snap=>{
          setData(snap.val())
        })
    }
    React.useEffect(()=>{
        data===null && getData()

        if(data !==null){
            setName(data.name)
            setEmail(data.email)
            setEducation(data.education)
            setContact(data.contact)
            setAddress(data.address)
            setDob(new Date(data.dob))
            setGender(data.gender)
            if(data.gender==="m"){
                setGid(0)
                setGender({label:"Male",value:"m"})
            }
            if(data.gender==="f"){
                setGid(1)
                setGender({label:"Female",value:"f"})
            }
            if(data.gender==="o"){
                setGid(2)
                setGender({label:"Others",value:"o"})
            }
        }
    },[data])

    function handleSubmit(){
        formData = {
            "name":name,
            "email":email,
            "contact":contact,
            "address":address,
            "education":education,
            "dob":String(dob),
            "gender":gender.value,
        }

        for(const i in formData){
            if(formData[i]=="" || formData[i]==null)
                error++;
        }

        if(error){
            alert("All fields are required");
            return;
        }

        
        formData["roll"] = data.roll
        console.log(formData)
        const updateRef = db.ref("students/"+id)
        updateRef.update(formData).then(()=>{
            setName("")
            setEmail("")
            setEducation("")
            setContact("")
            setAddress("")
            setDob("")
            setGender("")
            setGid(null)
            setData(null)
            goBack()
            console.log("edited")
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

export default EditDetail