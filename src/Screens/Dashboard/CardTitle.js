import { StyleSheet } from 'react-native'
import React from 'react'
import { Text, Icon, HStack } from 'native-base'

import AntDesign from 'react-native-vector-icons/AntDesign'

const CardTitle = ({label}) => {
  return (
    <HStack justifyContent='space-between' px={3} alignItems='center' mt={3} mb={-2}>
        <Text color={"#008ECC"} fontWeight={400} fontSize={16} letterSpacing={0.2}>{label}</Text>
        <Icon as={<AntDesign />} name={"right"} color="#535353" size={17} /> 
    </HStack>
  )
}

export default CardTitle

const styles = StyleSheet.create({})