import { StyleSheet, useWindowDimensions } from 'react-native'
import React, { useEffect } from 'react'
import { Box, Image, Pressable, Text } from 'native-base'

const CommonCard = ({onPress, label, img}) => {

    const { width, height } = useWindowDimensions()

  return (
    <Pressable onPress={onPress}>
        <Box 
            bg={'#fff'} width={width/2-40}  m={3} shadow={4} 
        >
            <Image source={img}  h={150} resizeMode='contain' alt='name'/>
                    
        </Box>
        <Text textAlign='center' fontWeight={400} fontSize={16}>{label}</Text>
    </Pressable> 
  )
}

export default CommonCard

const styles = StyleSheet.create({})