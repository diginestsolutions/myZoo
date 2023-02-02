import { StyleSheet, View } from 'react-native'
import React,  { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chat from '.';
import ChatScreen from './ChatScreen';

const Stack = createNativeStackNavigator();


const ChatNav = ({navigation}) => {
	



	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Chat" component={Chat} />
			<Stack.Screen name="ChatScreen" component={ChatScreen} />



		</Stack.Navigator>
	)
}

export default ChatNav

const styles = StyleSheet.create({})