import { StyleSheet } from 'react-native'
import React, {useEffect} from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Box, Icon, ScrollView, Text, HStack, FlatList, useToast, Spinner } from 'native-base'
import Header from '../../../Components/Header'
import Heading from '../../../Components/Heading'
import CommonTextIcon from '../../Profile/CommonTextIcon'
import OrderCard from './OrderCard'
import CommonBackground from '../../../Components/CommonBackground'
import { getOrderList } from '../../../Redux/actions/orderAction'
import { RESET_ERROR } from '../../../Redux/constants/homeConstant'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from "react-i18next";


const MyOrder = ({navigation}) => {

    const { t } = useTranslation();

    const { orderList, loading, error } = useSelector(state => state.order)
    const { userData } = useSelector(state => state.auth)

    const dispatch = useDispatch();
    const toast = useToast()


    useEffect(() => {
        
        let data = {
            UserId: userData?.id,
	        countryId: userData?.Country
        }
        dispatch(getOrderList(data))
    
    }, [])

    useEffect(() => {
        if(error){
            toast.show({ title: 'Error', description: error })
            dispatch({
                type: RESET_ERROR
            })
        }
    }, [error])



    const renderItems = ({item}) => (
        <OrderCard 
            item={item}
        />
    )

    
  return (
    <>
       

        <CommonBackground>
            <Heading label={t("MyOrders.myOrders")}/>

            <Box px={3}>

                <CommonTextIcon 
                    text={'Last 6 months'} 
                    top={2} iconName="right"
                    bg={'#B4B4B4'} height={7}
                />

                <FlatList 
                    p={3}
                    data={orderList}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItems}
                />

            </Box>
                
        </CommonBackground>
    </>
  )
}

export default MyOrder

const styles = StyleSheet.create({})