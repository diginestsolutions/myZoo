import { StyleSheet, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Box, Icon, ScrollView, Text, FlatList, Spinner, HStack, useToast } from 'native-base'
import CommonTextIcon from '../../Profile/CommonTextIcon'
import Title from '../Title'
import CommonBackground from '../../../Components/CommonBackground'
import StepIndicator from 'react-native-step-indicator';
import Timeline from '../../../Components/Timeline'
import Heading from '../../../Components/Heading'
import { getOrderStatus } from '../../../Redux/actions/orderAction'
import { useDispatch, useSelector } from 'react-redux'
import ShippingAddress from '../ShippingAddress'
import { useTranslation } from "react-i18next";
import { IMAGE_URL } from '../../../config/Constants'
import moment from 'moment'
import { LOADING } from '../../../Redux/constants/homeConstant'
import customAxios from '../../../CustomAxios'
import reactotron from 'reactotron-react-native'


const labels = ["Placed","Confirmed","Ready to dispatch","Dispatched","Delivered"];

const TrackItem = ({navigation, route}) => {

    const { t } = useTranslation();

    const [orderStatus, setOrderStatus] = useState([])

    const { item } = route.params

    reactotron.log({item})

    const dispatch = useDispatch();
    const toast = useToast()

    const [current, setCurrent] = useState(0)

    const { loading, error, activeOrder } = useSelector(state => state.order)

    const { addressList } = useSelector(state => state.settings)

    useEffect(() => {
    
        getOrderStatus()
    
    }, [])

    const getOrderStatus = async() => {
        dispatch({
            type: LOADING,
            payload: true
        })
    
        await customAxios.post(`Front_End/CartMob/get_all_order_status`,data)  
        .then(async response => {

            //let status = response.data?.map(st => st.status)

            let status = response.data.filter(st => st.IsVendor);

            setOrderStatus(status.map(st => st.status))
            let index = status?.findIndex(st => st._id === item?.products?.orderStatus)

            setCurrent(index)
    
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {

            toast.show({
                title: 'Error',
                description: error,
                backgroundColor: 'error.500'
            })
    
            dispatch({
                type: LOADING,
                payload: false
            })
        });
    }

    
    const data = [
        {
          label: "Placed",
          status: "test",
          dateTime:"2:30"
        },
        {
          label: "Confirmed",
          status: "test",
          dateTime:"2:30"
        },
        {
          label: "Ready to dispatch",
          status: "test",
          dateTime:"2:30"
        },
        {
          label: "Dispatched",
          status: "test",
          dateTime:"2:30"
        },
        {
          label: "Delivered",
          status: "test",
          dateTime:"2:30"
        },
        
    ]

  return (
    <>
    

        <CommonBackground bg={'#fff'} flex={1} borderTopRadius={25} mt={-5}>
            <Heading label={t("TrackItem.track")}/>
            <ScrollView px={3}>

            <HStack 
                borderWidth={1} borderColor={'#B4B4B4'} 
                p={3} alignItems='center' mx={1} my={3} borderRadius={7} 
            >
                <ImageBackground 
                    source={{ uri: `${IMAGE_URL}${item?.products?.images?.Images?.[0]?.UploadedFileName}`}}               
                    style={{height:110, width:110}}>
                </ImageBackground>
                <Box w={'80%'}>
                    <Text fontWeight={400} fontFamily="body" fontSize={13} color='#515151' ml={2}>{item?.products?.productName}</Text>
                    <Text fontWeight={400} fontFamily="body" fontSize={14} color='#008ECC' ml={2}>{ moment(item?.orderDate).format("DD-MM-YYYY") }</Text>
                </Box>
                
            </HStack>
                
                <Timeline 
                    labels={orderStatus} 
                    direction='vertical'
                    ml={5}
                    height={300}
                    currentPosition={current}
                    renderLabel={({label}) => (
                            <Box p={1} w={200} paddingLeft={3}>
                                <Text >{label}</Text>
                            </Box>
                        )
                    }
                />

                <Title label={t("TrackItem.shpAddr")}/>
                
                <ShippingAddress address={item?.address} />
                
                <Title label={t("TrackItem.ordinfo")}/>

                <CommonTextIcon 
                    onPress={()=>navigation.navigate('OrderDetails',{ productId: item?.products?.productId, orderId: item?._id, item: item })}
                    text={'View order details'} 
                    top={2} iconName="right"
                />
                {/* <MyzooPicks label={'Related pets'}/> */}

                {/* <MyzooPicks label={'Most viewed pets'}/> */}

                {/* <CommonTextIcon 
                    text={'Show all 50 items'} 
                    top={2} iconName="right"
                /> */}
            

            </ScrollView>
                
        </CommonBackground>
    </>
  )
}

export default TrackItem

const styles = StyleSheet.create({})