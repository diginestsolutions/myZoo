import { StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Box, Icon, ScrollView, Text, HStack, Pressable } from 'native-base'
import { useTranslation } from "react-i18next";


const ShipmentDetailsCard = ({productName, price, quantity, sellerName, image, orderStatus}) => {

    const { t } = useTranslation();

  return (
    <Box borderWidth={1}  borderColor={'#00000028'} p={3} mt={3}>
        <Text fontFamily="body" fontWeight={400} fontSize={15} color='#008ECC'>{orderStatus}</Text>
        {/* <Text fontFamily="body" fontWeight={300} fontSize={13} color='#000000'>{t("ViewOrderDetails.estDel")}</Text>
        <Text fontFamily="body" fontWeight={200} fontSize={12} color='#008ECC'>Tuesday 13 October 2020-Wednesday 20 October 2020</Text> */}

        <HStack mt={3}>
            <ImageBackground 
                source={{ uri: image}}  
                
                style={{height:110, width:110}}>
            </ImageBackground>
            <Box ml={2} w='65%' justifyContent='space-evenly'>

          
                <Text fontFamily="body" fontWeight={200} fontSize={15} color='#515151'>{productName}</Text>
             
         
                    
                <Text fontFamily="body" fontWeight={200} fontSize={15} color='#515151'>{price}</Text>
                <Text fontFamily="body" fontWeight={200} fontSize={15} color='#515151'>{t("ViewOrderDetails.qty")} {quantity}</Text>

                <HStack justifyContent={'space-between'}>
                    <Text fontFamily="body" fontWeight={200} fontSize={15} color='#515151'>{t("ViewOrderDetails.by")} {sellerName}</Text>
                    {/* <HStack alignItems={'center'}>
                        <Icon as={<Ionicons/>} name='ios-location-sharp' size={14} color={'#B4B4B4'} />
                        <Text fontFamily="body" fontWeight={200} fontSize={15} color='#515151'>Riyadh,KSA</Text>
                    </HStack> */}
                </HStack>


            </Box>
        </HStack>
    </Box>
  )
}

export default ShipmentDetailsCard

const styles = StyleSheet.create({})