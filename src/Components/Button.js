import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, HStack, Pressable, Text, Icon } from 'native-base'

const Button = ({label, onPress, marginTop, iconName, icon, width, alignSelf, price}) => {
    return (
        <Pressable onPress={onPress} width={width} alignSelf={alignSelf} 
        >
            <Box 
                borderRadius={8}
                shadow={5}
                bg={{
                    linearGradient: {
                    colors: ["#008ECC", "#00B2FF"],
                    start: [0, 0],
                    end: [1, 0],
                    },
                }}
                justifyContent={"center"}
                alignItems={"center"}
                height={50}
                marginTop={marginTop}
            >
            <HStack alignItems={'center'}>
                {icon && <Icon as={icon} name={iconName} color={"#fff"} mr={1} size={19} />}
                <Text color={"#fff"} fontWeight={400} fontFamily={'body'} fontSize={16}>{label}</Text>
                {price&&<Text color={"#fff"} fontWeight={400} fontFamily={'body'} fontSize={16}> {price}</Text>}
            </HStack>
            </Box>
        </Pressable>
    )
}

export default Button

const styles = StyleSheet.create({})