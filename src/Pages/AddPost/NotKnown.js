import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Box } from 'native-base'

const NotKnown = () => {
  return (
    <Box bgColor={"gray.100"} height={38} borderRadius={10} justifyContent={"center"} pl={4}>
        <Text>Not Known</Text>
    </Box>
  )
}

export default NotKnown

const styles = StyleSheet.create({})