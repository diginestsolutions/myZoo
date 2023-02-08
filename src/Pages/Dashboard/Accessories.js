import { StyleSheet, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Text, FlatList, HStack, Icon, Pressable, Spinner, useToast} from 'native-base'
import AccessoriesCard from './AccessoriesCard'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { RESET_ERROR, SET_ACTIVE_ITEM } from '../../../Redux/constants/homeConstant'
import { isEmpty } from 'lodash'
import CardTitle from '../../Components/CardTitle'
import { LOADING } from '../../Redux/constants/homeConstant'
import customAxios from '../../CustomAxios'


const Accessories = ({label, datas}) => {

    const dispatch = useDispatch();
    const toast = useToast()

    const [accessoryArray, setAccessoryArray] = useState(datas)

    const { loading } = useSelector(state => state.home)
    const { userData } = useSelector(state => state.auth)

   

    useEffect(() => {
       setAccessoryArray(datas)
    }, [datas])

    const getLatestAccessories = async() => {

        let data = {
            countryId : !isEmpty(userData?.Country) ? userData?.Country : '5fe321d2e9ce6f4494dd8b81',
        }
        // dispatch({
        //     type: LOADING,
        //     payload: true
        // })
    
        await customAxios.post(`customer/home/latestaccessories`, data)  
        .then(async response => {
            
            setAccessoryArray(response.data)
            
    
            // dispatch({
            //     type: LOADING,
            //     payload: false
            // })
        })
        .catch(async error => {
    
            // dispatch({
            //     type: LOADING,
            //     payload: false
            // })
        });
    }
      
    
      

    const navigation = useNavigation();

    

    const renderItems = ({item}) => (
        <AccessoriesCard 
            item={item} 
            mx={2.5}   
        />
    )


    if(!accessoryArray || accessoryArray.length === 0){
        return null
    }


  return (
    <>
        <CardTitle label={label}/>
        <FlatList 
            data={accessoryArray ? accessoryArray : []}
            keyExtractor={(item) => item._id}
            renderItem={renderItems}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        />

    </>
  )
}

export default Accessories

const styles = StyleSheet.create({})