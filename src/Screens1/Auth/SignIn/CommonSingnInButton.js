import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, HStack, Text, Pressable, Icon } from 'native-base'

const CommonSingnInButton = ({label, labelColor, icon, ml, onPress }) => {
  return (
    <Pressable borderWidth={1} borderColor={labelColor} borderRadius={6} mt={3} onPress={onPress}> 
        <HStack alignItems='center' px={4}>
            <Box flex={0.2}>
                <Icon as={icon} color={labelColor} size={6} ml={ml}/>
            </Box>
            <Box flex={0.6}>
                <Text fontWeight={400} fontFamily="body" color={labelColor} fontSize={14} py={3} alignSelf='center'>{label}</Text>
            </Box>
        </HStack>
    </Pressable>
  )
}

export default CommonSingnInButton

const styles = StyleSheet.create({})