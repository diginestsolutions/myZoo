import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Box, Spinner, Icon, Text, FlatList, useToast } from 'native-base'
import Feather from 'react-native-vector-icons/Feather'
import Flags from '../Drawer/Currency/Flags'
import { useDispatch, useSelector } from 'react-redux'
import { countriesList } from '../../Redux/actions/authAction'
import { RESET_ERROR } from '../../Redux/constants/homeConstant'
import { API_URL, IMAGE_URL } from '../../config/Constants'
import { SET_ACTIVE_COUNTRY } from '../../Redux/constants/authConstant'

const SelectCountry = ({navigation}) => {

    const dispatch = useDispatch();
    const toast = useToast()

    const { countryList, loading, error } = useSelector(state => state.auth)

    useEffect(() => {
        if(!countryList){
            dispatch(countriesList())
        }
        
        
    }, [])
      
    
    useEffect(() => {

        if(error){
            toast.show({ title: 'Error', description: error })
            dispatch({
            type: RESET_ERROR
            })
        }
    
    }, [error])


    const makeActiveCountry = (item) => {
        dispatch({
            type: SET_ACTIVE_COUNTRY,
            payload: item
        })
        navigation.goBack();
    }

    const renderItems = ({item}) => {
        
        return(
            <Flags 
                image={{ uri: `${IMAGE_URL}${item?.Flag?.UploadedFileName}` }} 
                country={item.Country}
                code={item.CountryCode}
                onPress={()=>makeActiveCountry(item)}
            />                
        )
    }

  return (
    <>
        <Box bg={'#008BFC'} height={60} paddingX={2} flexDir='row' alignItems={'center'}>
            <Icon as={<Feather />}  name={"chevron-left"} color="#fff" size={31} onPress={()=>navigation.goBack()} /> 
            <Text color={'#fff'} fontSize={19} fontWeight={400} ml={3}>Select Country</Text>          
        </Box>
        <Box flex={1} bg={'#fff'} p={4}>

            <FlatList 
                data={countryList}
                keyExtractor={(item) => item._id}
                renderItem={renderItems}
            />

        </Box>

        
    </>
  )
}

export default SelectCountry

const styles = StyleSheet.create({
 x:{
   justifyContent:'flex-start'
 }
})