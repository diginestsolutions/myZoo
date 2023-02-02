import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, Icon, ScrollView, Text, HStack, Pressable } from 'native-base'
import { useTranslation } from "react-i18next";


const OrderSummeryCard = ({ productPrice, deliveryCharges, total }) => {

    const { t } = useTranslation();

  return (
    <Box borderWidth={1}  borderColor={'#00000028'} p={3} my={3} >
        <HStack >
            <Box w={'50%'}>
                <Text fontFamily="body" fontWeight={200} fontSize={15} color='#515151'>{t("ViewOrderDetails.item")}</Text>
            </Box>
            <Text fontFamily="body" fontWeight={200} fontSize={15} color='#515151'>{productPrice}</Text>
        </HStack>
        <HStack >
            <Box w={'50%'}>
                <Text fontFamily="body" fontWeight={200} fontSize={15} color='#515151'>{t("ViewOrderDetails.del")}</Text>
            </Box>
            <Text fontFamily="body" fontWeight={200} fontSize={15} color='#515151'>{deliveryCharges}</Text>
        </HStack>
       
        <HStack>
            <Box w={'50%'}>
                <Text fontFamily="body" fontWeight={200} fontSize={15} color='#515151'>{t("ViewOrderDetails.total")}</Text>
            </Box>
            <Text fontFamily="body" fontWeight={200} fontSize={15} color='#515151'>{total}</Text>
        </HStack>
        <Box mt={2} alignItems='center'> 
            <Text fontFamily="body" fontWeight={500} fontSize={15} color='#FF1010'>{t("ViewOrderDetails.ordTotal")} :{total}</Text>
        </Box>
    </Box>
  )
}

export default OrderSummeryCard

const styles = StyleSheet.create({})