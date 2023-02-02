import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, HStack, Pressable, Text, Icon } from 'native-base'

const Delete = ({label, onPress, marginTop, iconName, icon, width, alignSelf}) => {
    return (
        <Pressable onPress={onPress} width={width} alignSelf={alignSelf} >
            <Box 
                borderRadius={8}
                
                bg={{
                    linearGradient: {
                    colors: ["#ff0000", "#ff6200" ],
                    start: [0, 0],
                    end: [0, 1],
                    },
                }}
                justifyContent={"center"}
                alignItems={"center"}
                height={50}
                marginTop={marginTop}
            >
            <HStack alignItems={'center'}>
                {icon && <Icon as={icon} name={iconName} color={"#fff"} mr={1} size={19} />}
                <Text color={"#fff"} fontWeight={400} fontSize={16} fontFamily='body'>{label}</Text>
            </HStack>
            </Box>
        </Pressable>
    )
}

export default Delete

const styles = StyleSheet.create({})