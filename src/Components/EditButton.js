import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, HStack, Pressable, Text, Icon } from 'native-base'

const EditButton = ({label, mt, color, onPress, mb}) => {
    return (
        
        <Pressable onPress={onPress} alignItems={'center'} borderWidth={1} borderRadius={7} mt={mt} borderColor={color} mb={mb} >
            <Text color={color} fontWeight={200} fontSize={13} my={2.5} fontFamily='body' >{label}</Text>
        </Pressable>
          
    )
}

export default EditButton

const styles = StyleSheet.create({})