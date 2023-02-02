import { StyleSheet, ImageBackground } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useToast, HStack, ScrollView, FlatList, Spinner } from 'native-base'
import Heading from '../../Components/Heading'
import FavCard from './FavCard'
import { useNavigation } from '@react-navigation/native'
import CommonBackground from '../../Components/CommonBackground'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from "react-i18next";
import { FAVOURITE_ARRAY, LOADING } from '../../Redux/constants/homeConstant'
import customAxios from '../../CustomAxios'


const MyFavourites = ({}) => {

    const { t } = useTranslation();

    const navigation = useNavigation();

    const [myFavourite, setMyFavourite] = useState([])


    const dispatch = useDispatch();
    const toast = useToast()

    const { userData } = useSelector(state => state.auth)

    useEffect(() => {
        myFavourites()
    
    }, [])


    const myFavourites = async() => {

        let data = {
            UserId: userData?.id,
	        countryId: userData?.Country
        }

        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`home/favorateslist`, data)  
        .then(async response => {
            let lists = response.data.map(fav => fav?.product?._id)
    
            dispatch({
                type: FAVOURITE_ARRAY,
                payload: lists
            })

            setMyFavourite(response.data)
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
    
            toast.show({
                title: 'Error',
                description: error,
                backgroundColor: 'error.500'
            })
    
            dispatch({
                type: LOADING,
                payload: false
            })
        });
    }

    // useEffect(() => {
    //     if(error){
    //         toast.show({ title: 'Error', description: error })
    //         dispatch({
    //             type: RESET_ERROR
    //         })
    //     }
    // }, [error])
    

    const renderItems = ({item}) => (
        <FavCard 
            item={item}
        />
    )

  return (
    <>
    
            <CommonBackground>
                <Heading label={t("MyFavourites.mFav")}/>

                <FlatList 
                    data={myFavourite}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItems}
                />

                
        </CommonBackground>
    </>
  )
}

export default MyFavourites

const styles = StyleSheet.create({})