import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, StatusBar, Icon, Text, HStack,Image, Pressable } from 'native-base'
import Feather from 'react-native-vector-icons/Feather'

const Flags = ({image, country, currency, code, onPress}) => {
  return (
    <Pressable onPress={onPress}>
    <HStack alignItems={'center'} justifyContent='space-between' borderBottomColor={'#7E7E7E'} borderBottomWidth={1} pb={1}>
        <Image source={image} size={10} alt='name' resizeMode='contain'/>
        <Text flex={0.9} fontSize={16} fontWeight={300} color='#7E7E7E'>{country}</Text>
        {currency && <Text color='#7E7E7E' fontWeight={200} fontSize={16}>{currency}</Text>}
        {code && <Text color='#7E7E7E' fontWeight={200} fontSize={16}>{code}</Text>}
    </HStack>
    </Pressable>
  )
}

export default Flags

const styles = StyleSheet.create({})