import { StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Box, Spinner, ScrollView, Text, FlatList, Pressable } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from "react-i18next";
import ShippingAddress from '../ShippingAddress'



const PaymentInfoCard = () => {

    const { t } = useTranslation();


    const { addressList, loading, error } = useSelector(state => state.settings)

  return (
    <Box borderWidth={1} borderColor={'#00000028'}  mt={3}>

        <Box borderBottomWidth={1} borderColor={'#00000028'} p={3}>
            <Text fontFamily="body" fontWeight={400} fontSize={15} color='#515151'>{t("ViewOrderDetails.paymntMeth")}</Text>
            <Text fontFamily="body" fontWeight={200} fontSize={14} color='#515151' >Visa ending in 8907</Text>
        </Box>
        

        <Box borderBottomWidth={1} borderColor={'#00000028'} p={3}>

            <Text fontFamily="body" fontWeight={400} fontSize={15} color='#515151'>{t("ViewOrderDetails.BilAddr")}</Text>

            <ShippingAddress/>
            
        </Box>

    </Box>
  )
}

export default PaymentInfoCard

const styles = StyleSheet.create({})