import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text, FlatList, Image, Spinner, useToast  } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigation } from '@react-navigation/native'
import ServiceCard from './ServiceCard'
import { RESET_ERROR } from '../../../Redux/constants/homeConstant'
import CardTitle from '../../Components/CardTitle'
import { LOADING } from '../../Redux/constants/homeConstant'
import customAxios from '../../CustomAxios'


const Services = ({label}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const toast = useToast()

    const [serviceArray, setServiceArray] = useState([])

    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        
        getLatestServices()
    }, [])

    const getLatestServices = async() => {
        dispatch({
            type: LOADING,
            payload: true
        })
    
        await customAxios.post(`admin/service/_loadServicesType`)  
        .then(async response => {
            

            setServiceArray(response.data)
    
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
    
            dispatch({
                type: LOADING,
                payload: false
            })
        });
    }
      
    
    


    

    const renderItems = ({item}) => (
        <ServiceCard 
            onPress={()=>navigation.navigate('ServiceSubCategory',{service: item.Name})}
            mx={2.5}
            title={item.Name}
            item={item}
        />
    )

    if(!serviceArray || serviceArray.length === 0){
      return null
    }

  return (
    <>
        <CardTitle label={label}/>
        <FlatList 
            data={serviceArray}
            keyExtractor={(item) => item._id}
            renderItem={renderItems}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pb={10}
        />
    </>
  )
}

export default Services

const styles = StyleSheet.create({})