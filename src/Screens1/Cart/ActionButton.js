import { StyleSheet } from 'react-native'
import React from 'react'
import { Pressable, Text } from 'native-base'

const ActionButton = ({label, onPress}) => {
  return (
    <Pressable w={'48%'} alignItems='center' bg='#00000029' onPress={onPress}>
            <Text fontFamily="body" fontWeight={300} fontSize={14} color='#000' py={1}>{label}</Text>

        </Pressable>
  )
}

export default ActionButton

const styles = StyleSheet.create({})