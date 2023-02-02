import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList, useToast } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'lodash'
import customAxios from '../../CustomAxios'
import CardTitle from '../../Components/CardTitle'
import PetsCard from '../../Components/PetsCard'
import { LOADING } from '../../Redux/constants/homeConstant'
import { API_URL } from '../../config/Constants'


const MyzooPicks = ({ label, onPress}) => {

    const dispatch = useDispatch();
    const toast = useToast()

    const [myZooPicks, setMyZooPicks] = useState([])

    const {loading } = useSelector(state => state.home)
    const { userData } = useSelector(state => state.auth)


    useEffect(() => {
        
        getMyZooPicks()
        
    }, [])

    useEffect(() => {
        if(userData?.Country){
            getMyZooPicks()
        }
    }, [userData?.Country])


    const getMyZooPicks = async() => {

        let data = {
            countryId : !isEmpty(userData?.Country) ? userData?.Country : "5fe321d2e9ce6f4494dd8b81"
        }
        dispatch({
            type: LOADING,
            payload: true
        })
        fetch(`${API_URL}home/myzoopick`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.status){

                setMyZooPicks(json.data)
                dispatch({
                    type: LOADING,
                    payload: false
                })

            }else{

               
                dispatch({
                    type: LOADING,
                    payload: false
                })

            }
        })
        .catch(async error => {
            dispatch({
                type: LOADING,
                payload: false
            })
        });
    }


    useEffect(() => {
        if(userData?.Country){
            let data = {
                countryId : !isEmpty(userData?.Country) ? userData?.Country : "5fe321d2e9ce6f4494dd8b81"
            }
            getMyZooPicks(data)
        }
    }, [userData?.Country])
    
      
    

    const navigation = useNavigation();

   


    const renderItems = ({item}) => (
        <PetsCard 
            item={item} 
            mx={2.5} 
        />
    )

if(!myZooPicks || myZooPicks.length === 0){
    return null
}

if(loading){
    return null
}


  return (
    <>
        <CardTitle label={label}/>

        <FlatList 
            data={myZooPicks}
            keyExtractor={(item) => item._id}
            renderItem={renderItems}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        />

    </>
  )
}

export default MyzooPicks

const styles = StyleSheet.create({})