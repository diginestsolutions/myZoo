import { StyleSheet, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Box, Icon, ScrollView, Text, FlatList, Spinner, HStack } from 'native-base'
import Header from '../../../../Components/Header'
import OrderCard from '../OrderCard'
import AddressBox from '../../../Profile/DeliveryAddress/AddressBox'
import CommonTextIcon from '../../../Profile/CommonTextIcon'
import MyzooPicks from '../../../Dashboard/MyZooPicks'
import Title from '../Title'
import CommonBackground from '../../../../Components/CommonBackground'
import StepIndicator from 'react-native-step-indicator';
import Timeline from '../../../../Components/Timeline'
import Heading from '../../../../Components/Heading'
import { getOrderStatus } from '../../../../Redux/actions/orderAction'
import { useDispatch, useSelector } from 'react-redux'
import ShippingAddress from '../ShippingAddress'
import { useTranslation } from "react-i18next";
import { IMAGE_URL } from '../../../../config/Constants'


const labels = ["Placed","Confirmed","Ready to dispatch","Dispatched","Delivered"];

const TrackItem = ({navigation}) => {

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { orderStatus, loading, error, activeOrder } = useSelector(state => state.order)

    const { addressList } = useSelector(state => state.settings)

    useEffect(() => {
    
        dispatch(getOrderStatus())
    
    }, [])

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
                    source={{ uri: `${IMAGE_URL}${activeOrder?.Images?.[0]?.UploadedFileName}`}}               
                    style={{height:110, width:110}}>
                </ImageBackground>
                <Box w={'80%'}>
                    <Text fontWeight={400} fontFamily="body" fontSize={13} color='#515151' ml={2}>{activeOrder?.productName}</Text>
                    <Text fontWeight={400} fontFamily="body" fontSize={14} color='#008ECC' ml={2}>{activeOrder?.orderDate}</Text>
                </Box>
                
            </HStack>
                
                <Timeline 
                    labels={labels} 
                    stepCount={5} 
                    direction='vertical'
                    ml={5}
                    height={300}
                    renderLabel={({position, stepStatus, label, currentPosition}) => {
                        return (
                            <Box p={1} w={150} paddingLeft={3}>
                                <Text >{data[position].label}</Text>
                            </Box>
                        )
                    }}
                />

                <Title label={t("TrackItem.shpAddr")}/>
                
                <ShippingAddress/>
                
                <Title label={t("TrackItem.ordinfo")}/>

                <CommonTextIcon 
                    onPress={()=>navigation.navigate('OrderDetails')}
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