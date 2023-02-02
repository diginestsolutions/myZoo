import { StyleSheet, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../Pages/Profile';
import EditProfile from '../Pages/Profile/EditProfile';
import DeliveryAddress from '../Pages/Profile/DeliveryAddress';
import ChangePassword from '../Pages/Profile/ChangePassword';
import PublicProfile from '../Pages/Profile/PublicProfile';
import AddANewAddress from '../Pages/Profile/DeliveryAddress/AddANewAddress';
import EditAddress from '../Pages/Profile/DeliveryAddress/EditAddress';
import Faqs from '../Pages/FAQs';
import ContactUs from '../Pages/ContactUs';
import TermsAndPrivacyPolicy from '../Pages/TermsAndPrivacyPolicy';
import AboutApp from '../Pages/AboutApp';

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