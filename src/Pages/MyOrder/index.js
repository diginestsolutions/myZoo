import { StyleSheet } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
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
import LoadingContext from '../../context/loading'


const MyOrder = ({navigation}) => {

    const { t } = useTranslation();

    const context = useContext(LoadingContext)

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

        context.setLoading(true)
    
        await customAxios.post(`/Front_End/CartMob/_orderlist_new`, data)  
        .then(async response => {
            setOrderlist(response.data)
    
            context.setLoading(false)
        })
        .catch(async error => {

            toast.show({ 
                title: 'Error', 
                description: error,
                backgroundColor: 'error.400' 
            })
    
            
    
            context.setLoading(false)
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