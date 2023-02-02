import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Pets from '../Pages/Categories/Pets';
import SubCategory from '../Pages/Categories/SubCategtory';


const Stack = createNativeStackNavigator();


const PetsNavigation = () => {

  
  

  return (
    <Stack.Navigator  screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Pets" component={Pets}/>
        <Stack.Screen name="SubCategory" component={SubCategory}/>
    </Stack.Navigator>
  )
}

export default PetsNavigation

const styles = StyleSheet.create({})