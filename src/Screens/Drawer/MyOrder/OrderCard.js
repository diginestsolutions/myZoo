import { StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import { HStack, Box, Text, Pressable } from 'native-base'
import CommonTextIcon from '../../Profile/CommonTextIcon'
import { SET_ACTIVE_ORDER } from '../../../Redux/constants/orderConstant'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from "react-i18next";
import { IMAGE_URL } from '../../../config/Constants'
import { getProductById } from '../../../Redux/actions/homeAction'


const OrderCard = ({label, orderDate, mt, item, orderDetails}) => {

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const navigation = useNavigation();


    const MakeActiveTrackItem = (item) => {
        dispatch({
            type: SET_ACTIVE_ORDER,
            payload: item
        })
        navigation.navigate('TrackItem');
    }

    const MakeActiveOrder = (item) => {
        dispatch({
            type: SET_ACTIVE_ORDER,
            payload: item
        })
        navigation.navigate('OrderDetails')
    }

    // const ViewDetails = () => {
    //     let data = {
    //         id: item?.product?._id,
    //     }
    //     dispatch(getProductById(data))
    //     navigation.navigate('ProductDetails');
    // }

  return (
    <>
        <Pressable 
            flexDirection={'row'}
            // onPress={ViewDetails}
            borderWidth={1} borderColor={'#B4B4B4'} 
            p={3} alignItems='center' mx={1} my={3} borderRadius={7} mt={mt}
        >
            <ImageBackground 
                source={{ uri: `${IMAGE_URL}${item?.Images?.[0]?.UploadedFileName}`}}         
                style={{height:110, width:110}}>
            </ImageBackground>
            <Box w={'80%'}>
                <Text fontWeight={400} fontFamily="body" fontSize={13} color='#515151' ml={2}>{item?.productName}</Text>
                {orderDate && <Text fontWeight={400} fontFamily="body" fontSize={14} color='#008ECC' ml={2}>{item?.orderDate}</Text>}
            </Box>
            
        </Pressable>

        <CommonTextIcon 
            onPress={()=>MakeActiveTrackItem(item)}
            text={t("MyOrders.trackItem")}
            top={2} iconName="right"
        />
        <CommonTextIcon 
            onPress={()=>MakeActiveOrder(item)}
            text={t("MyOrders.viewOrdDet")} 
            top={2} iconName="right"
        />
    </>
  )
}

export default OrderCard

const styles = StyleSheet.create({})