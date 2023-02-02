import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList, useToast } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { LOADING, RESET_ERROR } from '../../Redux/constants/homeConstant'
import CardTitle from '../../Components/CardTitle'
import PetsCard from '../../Components/PetsCard'
import { API_URL, IMAGE_URL } from '../../config/Constants'
import { isEmpty } from 'lodash'
import customAxios from '../../CustomAxios'



const Pets = ({ label, onPress}) => {

    const dispatch = useDispatch();
    const toast = useToast()

    const [latestPets, setLatestPets] = useState([])

    const { loading } = useSelector(state => state.home)
    const { userData } = useSelector(state => state.auth)



    useEffect(() => {
       getLatestPets()
    
    }, [])


    const getLatestPets = async () => {
        let data = {
            countryId : !isEmpty(userData?.Country) ? userData?.Country : '5fe321d2e9ce6f4494dd8b81',
        }
        dispatch({
            type: LOADING,
            payload: true
        })
    
        await customAxios.post(`customer/home/latestpets`, data)  
        .then(async response => {
            
            setLatestPets(response.data)
            
    
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
      
    
    

    const navigation = useNavigation();

   

    const renderItems = ({item}) => (
        <PetsCard 
            item={item} 
            mx={2.5}   

        />
    )



  return (
    <>
       {latestPets && latestPets?.length >=1 && <CardTitle label={label}/>}

        <FlatList 
            data={latestPets}
            keyExtractor={(item) => item._id}
            renderItem={renderItems}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={true}
            windowSize={15}
            getItemLayout={(_, index) => ({
                length: 60 + 20, //  WIDTH + (MARGIN_HORIZONTAL * 2)
                offset: (60 + 20) * (index),  //  ( WIDTH + (MARGIN_HORIZONTAL*2) ) * (index)
                index,
            })}
        />

    </>
  )
}

export default Pets

const styles = StyleSheet.create({})