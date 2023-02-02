import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, HStack, Icon, Pressable, Text } from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign'


const CommonTextIcon = ({text,icon, onPress, topRad, bottomRad, top, borderRadius, iconName, bg, height, mb, boderBottomWidh, color}) => {
  return (
    <Pressable 
        onPress={onPress} 
        flexDirection={"row"} 
        justifyContent='space-between' 
        borderWidth={0.5} 
        borderColor={'#B4B4B4'} 
        p={2.5}
        borderTopRadius={topRad}
        borderBottomRadius={bottomRad}
        mt={top}
        borderRadius={borderRadius}
        bg={bg}
        h={height}
        alignItems='center'
        mb={mb}
        borderBottomWidth={boderBottomWidh}
        borderBottomColor={'#B4B4B4'}
    >
        <HStack>
            <Icon as={ icon } color={'#535353'} size={21}/>
            <Text color={ color ? color : '#535353'} ml={2} fontSize={14} fontWeight={ color ? 700 : 100} fontFamily='body' >{text}</Text>
        </HStack>            
        { iconName === "right" ? <Icon as={<AntDesign name={iconName}/>} color="#535353" mt={1} size={15}/> : '' }
        
    </Pressable>
  )}

export default CommonTextIcon

const styles = StyleSheet.create({
  
})