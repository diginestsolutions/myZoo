import { StyleSheet } from 'react-native'
import React, {useEffect} from 'react'
import { Box, ScrollView, Text, FlatList, useToast } from 'native-base'
import Header from '../../Components/Header'
import CommonBackground from '../../Components/CommonBackground'
import Heading from '../../Components/Heading'
import Button from '../../Components/Button'
import CartItemCard from './CartItemCard'
import { useDispatch, useSelector } from 'react-redux'
import { cartCheckoutPayment, getAllCartItems } from '../../Redux/actions/cartAction'
import { RESET_ERROR } from '../../Redux/constants/homeConstant'
import { useTranslation } from "react-i18next";
import { RESET } from '../../Redux/constants/settingsConstant'
import { RESET_ITEM } from '../../Redux/constants/myItemsConstant'


const Cart = ({navigation}) => {

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const toast = useToast()

    const { cartItems, loading, error, itemDelete, checkOutId } = useSelector(state => state.cart)
    const { userData } = useSelector(state => state.auth)
    const { addWishList } = useSelector(state => state.myItems)


    useEffect(() => {
        if(itemDelete){

            let data ={
                UserId: userData?.id,
            }
            dispatch(getAllCartItems(data))

            dispatch({
                type: RESET        
            })


            toast.show({ title: itemDelete?.msg })

          
        }
        else if(addWishList){

            let data ={
                UserId: userData?.id,
            }
            dispatch(getAllCartItems(data))

            dispatch({
                type: RESET_ITEM        
            })

            toast.show({ title: addWishList?.msg })

        }
        else{
            let data ={
                UserId: userData?.id,
            }
            dispatch(getAllCartItems(data))
        }
    
    }, [itemDelete, addWishList])


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
        <CartItemCard item={item}/>
    )

    Checkout = () => {

        let data ={
            UserId: userData?.id,
        }
        dispatch(cartCheckoutPayment(data))
    }

  return (
    <>
    <CommonBackground>
            <Heading label={t("MyCart.mCart")}/>
            <Box px={4} flex={0.98}>

                <Text color={'#535353'} fontWeight={500} fontSize={17} fontFamily='body'>{t("MyCart.itemInCart")} : {cartItems?.length }</Text>
                <Box bg={'#00B2FF36'} p={2} mt={2} borderWidth={1} borderColor={'#70707059'}>
                    <Text color={'#535353'} fontWeight={300} fontSize={15} fontFamily='body'> {t("MyCart.trmsCndtn")}</Text>
                    <Text color={'#535353'} fontWeight={300} fontSize={13} ml={1} fontFamily='body'>{t("MyCart.allTheDiffHave")}</Text>
                </Box>

                {cartItems&&<FlatList 
                    data={cartItems}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItems}
                    showsVerticalScrollIndicator={false}
                />}

                {cartItems!=0   ? <Button 
                    onPress={Checkout}
                    label={t("MyCart.checkout")} marginTop={6}
                /> : ''}

            </Box>
            
    </CommonBackground>
    </>
  )
}

export default Cart

const styles = StyleSheet.create({})