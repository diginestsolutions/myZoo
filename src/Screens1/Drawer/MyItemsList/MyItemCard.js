import { StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Box, HStack, ScrollView, Text, Icon, Pressable } from 'native-base'

import Favourite from '../../../Components/Favourite'
import { RESET_PRODUCT } from '../../../Redux/constants/homeConstant'
import { getProductById } from '../../../Redux/actions/homeAction'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { IMAGE_URL } from '../../../config/Constants'


const MyItemCard = ({item}) => {

    const navigation = useNavigation();

    const dispatch = useDispatch();

    const makeActiveProduct = () => {
        dispatch({
            type: RESET_PRODUCT        
        })
        let data = {
            id: item?._id,
        }
        dispatch(getProductById(data))
        //navigation.navigate('ProductDetails');
    }
  return (
    <Pressable onPress={makeActiveProduct}>
    <HStack m={3} borderBottomWidth={0.5} pb={2} borderColor={'#B4B4B4'}>
        <ImageBackground 
            source={{ uri: `${IMAGE_URL}${item?.Images?.[0]?.UploadedFileName}`}} 
            
            style={{height:110, width:110}}>
                <Favourite iconName={item.SellingMode==2 && 'tag' || item.SellingMode==1 &&'wrench'}  />
        </ImageBackground>
        <Box ml={2} w='50%' justifyContent='space-evenly'>
            <HStack alignItems={'center'}>
                <Text fontWeight={500} fontFamily="body" fontSize={13}>{item.Name}</Text>
                <Icon as={<Ionicons/>} name={item.iconName} size={15} color={item.iConColor} ml={2}/>
            </HStack>
            <Text fontFamily="body" fontWeight={500} fontSize={10}>{item.Price}</Text>

            <HStack my={1}>
                <Box  flex={0.3}>
                    <Text fontFamily="body" fontWeight={500} fontSize={12}>{item.weight}</Text>
                </Box>
                
                <Box 
                    flex={0.4}
                    borderColor={'#00000029'} 
                    height={5} alignItems='center' 
                    borderLeftWidth={1} borderRightWidth={1}
                >
                    <Text fontFamily="body" fontWeight={500} fontSize={12} >{item.age}</Text>
                </Box>

                <HStack alignItems='center' justifyContent='flex-end' flex={0.4}>
                    <Icon as={<Ionicons/>} name='ios-star' size={13} color='#F0CB4F'/>
                    <Text fontFamily="body" fontWeight={500} fontSize={12}>{item.rating}</Text>
                </HStack>
                                
            </HStack>

            <HStack alignItems={'center'}>
                <Icon as={<Ionicons/>} name='ios-location-sharp' size={14} color={'#B4B4B4'} />
                <Text fontFamily="body" fontWeight={500} fontSize={12}>{item.City}</Text>
            </HStack>

        </Box>
    </HStack>
    </Pressable>
  )
}

export default MyItemCard

const styles = StyleSheet.create({})