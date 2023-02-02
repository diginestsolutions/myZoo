import { StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'native-base'

const Logo = () => {
  return (
    <Image 
        source={require('../Images/myzoo.png')}
        resizeMode='contain' alt='logo'  size={150}                
    />
  )
}

export default Logo

const styles = StyleSheet.create({})