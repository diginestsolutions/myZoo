import { StyleSheet, ImageBackground, useWindowDimensions } from 'react-native'
import React from 'react'
import { Box, HStack, Icon, Image, Text } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ImageTextCard from '../../../ImageTextCard'
import { getProductById } from '../../../../../Redux/actions/homeAction'
import { RESET_PRODUCT } from '../../../../../Redux/constants/homeConstant'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { IMAGE_URL } from '../../../../../config/Constants'


const AllServicesCard = ({ item, onPress, mx }) => {

    const { width, height } = useWindowDimensions()

    const dispatch = useDispatch();

    const navigation = useNavigation();


    const makeActiveProduct = () => {
        dispatch({
            type: RESET_PRODUCT        
        })
        let data = {
            id: item?._id,
        }
        dispatch(getProductById(data))
        navigation.navigate('ProductDetails');
    }

    return (
        <ImageTextCard 
            width={width/2-30}
            onPress={makeActiveProduct}  
            mx={mx} 
        >
            <Image 
                source={{ uri: `${IMAGE_URL}${item?.Images?.[0]?.UploadedFileName}` }}
                borderTopLeftRadius={10}
                borderTopRightRadius={10}
                style={{height:90}}
                alt='img'
            >
            </Image>
            <Box paddingX={2}>
            
                <Text fontWeight={500} fontFamily="body" fontSize={13} mt={2}>{item.Name}</Text>
                
                <Text fontFamily="body" fontWeight={500} fontSize={10} my={1}>{item.Price}</Text>   

                <HStack alignItems={'center'} justifyContent={'space-between'}>
                    <HStack alignItems={'center'} mb={2}>
                        <Icon as={<Ionicons/>} name='ios-location-sharp' size={14} color={'#B4B4B4'} />
                        <Text fontFamily="body" fontWeight={500} fontSize={12} flexWrap={"wrap"} w='100%' h='100%'>{item.City}</Text>
                    </HStack>
                
                </HStack>

            </Box>   

        </ImageTextCard>
    )
}

export default AllServicesCard

const styles = StyleSheet.create({})