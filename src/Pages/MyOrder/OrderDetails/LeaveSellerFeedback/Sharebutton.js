import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Avatar, Box, HStack, Icon, Pressable } from 'native-base'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Sharebutton = ({onShare, goBack}) => {



  return (
    
    <HStack p={3} justifyContent='space-between'>
        <Avatar 
            size={33} bg={'rgba(0,0,0,0.2)'} 
        >
            <Icon as={<MaterialCommunityIcons/>} name={"chevron-left"} size={31} color={"#fff"} onPress={goBack}/>
        </Avatar>
        <Avatar 
            size={33} bg={'rgba(0,0,0,0.2)'}
        >
            <Icon as={<MaterialCommunityIcons/>} name={'share-outline'} size={23} color={"#fff"}  onPress={onShare}/>
        </Avatar>
    </HStack>
  )
}

export default Sharebutton

const styles = StyleSheet.create({})