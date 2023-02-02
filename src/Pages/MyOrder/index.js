import { StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Box, FlatList, useToast } from 'native-base'
import Heading from '../../Components/Heading'
import OrderCard from './OrderCard'
import CommonBackground from '../../Components/CommonBackground'
import { RESET_ERROR } from '../../Redux/constants/homeConstant'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from "react-i18next";
import { LOADING } from '../../Redux/constants/homeConstant'
import customAxios from '../../CustomAxios'
import CommonTextIcon from '../Profile/CommonTextIcon'
import reactotron from 'reactotron-react-native'


const MyOrder = ({navigation}) => {

    const { t } = useTranslation();

    const [orderList, setOrderlist] = useState([])

    const { loading, error } = useSelector(state => state.order)
    const { userData } = useSelector(state => state.auth)

    const dispatch = useDispatch();
    const toast = useToast()


    useEffect(() => {
        
        getOrderList()
    
    }, [])


    const getOrderList = async() => {

        
        let data = {
            UserId: userData?.id,
	        countryId: userData?.Country
        }

        reactotron.log({data})

        dispatch({
            type: LOADING,
            payload: true
        })
    
        await customAxios.post(`/Front_End/CartMob/_orderlist_new`, data)  
        .then(async response => {
            setOrderlist(response.data)
    
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
                    keyExtractor={(item, index) => `${index}${item._id}`}
                    renderItem={renderItems}
                />

            </Box>
                
        </CommonBackground>
    </>
  )
}

export default MyOrder

const styles = StyleSheet.create({})