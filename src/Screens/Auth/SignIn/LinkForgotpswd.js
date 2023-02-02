import { StyleSheet } from 'react-native'
import React from 'react'
import { Text, Pressable } from 'native-base'



const LinkForgotpswd = ({label, onPress}) => {
  return (
    <Pressable alignSelf={'flex-end'} onPress={onPress} mt={2} >
        <Text fontWeight={200} fontFamily="body" color='#1A73BA' fontSize={14}>{label}</Text>
    </Pressable>
  )
}

export default LinkForgotpswd

const styles = StyleSheet.create({})