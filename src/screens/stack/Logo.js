import { StyleSheet, Text, View , useWindowDimensions , StatusBar , Animated  } from 'react-native'
import React,{useState,useEffect} from 'react'

const Logo = () => {
    const {height,width} = useWindowDimensions();
    const container1 = useState(new Animated.Value(height))[0];
    const container2 = useState(new Animated.Value(-height))[0];
    const textOpacity = useState(new Animated.Value(0.6))[0];
    const scaleAnimation = useState(new Animated.Value(100))[0];
    const RemoveContainer1 = useState(new Animated.Value(0))[0]
    const RemoveContainer2 = useState(new Animated.Value(0))[0]
    function startAnimation(){
        Animated.parallel([
            Animated.spring(container1,{
                toValue:0,
                duration:3500,
                useNativeDriver:true
            }),
            Animated.spring(container2,{
                toValue:0,
                duration:3500,
                useNativeDriver:true
            }),
            Animated.spring(scaleAnimation,{
                toValue:1,
                duration:3000,
                useNativeDriver:true
            }),
            Animated.spring(textOpacity,{
                toValue:1,
                duration:2000,
                delay:2000,
                useNativeDriver:true
            }),
            Animated.spring(RemoveContainer1,{
                toValue:-width,
                duration:2000,
                delay:4000,
                useNativeDriver:true
            }),
            Animated.spring(RemoveContainer2,{
                toValue:width,
                duration:2000,
                delay:4000,
                useNativeDriver:true
            }),
        ]).start()
    }
    useEffect(()=>{
        startAnimation()
    },[])
    const styles = StyleSheet.create({
        container:{
            flex:1,
            backgroundColor:'black',
            // backgroundColor:'#008577',
            justifyContent:'center',
            alignItems:'center'
        },
        textContainer1:{
            transform:[
                {translateY:container1},
                {translateX:RemoveContainer1},
                {scale:scaleAnimation}
            ]
        },
        textContainer2:{
            transform:[
                {translateY:container2},
                {translateX:RemoveContainer2},
                {scale:scaleAnimation}
            ]
              
        },
        text:{
            fontSize:50,
            color:'white',
            fontWeight:"700",
            opacity:textOpacity
        }
    })
  return (
    <View style={styles.container} >
        <StatusBar hidden={true} />

        <Animated.View style={styles.textContainer1}>
            <Animated.Text style={styles.text}>React</Animated.Text>
        </Animated.View>
        <Animated.View style={styles.textContainer2}>
            <Animated.Text style={styles.text}>Native</Animated.Text>
        </Animated.View>
    </View>
  )
}

export default Logo
