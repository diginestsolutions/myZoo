import { StyleSheet, ImageBackground } from 'react-native'
import React, {useEffect} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Box, HStack, ScrollView, FlatList, useToast, Spinner } from 'native-base'
import Header from '../../../Components/Header'
import Heading from '../../../Components/Heading'
import Favourite from '../../../Components/Favourite'
import WishlistCard from './WishlistCard'
import { useNavigation } from '@react-navigation/native'
import CommonBackground from '../../../Components/CommonBackground'
import { useDispatch, useSelector } from 'react-redux'
import { getMyWishlist } from '../../../Redux/actions/myItemsAction'
import { RESET_ERROR } from '../../../Redux/constants/homeConstant'
import { useTranslation } from "react-i18next";
import { RESET_ITEM } from '../../../Redux/constants/myItemsConstant'


const MyWishlist = ({}) => {

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const toast = useToast()

    const { myWishList, loading, error, deleteWishList, addWishList } = useSelector(state => state.myItems)
    const { userData } = useSelector(state => state.auth)

    useEffect(() => {

        if(addWishList){

            let data = {
                UserId: userData?.id,
                countryId: userData?.Country
            }
            dispatch(getMyWishlist(data))

            dispatch({
                type: RESET_ITEM        
            })

        }

        if(deleteWishList){
            let data = {
                UserId: userData?.id,
                countryId: userData?.Country
            }
            dispatch(getMyWishlist(data))


            toast.show({ title: deleteWishList?.msg})

            dispatch({
                type: RESET_ITEM        
            })


        }else{


            let data = {
                UserId: userData?.id,
                countryId: userData?.Country
            }
            dispatch(getMyWishlist(data))

            dispatch({
                type: RESET_ITEM        
            })

        }
        
    
    }, [deleteWishList, addWishList])

    useEffect(() => {
        if(error){
            toast.show({ title: 'Error', description: error })
            dispatch({
                type: RESET_ERROR
            })
        }
    }, [error])
    


    const navigation = useNavigation();


    const renderItems = ({item}) => (
        <WishlistCard 
            item={item}
            onPress={()=>navigation.navigate('Item')}
            SellingMode={item.product.SellingMode}
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