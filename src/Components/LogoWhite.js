import { StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'native-base'


const LogoWhite = () => {
  return (
  
    <Image 
        source={require('../Images/myzoowhite.png')}
        resizeMode='contain' alt='logo' size={120} 
    />
    
  )
}

export default LogoWhite

const styles = StyleSheet.create({})