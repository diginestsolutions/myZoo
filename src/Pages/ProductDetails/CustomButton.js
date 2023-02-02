import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, HStack, Pressable, Text, Icon } from 'native-base'

const CustomButton = ({label, onPress, marginTop, icon, width}) => {
    return (
        <Pressable onPress={onPress} width={width}>
            <Box 
                borderRadius={8}
                borderColor={'#083b8c'}
                borderWidth={1}
                justifyContent={"center"}
                alignItems={"center"}
                height={50}
                marginTop={marginTop}
            >
            <HStack alignItems={'center'}>
                {icon && <Icon as={icon}  color={"#083b8c"}  size={19} />}
                <Text color={"#083b8c"} fontWeight={300} fontSize={16} ml={2}>{label}</Text>
            </HStack>
            </Box>
        </Pressable>
    )
}

export default CustomButton

const styles = StyleSheet.create({})