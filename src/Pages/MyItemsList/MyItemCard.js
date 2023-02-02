import { StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Box, HStack, Actionsheet, Text, Icon, Pressable, useDisclose, Button, useToast } from 'native-base'

import Favourite from '../../Components/Favourite'
import { LOADING, RESET_PRODUCT } from '../../Redux/constants/homeConstant'
import { getProductById } from '../../Redux/actions/homeAction'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { IMAGE_URL } from '../../config/Constants'
import moment from 'moment'
import customAxios from '../../CustomAxios'


const MyItemCard = ({ item }) => {

    const toast = useToast()

    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();

    const navigation = useNavigation();

    const dispatch = useDispatch();

    const makeActiveProduct = () => {
        navigation.navigate('ProductDetails', { id: item?._id });
    }

    const editItems = async() => {
        dispatch({
            type: LOADING,
            payload: true
        })
        onClose()
        //navigation.navigate("EditPost", { item: item })
        let data = {
            id: item?._id
        }
        await customAxios.post(`Front_End/Mob_products/_getproductbyIds`, data)  
        .then(async response => {
            navigation.navigate("EditPost", { item: response?.data })

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

    return (
        <>
            <Pressable onPress={makeActiveProduct}>
                <HStack m={3} borderBottomWidth={0.5} pb={2} borderColor={'#B4B4B4'}>
                    <ImageBackground
                        source={{ uri: `${IMAGE_URL}${item?.Images?.[0]?.UploadedFileName}` }}

                        style={{ height: 110, width: 110 }}>
                        <Favourite iconName={item.SellingMode == 2 && 'tag' || item.SellingMode == 1 && 'wrench'} />
                    </ImageBackground>
                    <Box ml={2} w='60%' justifyContent='space-evenly'>
                        <HStack alignItems={'center'}>
                            <Text fontWeight={500} fontFamily="body" fontSize={13}>{item.Name}</Text>
                            <Icon as={<Ionicons />} name={item?.Gender == 1 ? 'male-outline' : 'female-outline'} size={15} color={item?.Gender == 1 ? '#389C99' : '#F9C8D2'} ml={2} />
                        </HStack>
                        
                        <Text fontFamily="body" fontWeight={500} color="#2873BA" fontSize={14}>{item.Price}</Text>

                        <HStack my={1}>
                            <Box flex={0.3}>
                                <Text fontFamily="body" color="#8E8E8E" fontWeight={500} fontSize={12}>{item.Weight}</Text>
                            </Box>

                            <Box
                                flex={0.4}
                                borderColor={'#00000029'}
                                height={5} alignItems='center'
                                borderLeftWidth={1} borderRightWidth={1}
                            >
                                <Text fontFamily="body" color="#8E8E8E" fontWeight={500} fontSize={12} >{item.Age}</Text>
                            </Box>

                            <HStack alignItems='center' justifyContent='flex-end' flex={0.4}>
                                <Icon as={<Ionicons />} name='ios-star' size={13} color='#F0CB4F' />
                                <Text fontFamily="body" color="#8E8E8E" fontWeight={500} fontSize={12}>{item.rating}</Text>
                            </HStack>

                        </HStack>

                        <HStack justifyContent={'space-between'}>
                            <Text fontFamily="body" color="#8E8E8E" fontWeight={500} fontSize={12}>{item.City}</Text>
                            <Text fontFamily="body" color="#8E8E8E" fontWeight={500} fontSize={12}>{moment(item.InsertTimestamp).format("DD-MM-YYYY")}</Text>
                        </HStack>

                    </Box>
                </HStack>
            </Pressable>
            <Button variant={"link"} position="absolute" top={2} right={0} onPress={onOpen}>
                            <Icon as={<Ionicons />} name={'ellipsis-vertical-outline'} size={15} ml={2} />
                        </Button>
            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <Actionsheet.Item
                        startIcon={<Icon as={<Ionicons name="create-outline" />} color="muted.500" mr={3} mt={1} />}
                        onPress={editItems}
                    >
                        Edit
                    </Actionsheet.Item>
                    <Actionsheet.Item startIcon={<Icon as={<Ionicons name="power-outline" />} color="muted.500" mr={3} mt={1} />}>Suspend</Actionsheet.Item>
                    <Actionsheet.Item startIcon={<Icon as={<Ionicons name="trash-outline" />} color="muted.500" mr={3} mt={1} />}>Delete</Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>
        </>
    )
}

export default MyItemCard

const styles = StyleSheet.create({})