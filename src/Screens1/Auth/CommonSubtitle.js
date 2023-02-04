import { StyleSheet } from 'react-native'
import React from 'react'
import { Text } from 'native-base'

const CommonSubtitle = ({label, mt}) => {
  return (
    <Text fontWeight={200} fontFamily="body" color='#7E7E7E' fontSize={14} mt={mt}>{label}</Text>
  )
}

export default CommonSubtitle

const styles = StyleSheet.create({})