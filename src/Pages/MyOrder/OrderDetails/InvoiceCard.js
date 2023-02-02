import { StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Box, Icon, ScrollView, Text, HStack, Pressable } from 'native-base'
import CommonTextIcon from '../../Profile/CommonTextIcon'
import { useTranslation } from "react-i18next";

const InvoiceCard = ({orderDate, orderNo, price, quantity}) => {

    const { t } = useTranslation();

  return (
    <>
    <Box borderWidth={1}  borderColor={'#00000028'} p={3} mt={3}>
        <HStack >
            <Box w={'50%'}>
                <Text fontFamily="body" fontWeight={200} fontSize={15} color='#515151'>{t("ViewOrderDetails.ordDate")}</Text>
            </Box>
            <Text fontFamily="body" fontWeight={200} fontSize={15} color='#515151'>{orderDate}</Text>
        </HStack>
        <HStack >
            <Box w={'50%'}>
                <Text fontFamily="body" fontWeight={200} fontSize={15} color='#515151'>{t("ViewOrderDetails.ord")}</Text>
            </Box>
            <Text fontFamily="body" fontWeight={200} fontSize={15} color='#515151'>{orderNo}</Text>
        </HStack>
        <HStack>
            <Box w={'50%'}>
                <Text fontFamily="body" fontWeight={200} fontSize={15} color='#515151'>{t("ViewOrderDetails.ordTot")}</Text>
            </Box>
            <Text fontFamily="body" fontWeight={200} fontSize={15} color='#515151'>{price} ({quantity} item)</Text>
        </HStack>
    </Box>
    <CommonTextIcon 
        text={'Download Invoice'} 
        iconName="right"
        bg={'#B4B4B4'} 
    />
    </>
    
  )
}

export default InvoiceCard

const styles = StyleSheet.create({})