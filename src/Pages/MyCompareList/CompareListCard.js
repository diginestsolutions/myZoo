import { StyleSheet } from 'react-native'
import React from 'react'
import Octicons from 'react-native-vector-icons/Octicons'
import { Box, HStack, Image, Text, useToast, Spinner } from 'native-base'
import Button from '../../Components/Button'
import Delete from '../../Components/Delete'
import ContentBox from './ContentBox'
import { deleteCompareList } from '../../Redux/actions/myItemsAction'
import { useDispatch, useSelector } from 'react-redux'
import { getProductById } from '../../Redux/actions/homeAction'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from "react-i18next";
import { IMAGE_URL } from '../../config/Constants'


const CompareListCard = ({item, deleteProduct}) => {

    const { t } = useTranslation();
    
    const navigation = useNavigation();

    const { userData } = useSelector(state => state.auth)


    const dispatch = useDispatch();
    const toast = useToast()

    const DeleteAction = () => {
        let data = {
            productId: item?.product?._id,
	        userId: userData?.id
        }
        deleteProduct(data)
        
        
    }

    const ViewDetails = () => {
        // let data = {
        //     id: item?.product?._id,
        // }
        // dispatch(getProductById(data))
        // navigation.navigate('ProductDetails');
        navigation.navigate('ProductDetails', { id: item?.product?._id });
    }

  return (
    <Box width={220} height={620} m={1} borderWidth={1} borderColor={'gray.400'} mb={10}>
        <Box borderBottomWidth={1} borderColor={'gray.400'} >
            <Image 
                source={{ uri: `${IMAGE_URL}${item?.product?.Images?.[0]?.UploadedFileName}` }}
                h={100} alt="image" 
            />
        </Box>
        <Box borderBottomWidth={1} borderColor='gray.400'>
            <Text  fontWeight={500} fontSize={14} p={2}>{item.product?.Name}</Text>
        </Box>
        <HStack borderBottomWidth={1} borderColor={'gray.400'} alignItems={'center'} h={35} px={2}>
            <Octicons  name='star-fill' size={15} color={'yellow'}/>
            <Text ml={1}>{item.rating ? item.rating : "0.0"}</Text>
        </HStack>
        
        <ContentBox label={item.product?.Price}/>
        <ContentBox label={item.product?.Category[0]?.CategoryName}/>
        <ContentBox label={item.product?.Breed[0]?.BreedName}/>
        <ContentBox label={item.product?.Gender==1 && "Male" || item.product?.Gender==3 && "Female" }/>
        <ContentBox label={item.product?.Age} subLabel={item?.agetype[0]?.Type}/>
        <ContentBox label={item.product?.Weight} subLabel={item?.weighttype[0]?.Type}/>
        <ContentBox label={item.VenderDetails[0]?.Name}/>
        <ContentBox label={item.product?.City}/>
       
       <Button 
            onPress={ViewDetails}
            label={t("CompareItems.viewDet")} 
            width='90%' 
            alignSelf={'center'} 
            marginTop={3}
        />
        <Delete 
            onPress={DeleteAction}
            label={t("CompareItems.del")} 
            width='90%' 
            alignSelf={'center'} 
            marginTop={2}
        />

    </Box>        
  )
}

export default CompareListCard

const styles = StyleSheet.create({})