import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, HStack, Text, Pressable, Icon } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'

const CommonSingnInButton = ({label, labelColor, icon, ml, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
    <Box borderWidth={1} borderColor={labelColor} borderRadius={6} mt={3} > 
        <HStack alignItems='center' px={4}>
            <Box flex={0.2}>
                <Icon as={icon} color={labelColor} size={6} ml={ml}/>
            </Box>
            <Box flex={0.6}>
                <Text fontWeight={400} fontFamily="body" color={labelColor} fontSize={14} py={3} alignSelf='center'>{label}</Text>
            </Box>
        </HStack>
    </Box>
    </TouchableOpacity>
  )
}

export default CommonSingnInButton

const styles = StyleSheet.create({})