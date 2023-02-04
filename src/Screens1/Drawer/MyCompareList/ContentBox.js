import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, HStack, Image, Text } from 'native-base'


const ContentBox = ({label, subLabel}) => {
  return (
    <Box borderBottomWidth={1} borderColor={'gray.400'} justifyContent='center' h={39}>
        <Text color='#005EAA' fontWeight={500} ml={2}>{label ? label : "-"} {subLabel}</Text>
    </Box>
  )
}

export default ContentBox

const styles = StyleSheet.create({})