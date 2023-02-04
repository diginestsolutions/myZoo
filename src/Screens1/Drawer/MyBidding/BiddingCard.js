import { StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Box, HStack, ScrollView, Text, Icon, Pressable } from 'native-base'
import Ratings from '../../Dashboard/Item/Ratings'
import EditButton from '../../../Components/EditButton'
import { useTranslation } from "react-i18next";
import { IMAGE_URL } from '../../../config/Constants'


const BiddingCard = ({item, onPress}) => {

    const { t } = useTranslation();


  return (
    <Pressable>
    <Box
        shadow={5} 
        borderRadius={5}           
        backgroundColor="#fff"
        m={3}
        p={3}
        flexDirection={'row'}
    >
        <ImageBackground 
            source={{ uri: `${IMAGE_URL}${item?.Image?.[0]?.UploadedFileName}`}} 
            
            style={{height:130, width:130}}>
        </ImageBackground>
        <Box ml={2} flex={1}>
            <HStack alignItems={'center'}>
                <Text flex={0.9} fontFamily="body" fontWeight={500} fontSize={13} >{item?.Name}</Text>
                
                
                <Box flex={0.4} bg='#008BFC' w={50} alignItems='center' justifyContent={'flex-end'} >
                    <Text fontFamily="body" fontWeight={500} fontSize={13} color='#fff' py={1} >{item?.status}</Text>
                </Box>
            </HStack>
            <Text fontFamily="body" fontWeight={200} fontSize={13} color='#535353'>My Bid:  {item?.MyBid}</Text>
            
            <Box alignItems={'flex-start'}>
                <Ratings imageSize={13}/>
            </Box>
            <Text fontFamily="body" fontWeight={200} fontSize={11} mt={-2}>{t("MyBidding.mBid")} {item?.BidOn}</Text>
            <EditButton 
                label={t("MyBidding.placeNewBid")}
                mt={2}
                color='#005EAA'
                onPress={onPress}
            />
        </Box>
    </Box>
    </Pressable>
  )
}

export default BiddingCard

const styles = StyleSheet.create({})