import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Text, FlatList, Image, Spinner, useToast  } from 'native-base'
import CardTitle from '../CardTitle'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigation } from '@react-navigation/native'
import ServiceCard from './ServiceCard'
import { getLatestServices } from '../../../Redux/actions/homeAction'
import { RESET_ERROR } from '../../../Redux/constants/homeConstant'


const Services = ({label}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const toast = useToast()

    const { services, error } = useSelector(state => state.home)
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        
        //dispatch(getLatestServices())
    }, [])
      
    
    useEffect(() => {
  
      if(error){
        // toast.show({ title: 'Error', description: error })
        dispatch({
          type: RESET_ERROR
        })
      }
      
    }, [error])


    

    const renderItems = ({item}) => (
        <ServiceCard 
            onPress={()=>navigation.navigate('ServiceSubCategory',{service: item.Name})}
            mx={2.5}
            title={item.Name}
            item={item}
        />
    )

    if(!services || services.length === 0){
      return null
    }

  return (
    <>
        <CardTitle label={label}/>
        <FlatList 
            data={services}
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