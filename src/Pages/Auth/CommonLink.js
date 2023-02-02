import { StyleSheet } from 'react-native'
import React from 'react'
import { HStack, Text, Pressable, Image, Icon } from 'native-base'

const CommonLink = ({onPress, text, label, alignSelf}) => {
  return (
    <HStack alignSelf={alignSelf} mt={6}>
            <Text fontWeight={200} fontFamily="body" color='#535353' fontSize={13} py={3}>{text}</Text>
            <Text 
                onPress={onPress}
                fontWeight={200} fontFamily="body" color='#1A73BA' 
                fontSize={13} py={3}
            > {label}</Text>
        </HStack>
  )
}

export default CommonLink

const styles = StyleSheet.create({})