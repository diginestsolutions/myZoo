import { StyleSheet } from 'react-native'
import React from 'react'
import { Avatar, Box, Image, Text, Icon, Pressable } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'

const ProfileDp = ({fName, lName, onPress, iconName, children}) => {

    return (
        <Box alignItems={'center'}>
            {children}
            { iconName && 
            <Pressable onPress={onPress}>
                <Avatar bg='#005EAA' size={27} mb={-5} mt={-7} ml={20}>
                    <Icon as={<Ionicons />} name={iconName} color="#fff" size={3} />
                </Avatar>
                </Pressable>}
            <Text mt={2} fontSize={17} fontFamily={'body'} color={'#3D3D3D'} fontWeight={500}>{fName} {lName}</Text>
        </Box>
    )
}

export default ProfileDp

const styles = StyleSheet.create({})