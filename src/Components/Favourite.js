import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Avatar, Box, HStack, Icon, Pressable, Spinner, useToast } from 'native-base'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import { addFavourite, deleteFavourite } from '../Redux/actions/myItemsAction'
import { LOADING, RESET_ERROR } from '../Redux/constants/homeConstant'


const Favourite = ({iconName, iconHeart, ActionFavourite, color}) => {

    const { fav, loading, error } = useSelector(state => state.myItems)

    const [showModal, setShowModal] = useState(false);

    

    const [ heart, setHeart ] = useState(false)

   


  return (
    <>
    <HStack p={1} justifyContent='space-between' width={"88%"}>
        {iconName &&<Avatar 
            size={27} bg={'rgba(0,0,0,0.2)'} 
        >
            <Icon as={<SimpleLineIcons/>} name={iconName} size={10.2} color={"#fff"}/>
        </Avatar>}
        {iconHeart && <Pressable onPress={ActionFavourite}><Avatar 
            size={27} bg={'rgba(0,0,0,0.2)'}
        >
            <Icon as={<Ionicons/>} name={iconHeart} size={13} color={color} />
        </Avatar></Pressable>}

    </HStack>
    

    </>
  )
}

export default Favourite

const styles = StyleSheet.create({})