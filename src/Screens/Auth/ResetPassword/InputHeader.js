import { StyleSheet } from 'react-native'
import React from 'react'
import { Text } from 'native-base'

const InputHeader = ({label, mt}) => {
  return (
    <Text fontWeight={400} fontFamily="body" color='#008ECC' fontSize={15} mt={mt}>{label}</Text>
  )
}

export default InputHeader

const styles = StyleSheet.create({})