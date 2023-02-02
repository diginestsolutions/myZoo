import { StyleSheet, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chat from '../Pages/Chat';
import ChatScreen from '../Pages/Chat/ChatScreen';


const Stack = createNativeStackNavigator();


const ChatNav = () => {
  return (
    <Stack.Navigator  screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Chat" component={Chat}/>
        <Stack.Screen name="ChatScreen" component={ChatScreen}/>

      
        
    </Stack.Navigator>
  )
}

export default ChatNav

const styles = StyleSheet.create({})