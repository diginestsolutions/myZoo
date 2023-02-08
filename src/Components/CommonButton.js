import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Text, Pressable, Box } from 'native-base'


const CommonButton = ({label, onPress, mt, bg}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginTop: mt }}>    
      <Box 
          bg={bg ? bg :{
            linearGradient: {
              colors: ['#008ECC', '#00B2FF'],
              start: [0, 0],
              end: [1, 0],
            },
          }}

          //bg='#00B2FF'
          borderRadius={6}          
          alignItems='center' my={4}
      >
          <Text fontWeight={400} fontFamily="body" color='#FFFFFF' fontSize={15} py={3}>{label}</Text>
      </Box>
    </TouchableOpacity>
  )
}

export default CommonButton

const styles = StyleSheet.create({})