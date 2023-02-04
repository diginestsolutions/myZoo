import { StyleSheet } from 'react-native'
import React from 'react'
import { Text } from 'native-base'

const CommonTitle = ({label}) => {
  return (
    <Text fontWeight={500} fontFamily="body" color='#008ECC' fontSize={21}>{label}</Text>
  )
}

export default CommonTitle

const styles = StyleSheet.create({})