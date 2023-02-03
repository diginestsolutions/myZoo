import { StyleSheet, useWindowDimensions } from 'react-native'
import React, { useContext, useState } from 'react'
import { Box, FlatList, HStack, Image, Pressable, useToast } from 'native-base'
import ServiceCard from './ServiceCard'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useFocusEffect } from '@react-navigation/native'
import { LOADING } from '../../Redux/constants/homeConstant'
import customAxios from '../../CustomAxios'
import LoadingContext from '../../context/loading'


const Services = ({}) => {

    const dispatch = useDispatch()
    const context = useContext(LoadingContext)

    const navigation = useNavigation();
    const [categoryList, setCategoryList] = useState([])


    //const { services, error } = useSelector(state => state.home)
    const { width } = useWindowDimensions()

    useFocusEffect(
        React.useCallback(() => {
            let data = {
                Type: "5fdba03942ef4b45c3a60e4b"
            }
            getAllCategories(data)
        }, [])
    );


    const getAllCategories = async(data) => {
        context.setLoading(true)
    
        await customAxios.post(`admin/service/_loadServicesType`, data)  
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


    const renderItems = ({item}) => (
        <Box w={width/2}>
          <ServiceCard 
              onPress={()=>navigation.navigate('ServiceSubCategory',{breed: item._id, label: item?.Name})}
              mx={4}
              title={item.Name}
              item={item}
          />
        </Box>
    )



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

export default Services

const styles = StyleSheet.create({})