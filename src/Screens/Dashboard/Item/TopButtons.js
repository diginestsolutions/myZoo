import { StyleSheet, useWindowDimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Box, HStack, Icon, Pressable, useToast } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { addFavourite, addCompare } from '../../../Redux/actions/myItemsAction'
import { useDispatch, useSelector } from 'react-redux'
import { RESET_ERROR } from '../../../Redux/constants/homeConstant'

const TopButtons = ({ActionFavourite, color, ActionCompare, share}) => {

    const { error, compare } = useSelector(state => state.myItems)
    const { width, height } = useWindowDimensions()


    const dispatch = useDispatch();
    const toast = useToast()

    

  return (
    <HStack p={3} position='absolute' right={3} top={4} width={width/2.6} justifyContent='space-between'>
        <Pressable 
            onPress={ActionCompare}
            width={8} height={8} borderRadius={50} bg={'rgba(0,0,0,0.2)'} alignItems='center' justifyContent='center'
        >
            <Icon as={<MaterialIcons/>} name={'compare'} size={17} color={"#fff"} />
        </Pressable>
        <Pressable 
            onPress={ActionFavourite}
            width={8} height={8} borderRadius={50} bg={'rgba(0,0,0,0.2)'} alignItems='center' justifyContent='center'  
        >
            <Icon as={<Ionicons/>} name={'md-heart'} size={17} color={color}  ml={0.2}/>
        </Pressable>
        <Pressable 
            onPress={share} 
            width={8} height={8} borderRadius={50} bg={'rgba(0,0,0,0.2)'} alignItems='center' justifyContent='center'
        >
            <Icon as={<MaterialCommunityIcons/>} name={'share-outline'} size={21} color={"#fff"} mb={1} />
        </Pressable>
    </HStack>
  )
}

export default TopButtons

const styles = StyleSheet.create({})