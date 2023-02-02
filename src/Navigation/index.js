import { StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Box } from 'native-base';
import ForgotPassword from '../Pages/Auth/ForgotPassword';
import SignIn from '../Pages/Auth/SignIn';
import Register from '../Pages/Auth/Register';
import OtpVerification from '../Pages/Auth/OtpVerification/index.js';
import ResetPassword from '../Pages/Auth/ResetPassword';
import Menu from './Menu';
import SelectCountry from '../Pages/Profile/SelectCountry';
import SplashScreen from '../Pages/SplashScreen';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage'
import customAxios from '../CustomAxios';
import { AUTH_INPUT } from '../Redux/constants/authConstant';
import { navigationRef } from './RootNavigation';
import Currency from '../Screens/Drawer/Currency';
import { getMyFavourite } from '../Redux/actions/myItemsAction';
import MemberShipWarning from '../Components/MemberShipWarning';
import VerifyOtp from '../Pages/Auth/ForgotPassword/VerifyOtp';

const Stack = createNativeStackNavigator();

const Navigation = () => { 

    const dispatch = useDispatch();
    const [initialScreen, setInitialScreen] = useState(null)

    

    useEffect(() => {
        
        checkLogin();
        
    }, [])


    const checkLogin = async() => {
        // await AsyncStorage.clear()
        const token = await AsyncStorage.getItem("token");
        
        if(token){
            const user = await AsyncStorage.getItem("user");

            if(user){
                let userData = JSON.parse(user);

                if(userData){
                    let data = {
                        UserId: userData?.id,
                        countryId: userData?.Country
                    }
                    dispatch(getMyFavourite(data))
                }

                // reactotron.log(userData)

                dispatch({
                    type: AUTH_INPUT,
                    payload: {
                        prop: 'userData',
                        value: userData
                    }
                })
                let data = {
                    UserId: userData?.id
                }
                await customAxios.post(`api/profile/UserProfile/Get`, data)  
                .then(async response => {
                    dispatch({
                        type: AUTH_INPUT,
                        payload: {
                            prop: 'userProfile',
                            value: response.data[0]
                        }
                    })
                    setInitialScreen('Menu');
                })
                .catch(async error => {
            
                    setInitialScreen('Menu');
                    
                });

                
                
            }
            else{
                setInitialScreen('Menu');
            }
            
        }
        else{

            setInitialScreen('Menu');
          
        }
    }

    // if(!initialScreen){
    //     return(

    //         <SplashScreen/>
    //     )
    // }



    return (
        <Box flex={1} safeArea>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator initialRouteName={"Menu"} screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="SignIn" component={SignIn}/>
                    <Stack.Screen name="Register" component={Register}/>
                    <Stack.Screen name="SelectCountry" component={SelectCountry}/>
                    <Stack.Screen name="Currency" component={Currency}/>
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
                    <Stack.Screen name="OtpVerification" component={OtpVerification}/>     
                    <Stack.Screen name="verifyOtp" component={VerifyOtp}/>     
                    <Stack.Screen name="ResetPassword" component={ResetPassword}/>
                    <Stack.Screen name="Menu" component={Menu}/>
                    <Stack.Screen name="memberWarning" component={MemberShipWarning} options={{
                        presentation: "transparentModal"
                    }} />


                </Stack.Navigator>
            </NavigationContainer>
        </Box>
    )
}

export default Navigation

const styles = StyleSheet.create({})