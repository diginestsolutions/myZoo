import { ImageBackground, StyleSheet, useWindowDimensions } from 'react-native'
import React, {useEffect} from 'react'
import { Box, Text, Icon, StatusBar, Image, HStack, Input, Pressable } from 'native-base'


const SplashScreen = ({navigation}) => {

    const { width, height } = useWindowDimensions()

    // useEffect(() => {
    //     setTimeout(()=>{
    //         navigation.navigate('SignIn')
    //     }, 2000)
       
    // }, [])


    return (
        <>
        <StatusBar  translucent={true} hidden={true}/>
        <Box flex={1} alignItems='center' justifyContent={'center'} bg='#fff'>
            <Image 
                source={require('../Images/splash.png')}
                resizeMode='contain' alt='logo' size={200}                
            />
        </Box>
        </>
    )
}

export default SplashScreen

const styles = StyleSheet.create({})