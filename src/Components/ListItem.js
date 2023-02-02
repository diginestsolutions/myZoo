import { StyleSheet } from 'react-native'
import React from 'react'
import { Text, Icon, Pressable } from 'native-base'

const ListItem = ({ text, onPress, marginTop, rightText, icon, iconName, mb }) => {
  return (
    <Pressable 
      marginY={2.5}
      onPress={onPress}
      flexDir={"row"} 
      alignItems="center" 
      mt={marginTop}
      mb={mb}
      
    >
      <Icon as={icon} name={iconName} color={"#008ECC"}  flex={0.18} ml={7} size={19} />
      <Text color={"#008ECC"} fontWeight={400} textAlign="left" flex={0.95} fontSize={14} fontFamily='body'>{text}</Text>
      <Text color={"#B4B4B4"} fontWeight={300} textAlign="left" flex={0.2} fontFamily='body'>{rightText}</Text>
      
    </Pressable>
  )
}

export default ListItem

const styles = StyleSheet.create({})