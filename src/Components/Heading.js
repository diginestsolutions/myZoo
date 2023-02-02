import { StyleSheet } from 'react-native'
import React from 'react'
import { Text } from 'native-base'

const Heading = ({label}) => {
  return (
    <Text 
        color={'#008ECC'} 
        p={4} fontSize={17} 
        fontWeight={500} 
        fontFamily={'body'}
        borderBottomColor='#EFEBEB' 
        borderBottomWidth={1} pb={2}
    >{label}</Text>
  )
}

export default Heading

const styles = StyleSheet.create({})