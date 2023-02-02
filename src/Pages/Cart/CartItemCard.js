import { StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Box, HStack, ScrollView, Text, Icon, useToast, Pressable } from 'native-base'
import ActionButton from './ActionButton'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from "react-i18next";
import { IMAGE_URL } from '../../config/Constants'
import { getProductById } from '../../Redux/actions/homeAction'
import { useNavigation } from '@react-navigation/native'


const CartItemCard = ({item, updateCartQuantity, deleteItemFromCart, addToWishList}) => {

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const toast = useToast()  


    const { userData } = useSelector(state => state.auth)


    const navigation = useNavigation();

    const MoveWishlist = () => {
        let data = {
            productId: item?.product?._id,
            userId: userData?.id,
            countryId: userData?.Country,
            CartId: item?._id,
        }
        addToWishList(data)
        
    };

    const DeleteItem = () => {
        let data = {
            _id: item?._id,
            userId: userData?.id,
            countryId: userData?.Country,
        }
        //dispatch(itemDeleteFromCart(data))

        deleteItemFromCart(data)

       

      
    };

    

    const ViewDetails = () => {
        // let data = {
        //     id: item?.product?._id,
        // }
        // dispatch(getProductById(data))
        navigation.navigate('ProductDetails', { id: item?.product?._id });
    }

    const increaseQuantity = () => {
        let datas = {
            productId: item?.product?._id,
            userId: userData?.id,
            countryId: userData?.Country,
            Quantity: item?.Quantity + 1,
            Price: parseFloat(item?.product?.Price) * (parseInt(item?.Quantity) + 1)
        }

        updateCartQuantity(datas)

    }


    const decreaseQuantity = () => {
        let datas = {
            productId: item?.product?._id,
            userId: userData?.id,
            countryId: userData?.Country,
            Quantity: item?.Quantity - 1,
            Price: parseFloat(item?.product?.Price) * (parseInt(item?.Quantity) - 1)
        }

        updateCartQuantity(datas)
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
        <Box flexDir={"column"}>
            <Box ml={2} mt={2}>
                {/* <Text fontFamily="body" fontWeight={300} fontSize={14} color='#000000'>{item.Name}</Text> */}
                {item?.breed?.[0]?.BreedName ? <Text fontSize={16} fontWeight={500} color='#000000'>{item?.breed?.[0]?.BreedName}</Text> : <Text fontSize={16} fontWeight={500} color='#000000'>{item?.Name}</Text>}
                <Text fontFamily="body" fontWeight={300} fontSize={14} color='#000'>{item?.Price}</Text>
                <Text fontFamily="body" fontWeight={300} fontSize={14}color='#008BFC'>{item?.product?.stock >= item?.Quantity ? 'In Stock': ''}</Text>
            </Box>
            {item?.product?.stock > item?.Quantity && <Box h={30} w={100} borderWidth={0.5}  ml={2} mt={2} flexDir="row">
                <Pressable bgColor={"gray.100"} w={33} borderWidth={0.5} height={30} justifyContent="center" alignItems={"center"} onPress={decreaseQuantity}>
                    <Icon as={<Ionicons />} name="remove" size={26} />
                </Pressable>
                <Box w={34} borderWidth={0.5} height={30} justifyContent="center" alignItems={"center"}>
                    {item?.Quantity}
                </Box>
                <Pressable bgColor={"gray.100"} w={33} borderWidth={0.5} height={30} justifyContent="center" alignItems={"center"} onPress={increaseQuantity}>
                    <Icon as={<Ionicons />} name="add" size={26} />
                </Pressable>
            </Box>}
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