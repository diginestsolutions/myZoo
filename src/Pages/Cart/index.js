import { StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Box, ScrollView, Text, FlatList, useToast } from 'native-base'
import Header from '../../Components/Header'
import CommonBackground from '../../Components/CommonBackground'
import Heading from '../../Components/Heading'
import Button from '../../Components/Button'
import CartItemCard from './CartItemCard'
import { useDispatch, useSelector } from 'react-redux'
import { cartCheckoutPayment, getAllCartItems } from '../../Redux/actions/cartAction'
import { LOADING, RESET_ERROR } from '../../Redux/constants/homeConstant'
import { useTranslation } from "react-i18next";
import { RESET } from '../../Redux/constants/settingsConstant'
import { RESET_ITEM } from '../../Redux/constants/myItemsConstant'
import customAxios from '../../CustomAxios'
import { UPDATE_CART } from '../../Redux/constants/cartConstant'


const Cart = ({navigation}) => {

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const toast = useToast()

    const [ cartItems, setCartItems ] = useState([])

    const { loading, error, itemDelete, checkOutId } = useSelector(state => state.cart)
    const { userData } = useSelector(state => state.auth)
    const { addWishList } = useSelector(state => state.myItems)


    useEffect(() => {
      getAllCartItems()
    }, [])
    


    


    const getAllCartItems = async() => {

        let data ={
            UserId: userData?.id,
        }
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`admin/cart/_loadAllProduct`, data)  
        .then(async response => {
            setCartItems(response.data)
            dispatch({
                type: UPDATE_CART,
                payload: response.data.length
            })
            dispatch({
                type: LOADING,
                payload: false
            })
    
        })
        .catch(async error => {
    
            toast.show({
                title: 'Error',
                description: error,
                background: 'error.400'
            })
    
            dispatch({
                type: LOADING,
                payload: false
            })
        });
    }


    useEffect(() => {
        if(checkOutId){
            navigation.navigate('Checkout')
            dispatch({
                type: RESET_ERROR
            })
        }
    }, [checkOutId])
    

    // useEffect(() => {

    //     let data ={
    //         UserId: userData?.id,
    //     }
    //     dispatch(cartCheckoutPayment(data))

      
    // }, [itemDelete, addWishList])

    // useEffect(() => {
    //     if(error){
    //         toast.show({ title: 'Error', description: error })
    //         dispatch({
    //             type: RESET_ERROR
    //         })
    //     }
    // }, [error])

  
 

    const renderItems = ({item}) => (
        <CartItemCard 
            item={item}
            updateCartQuantity={(data) => updateCartQuantity(data)}
            deleteItemFromCart={(data) => deleteItemFromCart(data)}
            addToWishList={(data) => addToWishList(data)}
        />
    )

    //Update cart quantity
    const updateCartQuantity = async(data) => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`Front_End/CartMob/_updateCartItem`, data)  
        .then(async response => {

            setCartItems(response?.data?.data)
            dispatch({
                type: UPDATE_CART,
                payload: response?.data?.data.length
            })
            
            //getSingleProductDetails()
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
    
            toast.show({
                title: 'Error',
                description: error,
                background: 'error.400'
            })
    
            dispatch({
                type: LOADING,
                payload: false
            })
        });
    }

    //delete from cart
    const deleteItemFromCart = async(data) => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`Front_End/CartMob/delete`, data)  
        .then(async response => {

            setCartItems(response?.data?.data)
            dispatch({
                type: UPDATE_CART,
                payload: response?.data?.data.length
            })
            
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
    
            toast.show({
                title: 'Error',
                description: error,
                background: 'error.400'
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        });
    }

    //add to wishlist
    const addToWishList = async(data) => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`Front_End/Mob_products/_savewishlist`, data)  
        .then(async response => {
            getAllCartItems()
            toast.show({
                title: 'Success',
                description: 'Added to wishlist success',
                background: 'success.400'
            })

            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
    
            toast.show({
                title: 'Error',
                description: error,
                background: 'error.400'
            })
    
            dispatch({
                type: LOADING,
                payload: false
            })
        });
    }

    Checkout = () => {

        let data ={
            UserId: userData?.id,
        }
        dispatch(cartCheckoutPayment(data))
    }

    let cartTotal = cartItems.reduce(function(a, b){ return parseFloat(a) + parseFloat(b?.PriceWithoutSymbol) }, [0])

  return (
    <>
    <CommonBackground>
            <Heading label={t("MyCart.mCart")}/>
            <Box px={4} flex={0.98}>

                <Text color={'#535353'} fontWeight={500} fontSize={17} fontFamily='body'>{t("MyCart.itemInCart")}  {`( ${cartItems?.length} Items ) : ${cartTotal}` }</Text>
                <Box bg={'#00B2FF36'} p={2} mt={2} borderWidth={1} borderColor={'#70707059'}>
                    <Text color={'#535353'} fontWeight={300} fontSize={15} fontFamily='body'> {t("MyCart.trmsCndtn")}</Text>
                    <Text color={'#535353'} fontWeight={300} fontSize={13} ml={1} fontFamily='body'>{t("MyCart.allTheDiffHave")}</Text>
                </Box>

                {cartItems && <FlatList 
                    data={cartItems}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItems}
                    showsVerticalScrollIndicator={false}
                />}

                {cartItems.length > 0   ? <Button 
                    onPress={() => navigation.navigate('Checkout')}
                    label={t("MyCart.checkout")} marginTop={6}
                /> : ''}

            </Box>
            
    </CommonBackground>
    </>
  )
}

export default Cart

const styles = StyleSheet.create({})