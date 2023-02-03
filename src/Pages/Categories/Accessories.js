import { StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Box, FlatList, Spinner, useToast } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import { LOADING } from '../../Redux/constants/homeConstant'
import customAxios from '../../CustomAxios'
import CommonCard from '../../Components/CommonCard'
import { IMAGE_URL } from '../../config/Constants'
import LoadingContext from '../../context/loading'

const Accessories = ({navigation}) => {



  const [categoryList, setCategoryList] = useState([])

  const context = useContext(LoadingContext)


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
        context.setLoading(true)
    
        await customAxios.post(`customer/home/_getcategorybyId`, data)  
        .then(async response => {
            
            setCategoryList(response.data)
    
            context.setLoading(false)
        })
        .catch(async error => {
            
            toast.show({
                title: "Error",
                description: error
            })
    
    
            context.setLoading(false)
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