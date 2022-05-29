import { View, Modal , StyleSheet } from 'react-native'
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import React from 'react'

const CustomLoader = ({isLoading,setIsLoading}) => {
    const styles = StyleSheet.create({
        container:{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
        }
    })
  return (
    <View style={styles.container}>
      <Modal
        transparent={false}
        visible={isLoading}
        animationType="slide"
        onRequestClose={() => {
            setIsLoading(false);
        }}
      >
        <View style={styles.container}>
            <Bars size={20} color="#008577" />
        </View>
      </Modal>
    </View>
  )
}

export default CustomLoader