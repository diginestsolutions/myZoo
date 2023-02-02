import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Box, Spinner, Icon, Text, HStack, Image, useToast, FlatList } from 'native-base'
import Feather from 'react-native-vector-icons/Feather'
import { useDispatch, useSelector } from 'react-redux'
import { currencyChange, currencyList } from '../../Redux/actions/myItemsAction'
import Flags from './Flags'
import { SET_ACTIVE_CURRENCY } from '../../Redux/constants/myItemsConstant'
import { useTranslation } from "react-i18next";
import { IMAGE_URL } from '../../config/Constants'
import { DrawerActions } from '@react-navigation/native'


const Currency = ({navigation}) => {

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const toast = useToast()

    const { currencyLists, loading, error } = useSelector(state => state.myItems)
    const { userData } = useSelector(state => state.auth)


    useEffect(() => {
        
        dispatch(currencyList())
        
    }, [])

    // useEffect(() => {
    //     if(error){
    //         toast.show({ title: 'Error', description: error })
    //         dispatch({
    //             type: RESET_ERROR
    //         })
    //     }
    // }, [error])
      

    const makeActiveCurrency = (item) => {
        dispatch({
            type: SET_ACTIVE_CURRENCY,
            payload: item
        })
        navigation.dispatch(DrawerActions.toggleDrawer())
        navigation.goBack();

        let data ={
            UserId: userData?.id,
            Country: item._id,
        }
        dispatch(currencyChange(data))
    }

    const renderItems = ({item}) => {
        return(
            <Flags 
                image={{ uri: `${IMAGE_URL}${item?.Flag?.UploadedFileName}` }} 

                country={item.Country}
                currency={item.CurrencyCode}
                onPress={()=>makeActiveCurrency(item)}
            />                

            
        )
    }
  return (
    <>
        <Box bg={'#008BFC'} height={60} paddingX={2} flexDir='row' alignItems={'center'}>
            <Icon as={<Feather />}  name={"chevron-left"} color="#fff" size={31} onPress={()=>navigation.goBack()} /> 
            <Text color={'#fff'} fontSize={19} fontWeight={400} ml={3}>{t("SelectCurrency.selCur")}</Text>          
        </Box>
        <Box flex={1} bg={'#fff'} p={4}>

            <FlatList 
                data={currencyLists}
                keyExtractor={(item) => item._id}
                renderItem={renderItems}
            />

       

        </Box>
        
    </>
  )
}

export default Currency

const styles = StyleSheet.create({
 x:{
   justifyContent:'flex-start'
 }
})