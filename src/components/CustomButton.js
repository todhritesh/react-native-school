import { View, Text , TouchableOpacity , StyleSheet , useWindowDimensions } from 'react-native'
import React from 'react'

const CustomButton = ({color,height,width,title,textColor,onPress}) => {
    const {height:vh,width:vw} = useWindowDimensions()
    const styles = StyleSheet.create({
        container:{
            width:width!==undefined?width:vw<vh?(vw*90)/100:(vw*50)/100,
            height:height===undefined?"100%":height,
            marginVertical:10,
        },
        button:{
            backgroundColor:color===undefined?"#008577":color,
            paddingHorizontal:20,
            paddingVertical:10,
            borderRadius:10
        },
        title:{
            textAlign:"center",
            textAlignVertical:"center",
            color:textColor===undefined?"white":textColor,
            fontWeight:"bold",
            fontSize:18
        }
    })
  return (
    <View style={styles.container} >
      <TouchableOpacity onPress={onPress} activeOpacity={.7} style={styles.button} >
          <Text style={styles.title} >{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CustomButton