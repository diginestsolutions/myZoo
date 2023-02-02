import { StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Box, HStack, VStack, Text, Icon, Pressable, Image } from 'native-base'
import EditButton from '../../Components/EditButton'
import { useTranslation } from "react-i18next";
import { IMAGE_URL } from '../../config/Constants'
import Ratings from '../ProductDetails/Ratings'
import moment from 'moment'


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
            <HStack justifyContent={"space-between"}>
                <VStack flex={0.7}>
                    <Text flex={0.9} fontFamily="body" fontWeight={500} fontSize={13} numberOfLines={2}>{item?.Name}</Text>
                    
                </VStack>
                {item?.status === "open" && <Image alt={item?.status} width={30} h={30} source={require('../../Images/open.png')} />}
            </HStack>
            <Text flex={0.9} fontFamily="body" fontWeight={100} fontSize={13} >{item?.userName}</Text>
            <Box alignItems={'flex-start'} mb={2}>
                <Ratings imageSize={13} defaultRating={item?.rating} />
            </Box>
            <HStack justifyContent={"space-between"}>
            <Text fontFamily="body" fontWeight={200} fontSize={11} mt={-2}>{t("MyBidding.mBid")} {item?.MyBid}</Text>
            <Text fontFamily="body" fontWeight={200} fontSize={11} mt={-2}>{moment(item?.BidOn).format("DD-MM-YYYY")}</Text>
            </HStack>
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