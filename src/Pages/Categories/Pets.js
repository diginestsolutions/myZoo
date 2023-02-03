import { StyleSheet } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import { Box, FlatList, HStack, Image, Pressable, Text, Spinner, useToast } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'

import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { IMAGE_URL } from '../../config/Constants'
import CommonCard from '../../Components/CommonCard'
import { LOADING } from '../../Redux/constants/homeConstant'
import customAxios from '../../CustomAxios'
import LoadingContext from '../../context/loading'


const Pets = ({}) => {


  const dispatch = useDispatch();
  const context = useContext(LoadingContext)

  const toast = useToast();

  const [categoryList, setCategoryList] = useState([])




    const navigation = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            
            let data = {
                Type: "5fdba02442ef4b45c3a60e4a"
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
            img={{uri: `${IMAGE_URL}${item?.Image?.UploadedFileName}`}}
            label={item?.CategoryName}
            onPress={()=>navigation.navigate('SubCategory', { category: item?._id })}
        >
        </CommonCard>
            
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

export default Pets

const styles = StyleSheet.create({})