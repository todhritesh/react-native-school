import React from 'react'
import {View,Text} from "react-native"
import { createStackNavigator } from "@react-navigation/stack";
import StudentDetailForm from '../screens/stack/StudentDetailForm';
import StackMenuOptions from '../components/StackMenuOptions';
import ManageDetails from '../screens/stack/ManageDetails';
import SingleDetail from '../screens/stack/SingleDetail';
import EditDetail from '../screens/stack/EditDetail';
import Dashboard from '../screens/stack/Dashboard';
import CustomSearch from '../components/CustomSearch';
import Logo from '../screens/stack/Logo';

const Stack = createStackNavigator()
const MyStack = () => {
  const [showLogo,setShowLogo] = React.useState(true)

  React.useEffect(()=>{
    setTimeout(()=>{
      setShowLogo(false)
    },4500)
  },[])

  return (
    <Stack.Navigator initialRouteName="Logo" >
      <Stack.Screen options={{headerTitle:"Dashboard"}}
       name="Dashboard" component={Dashboard} />
        <Stack.Screen options={{headerTitle:"Student Detail Form",headerRight : () => <StackMenuOptions/>}}
         name="StudentDetailForm" component={StudentDetailForm} />
        {showLogo && <Stack.Screen options={{headerShown:false}}name="Logo" component={Logo} />}
        <Stack.Screen options={{headerTitle:"Manage Details",headerRight : () =><View style={{flexDirection:'row'}}><CustomSearch/><StackMenuOptions/></View>}}
         name="ManageDetails" component={ManageDetails} />
        <Stack.Screen options={{headerTitle:"Details",headerRight : () => <StackMenuOptions/>}}
         name="SingleDetail" component={SingleDetail} />
        <Stack.Screen options={{headerTitle:"Edit Detail",headerRight : () => <StackMenuOptions/>}}
         name="EditDetail" component={EditDetail} />
        <Stack.Screen name="StackMenuOption" component={StackMenuOptions} />
    </Stack.Navigator>
  )
}

export default MyStack
