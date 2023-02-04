import { StyleSheet } from 'react-native'
import React from 'react'
import { Text } from 'native-base'

const Title = ({label}) => {
  return (
    <Text fontWeight={400} fontFamily="body" fontSize={17} color='#005EAA' mt={3}>{label}</Text>
  )
}

export default Title

const styles = StyleSheet.create({})