import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, FlatList, Spinner, useToast } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import { LOADING } from '../../Redux/constants/homeConstant'
import customAxios from '../../CustomAxios'
import CommonCard from '../../Components/CommonCard'
import { IMAGE_URL } from '../../config/Constants'

const Accessories = ({navigation}) => {



  const [categoryList, setCategoryList] = useState([])


  const toast = useToast()
  const dispatch = useDispatch();


  
  
  

  
  

    useFocusEffect(
        React.useCallback(() => {
            let data = {
                Type: "5fdba00742ef4b45c3a60e49"
            }
            getAllCategories(data)
        }, [])
    );

    const getAllCategories = async(data) => {
        dispatch({
            type: LOADING,
            payload: true
        })
    
        await customAxios.post(`customer/home/_getcategorybyId`, data)  
        .then(async response => {
            
            setCategoryList(response.data)
    
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
            
            toast.show({
                title: "Error",
                description: error
            })
    
    
            dispatch({
                type: LOADING,
                payload: false
            })
        });
    }

    


const renderItems = ({item}) => {
        
  return(
    <CommonCard 
        label={item?.CategoryName}
        onPress={()=>navigation.navigate('SelectedAccessory', {label: item?.CategoryName, type: item?.TypeId, breed: item?._id})}
        // img={require('../../../../../Images/dogg.jpg')}
        img={{uri: `${IMAGE_URL}${item?.Image?.UploadedFileName}` }}

    />
  )
}

  return (
    <Box flex={1} bg='#fff' alignItems='center'>
        <FlatList 
            data={categoryList}
            keyExtractor={(item) => item._id}
            renderItem={renderItems}
            numColumns={2}
            showsVerticalScrollIndicator={false}

        />
    </Box>
  )
}

export default Accessories

const styles = StyleSheet.create({})