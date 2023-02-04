import { StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Box, HStack, ScrollView, Text, Icon, useToast, Pressable } from 'native-base'
import ActionButton from './ActionButton'
import { addWishlist } from '../../Redux/actions/myItemsAction'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from "react-i18next";
import { itemDeleteFromCart } from '../../Redux/actions/cartAction'
import { IMAGE_URL } from '../../config/Constants'
import { RESET } from '../../Redux/constants/settingsConstant'
import { getProductById } from '../../Redux/actions/homeAction'
import { useNavigation } from '@react-navigation/native'


const CartItemCard = ({item}) => {

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const toast = useToast()  


    const { userData } = useSelector(state => state.auth)

    const { itemDelete, error } = useSelector(state => state.cart)

    const { addWishList } = useSelector(state => state.myItems)

    const navigation = useNavigation();

    const MoveWishlist = () => {
        let data = {
            productId: item?.product?._id,
            userId: userData?.id,
            countryId: userData?.Country,
            CartId: item?._id,
        }
        dispatch(addWishlist(data))

        dispatch({
            type: RESET        
        })
        
    };

    const DeleteItem = () => {
        let data = {
            _id: item?._id,
            userId: userData?.id,
            countryId: userData?.Country,
        }
        dispatch(itemDeleteFromCart(data))

        dispatch({
            type: RESET        
        })

      
    };

    const ViewDetails = () => {
        let data = {
            id: item?.product?._id,
        }
        dispatch(getProductById(data))
        navigation.navigate('ProductDetails');
    }

  return (
    <>
    <Pressable 
        onPress={ViewDetails}
        my={2} flexDirection='row'
    >
        <ImageBackground 
            source={{ uri: `${IMAGE_URL}${item?.Images?.[0]?.UploadedFileName}`}}
            
            style={{height:110, width:110}}>
        </ImageBackground>
        <Box ml={2} mt={2}>
            {/* <Text fontFamily="body" fontWeight={300} fontSize={14} color='#000000'>{item.Name}</Text> */}
            {item?.breed?.[0]?.BreedName ? <Text fontSize={16} fontWeight={500} color='#000000'>{item?.breed?.[0]?.BreedName}</Text> : <Text fontSize={16} fontWeight={500} color='#000000'>{item?.Name}</Text>}
            <Text fontFamily="body" fontWeight={300} fontSize={14} color='#000'>{item.Price}</Text>
            {/* <Text fontFamily="body" fontWeight={300} fontSize={14}color='#008BFC'>{item.stock}</Text> */}
        </Box>
    </Pressable>

    <HStack justifyContent={'space-between'}>
        
        <ActionButton 
            onPress={DeleteItem}
            label={t("MyCart.del")}
        />

        <ActionButton
            onPress={MoveWishlist}
            label={t("MyCart.moveToWshlst")}
        />
        
    </HStack>

    </>
  )
}

export default CartItemCard

const styles = StyleSheet.create({})