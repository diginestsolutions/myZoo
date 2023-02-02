import { StyleSheet, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '.';
import EditProfile from './EditProfile';
import DeliveryAddress from './DeliveryAddress';
import ChangePassword from './ChangePassword';
import PublicProfile from './PublicProfile';
import Faqs from '../Drawer/FAQs';
import ContactUs from '../Drawer/ContactUs';
import TermsAndPrivacyPolicy from '../Drawer/TermsAndPrivacyPolicy';
import AboutApp from '../Drawer/AboutApp';
import AddANewAddress from './DeliveryAddress/AddANewAddress';
import EditAddress from './DeliveryAddress/EditAddress';

const Stack = createNativeStackNavigator();

const ProfileNav = () => {
  return (
    <Stack.Navigator initialRouteName='Profile'  screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="EditProfile" component={EditProfile}/>
        <Stack.Screen name="DeliveryAddress" component={DeliveryAddress}/>
        <Stack.Screen name="ChangePassword" component={ChangePassword}/>
        <Stack.Screen name="PublicProfile" component={PublicProfile}/>
        <Stack.Screen name="Faqs" component={Faqs}/>
        <Stack.Screen name="ContactUs" component={ContactUs}/>
        <Stack.Screen name="TermsAndPrivacyPolicy" component={TermsAndPrivacyPolicy}/>
        <Stack.Screen name="AboutApp" component={AboutApp}/>

        <Stack.Screen name="AddANewAddress" component={AddANewAddress}/>
        <Stack.Screen name="EditAddress" component={EditAddress}/>
    </Stack.Navigator>
  )
}

export default ProfileNav

const styles = StyleSheet.create({})