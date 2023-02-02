import { StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Box, HStack, ScrollView, Text, Icon, Pressable } from 'native-base'
import { RESET_PRODUCT } from '../../../../Redux/constants/homeConstant'
import { getProductById } from '../../../../Redux/actions/homeAction'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'


const SubCategoryCard = ({item, onPress}) => {

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
    <Pressable onPress={makeActiveProduct}>
    <HStack my={2} borderBottomColor='#B4B4B4' pb={2} borderBottomWidth={1}>
        <ImageBackground 
            source={require('../../../../Images/dog1.jpg')} 
            
            style={{height:110, width:110}}>
        </ImageBackground>
        <Box ml={2} mt={2}>
            <Text fontFamily="body" fontWeight={400} fontSize={14} color='#000'>{item.Name}</Text>
            <Text fontFamily="body" fontWeight={400} fontSize={14} color='#005EAA' my={1}>{item.Price}</Text>
            <HStack alignItems={'center'}>
                <Icon as={<Ionicons/>} name='ios-location-sharp' size={14} color={'#B4B4B4'} />
                <Text fontFamily="body" fontWeight={500} fontSize={12}>{item.City}</Text>
            </HStack>
        </Box>
    </HStack>
    </Pressable>
   
  )
}

export default SubCategoryCard

const styles = StyleSheet.create({})