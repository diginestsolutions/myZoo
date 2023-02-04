import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, Text } from 'native-base'

const FilterCard = ({children, label}) => {
  return (
    <Box
        shadow={5} 
        borderRadius={3}           
        backgroundColor="#fff"
        my={3}
        p={4}
    >
        <Text fontSize={16} color={'#008ECC'} borderBottomColor={'#DFDFDF'} borderBottomWidth={1} pb={2} fontWeight={300}>{label}</Text>
        {children}
    </Box>
  )
}

export default FilterCard

const styles = StyleSheet.create({})



