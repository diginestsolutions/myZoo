import { StyleSheet } from 'react-native'
import React from 'react'
import { Pressable } from 'native-base'




const ImageTextCard = ({ width, height, borderRadius, mt, onPress, children, margin, mx, flex }) => {
    return (
        <Pressable
            shadow={5} 
            borderRadius={borderRadius ?  borderRadius : 10} 
            width={width} 
            backgroundColor="#fff"
            height={height} 
            mt={mt}
            margin={margin}
            mx={mx} my={4}
            onPress={onPress}
        >
            {children}
        </Pressable>
    )
}

export default ImageTextCard

const styles = StyleSheet.create({})