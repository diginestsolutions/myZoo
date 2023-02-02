import { StyleSheet, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList, useToast } from 'native-base'
import Heading from '../../Components/Heading'
import WishlistCard from './WishlistCard'
import { useNavigation } from '@react-navigation/native'
import CommonBackground from '../../Components/CommonBackground'
import { useDispatch, useSelector } from 'react-redux'
import { getMyWishlist } from '../../Redux/actions/myItemsAction'
import { LOADING, RESET_ERROR } from '../../Redux/constants/homeConstant'
import { useTranslation } from "react-i18next";
import { RESET_ITEM } from '../../Redux/constants/myItemsConstant'
import customAxios from '../../CustomAxios'


const MyWishlist = () => {

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const toast = useToast()
    const [myWishList, setMyWishList] = useState([])
    const { userData } = useSelector(state => state.auth)


    useEffect(() => {
        getMyWishList()
    }, [])
    

    const getMyWishList = async() => {
        let data = {
            UserId: userData?.id,
            countryId: userData?.Country
        }

        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`home/wishlist`, data)  
        .then(async response => {
            setMyWishList(response.data)
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
    
            toast.show({ 
                title: 'Error', 
                description: error,
                backgroundColor: 'error.400' 
            })
    
            dispatch({
                type: LOADING,
                payload: false
            })
        });
    }

    const deleteWishList = async(id) => {
        let data = {
            productId: id,
            userId: userData?.id,
        }
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`Front_End/Mob_products/_deletewishlist`, data)  
        .then(async response => {
            getMyWishList()
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
    
            toast.show({ 
                title: 'Error', 
                description: error,
                backgroundColor: 'error.400' 
            })
    
            dispatch({
                type: LOADING,
                payload: false
            })
        });
    }

    
    


    const navigation = useNavigation();


    const renderItems = ({item}) => (
        <WishlistCard 
            item={item}
            onPress={()=>navigation.navigate('Item')}
            SellingMode={item.product.SellingMode}
            deleteWishList={(id) => deleteWishList(id)}
        />
    )
  return (
    <>
    
        <CommonBackground>
           
                <Heading label={t("MyWishlist.mWish")}/>

                <FlatList 
                    data={myWishList}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItems}
                />

      
                
        </CommonBackground>
    </>
  )
}

export default MyWishlist

const styles = StyleSheet.create({})